import * as Yup from 'yup';

import Aluno from '../models/Aluno';

class AlunoController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      matricula_aluno: Yup.number().required(),
      cpf: Yup.number().required(),
      rg: Yup.number().required(),
      rua: Yup.string().required(),
      cidade: Yup.string().required(),
      estado: Yup.string().required(),
      pais: Yup.string().required(),
      telefone: Yup.number().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const userExists = await Aluno.findOne({
      where: { matricula_aluno: req.body.matricula_aluno },
    });
    if (userExists) {
      return res.status(400).json({ error: 'Usuário já existente' });
    }
    const verificacpf = await Aluno.findOne({
      where: { cpf: req.body.cpf },
    });

    if (verificacpf) {
      return res.status(400).json({ error: 'CPF já existente' });
    }

    const verificarg = await Aluno.findOne({
      where: { rg: req.body.rg },
    });

    if (verificarg) {
      return res.status(400).json({ error: 'RG já existente' });
    }

    const { rua, cidade, estado, pais } = req.body;

    const endereco = [rua, cidade, estado, pais];

    await Aluno.create({ ...req.body, endereco });

    return res.json('Aluno criado com sucesso!');
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      matricula_aluno: Yup.number().required(),
      email: Yup.string(),
      name: Yup.string(),
      rua: Yup.string(),
      cidade: Yup.string(),
      estado: Yup.string(),
      pais: Yup.string(),
      telefone: Yup.number(),
      password: Yup.string().required().min(6),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dado(s) invalido(s)' });
    }
    const { password } = req.body;

    const userExists = await Aluno.findOne({
      where: { matricula_aluno: req.body.matricula_aluno },
    });
    if (!userExists) {
      return res.status(400).json({ error: 'Usuário não existente' });
    }
    if (!(await userExists.checkPassword(password))) {
      return res.status(401).json({ error: 'A senha está incorreta' });
    }

    const { rua, cidade, estado, pais } = req.body;
    const endereco = [rua, cidade, estado, pais];

    await userExists.update({ ...req.body, endereco });

    return res.json('Aluno atualizado com sucesso!');
  }

  async delete(req, res) {
    const { alunoId } = req.params;

    const al = await Aluno.findByPk(alunoId);

    await al.destroy();

    return res.json('Seu perfil foi excluido com sucesso!');
  }

  async index(req, res) {
    const al = await Aluno.findAll({
      attributes: [
        'id',
        'name',
        'matricula_aluno',
        'email',
        'cpf',
        'rg',
        'endereco',
        'telefone',
      ],
    });

    return res.json(al);
  }

  async index2(req, res) {
    const al = await Aluno.findByPk(req.userId);

    const dp = await Aluno.findOne({
      where: { matricula_aluno: al.matricula_aluno },
      attributes: [
        'id',
        'name',
        'matricula_aluno',
        'email',
        'cpf',
        'rg',
        'endereco',
        'telefone',
      ],
    });
    return res.json(dp);
  }

  async updatesenha(req, res) {
    const schema = Yup.object().shape({
      matricula_aluno: Yup.number().integer(),
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

    const { matricula_aluno, oldPassword } = req.body;
    const user = await Aluno.findByPk(req.userId);

    if (matricula_aluno != user.matricula_aluno) {
      const userExists = await Aluno.findOne({
        where: { matricula_aluno },
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

export default new AlunoController();
