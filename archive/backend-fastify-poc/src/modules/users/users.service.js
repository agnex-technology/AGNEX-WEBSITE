import { usersRepo } from './users.repo.js';
import * as argon2 from 'argon2';

export class UsersService {
  async register(email, password, role = 'user') {
    const existingUser = await usersRepo.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const passwordHash = await argon2.hash(password);
    const user = await usersRepo.create({
      email,
      passwordHash,
      role
    });

    const { passwordHash: _, ...safeUser } = user;
    return safeUser;
  }

  async verifyCredentials(email, password) {
    const user = await usersRepo.findByEmail(email);
    if (!user) {
      // Prevent timing attacks by performing a dummy hash verification
      try {
        await argon2.verify('$argon2id$v=19$m=65536,t=3,p=4$dummyhashdummyhashdummyhash$dummyhashdummyhashdummyhash', password);
      } catch (e) {}
      return null;
    }

    const isValid = await argon2.verify(user.passwordHash, password);
    if (!isValid) {
      return null;
    }

    const { passwordHash: _, ...safeUser } = user;
    return safeUser;
  }

  async getUserById(id) {
    const user = await usersRepo.findById(id);
    if (!user) return null;

    const { passwordHash: _, ...safeUser } = user;
    return safeUser;
  }
}

export const usersService = new UsersService();
