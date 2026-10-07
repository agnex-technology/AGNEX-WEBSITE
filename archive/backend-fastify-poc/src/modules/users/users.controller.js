import { usersService } from './users.service.js';
import { env } from '../../config/env.js';
import jwt from 'jsonwebtoken';

export class UsersController {
  async register(request, reply) {
    const { email, password } = request.body;
    try {
      const user = await usersService.register(email, password);
      return reply.code(201).send({ data: user });
    } catch (err) {
      return reply.code(400).send({ error: err.message });
    }
  }

  async login(request, reply) {
    const { email, password } = request.body;
    const user = await usersService.verifyCredentials(email, password);

    if (!user) {
      return reply.code(401).send({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, env.JWT_SECRET, { expiresIn: '1d' });
    return reply.send({ token, user });
  }

  async me(request, reply) {
    const user = await usersService.getUserById(request.user.id);
    if (!user) {
      return reply.code(404).send({ error: 'User not found' });
    }
    return reply.send({ data: user });
  }
}

export const usersController = new UsersController();
