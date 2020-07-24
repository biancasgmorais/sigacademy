import * as Yup from 'yup';

import Professor from '../models/Professor';

class ProfessorController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      matricula_prof: Yup.number().required(),
      email: Yup.string().email().required(),
      cpf: Yup.number().required(),
      rg: Yup.number().required(),
      rua: Yup.string().required(),
      cidade: Yup.string().required(),
      estado: Yup.string().required(),
      pais: Yup.string().required(),
      telefone: Yup.number().required(),
      formacao: Yup.string().required(),
      escolaridade: Yup.string().required(),
      agencia: Yup.string().required(),
      conta: Yup.string().required(),
      tipoconta: Yup.string().required(),
      banco: Yup.string().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const userExists = await Professor.findOne({
      where: { matricula_prof: req.body.matricula_prof },
    });
    if (userExists) {
      return res.status(400).json({ error: 'Usuário já existente' });
    }

    const verificacpf = await Professor.findOne({
      where: { cpf: req.body.cpf },
    });

    if (verificacpf) {
      return res.status(400).json({ error: 'CPF já existente' });
    }

    const verificarg = await Professor.findOne({
      where: { rg: req.body.rg },
    });

    if (verificarg) {
      return res.status(400).json({ error: 'RG já existente' });
    }

    if (req.body.escolaridade.toLowerCase() !== 'doutorado') {
      if (req.body.escolaridade.toLowerCase() !== 'graduação') {
        if (req.body.escolaridade.toLowerCase() !== 'mestrado') {
          return res.status(400).json({
            error:
              'Escolaridade Incorreta - Escolha: Graduação, Mestrado ou Doutorado',
          });
        }
      }
    }
    const {
      rua,
      cidade,
      estado,
      pais,
      agencia,
      conta,
      tipoconta,
      banco,
    } = req.body;

    const endereco = [];
    endereco.push(rua, cidade, estado, pais);

    const bancodados = [];
    bancodados.push(agencia, conta, tipoconta, banco);

    await Professor.create({
      ...req.body,
      bancodados,
      endereco,
    });

    return res.json('Professor criado com sucesso!');
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      matricula_prof: Yup.number().required(),
      email: Yup.string().email(),
      rua: Yup.string(),
      cidade: Yup.string(),
      estado: Yup.string(),
      pais: Yup.string(),
      telefone: Yup.number(),
      formacao: Yup.string(),
      escolaridade: Yup.string(),
      agencia: Yup.string(),
      conta: Yup.string(),
      tipoconta: Yup.string(),
      banco: Yup.string(),
      password: Yup.string().required().min(6),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dado(s) invalido(s)' });
    }
    const { password } = req.body;

    const userExists = await Professor.findOne({
      where: { matricula_prof: req.body.matricula_prof },
    });
    if (!userExists) {
      return res.status(400).json({ error: 'Usuário não existente' });
    }
    if (!(await userExists.checkPassword(password))) {
      return res.status(401).json({ error: 'A senha está incorreta' });
    }

    if (req.body.escolaridade.toLowerCase() !== 'doutorado') {
      if (req.body.escolaridade.toLowerCase() !== 'graduação') {
        if (req.body.escolaridade.toLowerCase() !== 'mestrado') {
          return res.status(400).json({
            error:
              'Escolaridade Incorreta - Escolha: Graduação, Mestrado ou Doutorado',
          });
        }
      }
    }

    const {
      rua,
      cidade,
      estado,
      pais,
      agencia,
      conta,
      tipoconta,
      banco,
    } = req.body;

    const endereco = [];
    endereco.push(rua, cidade, estado, pais);

    const bancodados = [];
    bancodados.push(agencia, conta, tipoconta, banco);

    await userExists.update({ ...req.body, endereco, bancodados });

    return res.json('Professor atualizado com sucesso!');
  }

  async delete(req, res) {
    const { profId } = req.params;

    const prof = await Professor.findByPk(profId);

    await prof.destroy();

    return res.json('Seu perfil foi excluido com sucesso!');
  }

  async index(req, res) {
    const prof = await Professor.findAll({
      attributes: [
        'id',
        'name',
        'matricula_prof',
        'email',
        'cpf',
        'rg',
        'rua',
        'endereco',
        'telefone',
        'formacao',
        'escolaridade',
        'bancodados',
      ],
    });

    return res.json(prof);
  }

  async index2(req, res) {
    const prof = await Professor.findByPk(req.userId);

    const dp = await Professor.findOne({
      where: { matricula_prof: prof.matricula_prof },
      attributes: [
        'id',
        'name',
        'matricula_prof',
        'email',
        'cpf',
        'rg',
        'endereco',
        'telefone',
        'formacao',
        'escolaridade',
        'bancodados',
      ],
    });
    return res.json(dp);
  }

  async updatesenha(req, res) {
    const schema = Yup.object().shape({
      matricula_prof: Yup.number().integer(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { matricula_prof, oldPassword } = req.body;
    const user = await Professor.findByPk(req.userId);

    if (matricula_prof != user.matricula_prof) {
      const userExists = await Professor.findOne({
        where: { matricula_prof },
      });
      if (userExists) {
        return res.status(400).json({ error: 'User already exist' });
      }
    }
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }
    await user.update(req.body);
    return res.json('Senha atualizada com sucesso!');
  }
}

export default new ProfessorController();
