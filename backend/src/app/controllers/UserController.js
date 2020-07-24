import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      registration: Yup.number().required().integer(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const userExists = await User.findOne({
      where: { registration: req.body.registration },
    });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }
    const { id, registration, provider } = await User.create(req.body);

    return res.json({
      id,
      registration,
      provider,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      registration: Yup.number().integer(),
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

    const { registration, oldPassword } = req.body;
    const user = await User.findByPk(req.userId);

    if (registration != user.registration) {
      const userExists = await User.findOne({
        where: { registration },
      });
      if (userExists) {
        return res.status(400).json({ error: 'User already exist' });
      }
    }
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }
    const { id, provider } = await user.update(req.body);
    return res.json({
      id,
      registration,
      provider,
    });
  }

  async index(req, res) {
    const allusers = await User.findAll({
      attributes: ['id', 'registration'],
    });

    return res.json(allusers);
  }
}
export default new UserController();
