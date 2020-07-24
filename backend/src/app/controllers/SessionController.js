import jwt from 'jsonwebtoken';
import User from '../models/User';
import Professor from '../models/Professor';
import Aluno from '../models/Aluno';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { registration, password } = req.body;
    const user = await User.findOne({ where: { registration } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }
    const { id, name, provider } = user;

    return res.json({
      user: {
        id,
        name,
        registration,
        provider,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }

  async storeProf(req, res) {
    const { matricula_prof, password } = req.body;
    const prof = await Professor.findOne({ where: { matricula_prof } });

    if (!prof) {
      return res.status(401).json({ error: 'User not found' });
    }
    if (!(await prof.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }
    const { id, name, provider } = prof;

    return res.json({
      prof: {
        id,
        name,
        matricula_prof,
        provider,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }

  async storeAluno(req, res) {
    const { matricula_aluno, password } = req.body;
    const aluno = await Aluno.findOne({ where: { matricula_aluno } });

    if (!aluno) {
      return res.status(401).json({ error: 'User not found' });
    }
    if (!(await aluno.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }
    const { id, name, provider } = aluno;

    return res.json({
      aluno: {
        id,
        name,
        matricula_aluno,
        provider,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
