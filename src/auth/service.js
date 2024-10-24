import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userRepository } from '../users/repository.js';

// eslint-disable-next-line no-undef
const SECRET_KEY = process.env.SECRET_KEY;

const register = async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await userRepository.create({
    name,
    email,
    password: hashedPassword,
  });
};

const login = async ({ email, password, rememberMe }) => {
  const user = await userRepository.findOneByEmail(email);
  if (!user) {
    throw new Error('Las credenciales son inválidas');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Las credenciales son inválidas');
  }

  const { password: _, ...userWithoutPassword } = user.dataValues;

  const token = jwt.sign({ user: userWithoutPassword }, SECRET_KEY, {
    expiresIn: rememberMe === 'true' ? '30d' : '1h',
  });

  return { token, user: userWithoutPassword };
};

export const authService = {
  register,
  login,
};
