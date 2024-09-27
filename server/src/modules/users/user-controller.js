import bcrypt from 'bcrypt'
import User from './User.js'
import jwt from 'jsonwebtoken'
import { validateRegister, validateLogin, validateUpdate } from './user-validations.js'
import configEnv from '../../config/env.js'

export const register = async (req, res) => {
  const { first_name, last_name, email, password, confirm_password } = req.body
  const user = { first_name, last_name, email, password, confirm_password }

  // Validación de campos
  const checkUser = validateRegister(user)
  if (checkUser.isError) {
    return res.status(400).json({ isError: true, message: 'Error de validación de datos', error: checkUser.error })
  }

  // Hash de contraseña
  user.password = await bcrypt.hash(user.password, 10)

  try {
    // Verificar existencia de usuario
    const userDb = await User.findOne({ where: { email: user.email } })
    if (userDb) {
      return res.status(400).json({ isError: true, message: 'Usuario existente' })
    }

    const newUserDb = await User.create(user)
    res.status(200).json({
      isError: false,
      message: 'Usuario creado correctamente',
      data: newUserDb._id
    })
  } catch (error) {
    console.error('Ha ocurrido un error al crear usuario:', error)
    return res.status(400).json({
      isError: true,
      message: 'Error al crear usuario',
      error: error.message
    })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  const user = { email, password }

  // Validación de campos
  const checkUser = validateLogin(user)
  if (checkUser.isError) {
    return res.status(400).json({ isError: true, message: 'Error de validación de datos', error: checkUser.error })
  }

  try {
    // Verificar existencia de usuario
    const userDb = await User.findOne({ where: { email: user.email } })
    if (!userDb) {
      return res.status(400).json({ isError: true, message: 'Correo electrónico incorrecto' })
    }

    // Verificación de contraseña
    const isValid = await bcrypt.compare(user.password, userDb.password)
    if (!isValid) {
      return res.status(400).json({ isError: true, message: 'Contraseña incorrecta' })
    }

    try {
      // Creación de token jwt
      const token = jwt.sign(
        { userId: userDb._id, email: userDb.email },
        configEnv.jwt_code,
        { expiresIn: '1h' }
      )

      res
        .cookie('access_token', token, {
          httpOnly: true,
          samesite: 'strict',
          secure: process.env.NODE_ENV === 'production',
          maxAge: 1000 * 60 * 60
        })
        .status(200).json({
          isError: false,
          message: 'Usuario logueado exitosamente',
          data: { id: userDb._id, token }
        })
    } catch (err) {
      console.error('Error generando token:', err)
      return res.status(400).json({
        isError: true,
        message: 'Error al generar token'
      })
    }
  } catch (error) {
    console.error('Ha ocurrido un error al iniciar sesión:', error)
    return res.status(400).json({
      isError: true,
      message: 'Error al iniciar sesión',
      error: error.message
    })
  }
}

export const update = async (req, res) => {
  const { _id, first_name, last_name, email, password } = req.body
  const user = { first_name, last_name, email, password }

  // Validación de campos
  const checkUser = validateUpdate(user)
  if (checkUser.isError) {
    return res.status(400).json({ isError: true, message: 'Error de validación de datos', error: checkUser.error })
  }

  try {
    // Verificar existencia de usuario
    const userDb = await User.findOne({ where: { _id } })
    if (!userDb) {
      return res.status(400).json({ isError: true, message: 'Usuario inexistente' })
    }

    await userDb.update(user)
    res.status(200).json({
      isError: false,
      message: 'Usuario actualizado exitosamente',
      data: userDb._id
    })
  } catch (error) {
    console.error('Ha ocurrido un error al actualizar usuario:', error)
    return res.status(400).json({
      isError: true,
      message: 'Error al actualizar usuario',
      error: error.message
    })
  }
}

export const logout = (req, res) => {
  res.clearCookie('access_token');
  return res.status(200).json({ message: 'Sesión cerrada' });
};

export const getUser = async (req, res) => {
  try {
    // Verificar user habiendo revisado token
    if (!req.user || !req.user.userId) {
      return res.status(400).json({ isError: true, message: 'Usuario no autenticado o token inválido' });
    }

    // Verificar existencia de usuario
    const userDb = await User.findOne({ where: { _id: req.user.userId } })
    if (!userDb) {
      return res.status(400).json({ isError: true, message: 'Usuario no encontrado' })
    }

    const { password: _, ...publicUser } = userDb.dataValues

    res.status(200).json({
      isError: false,
      message: 'Usuario encontrado',
      data: publicUser
    })
  } catch (error) {
    console.error('Ha ocurrido un error al buscar usuario:', error)
    return res.status(400).json({
      isError: true,
      message: 'Error al buscar datos de usuario',
      error: error.message
    })
  }
}