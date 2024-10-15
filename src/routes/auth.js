import express from 'express';
import { authService } from '../auth/service.js';
import { userRepository } from '../users/repository.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      throw new Error(
        'El (name), (email) y la contraseña (password) son obligatorios'
      );
    }

    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      throw new Error('El (email) no tiene un formato válido');
    }

    if (!/^.{3,50}$/.test(name)) {
      throw new Error('El (name) debe tener entre 3 y 50 caracteres');
    }

    if (!/^.{4,50}$/.test(password)) {
      throw new Error(
        'La contraseña (password) debe tener entre 4 y 50 caracteres'
      );
    }

    if (await userRepository.findOneByEmail(email)) {
      throw new Error('El (email) ya está en uso');
    }

    const newUser = await authService.register({ name, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      throw new Error('El email y la contraseña (password) son obligatorios');
    }
    const { email, password } = req.body;
    const { token } = await authService.login(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
