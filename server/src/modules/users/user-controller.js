import bcrypt from 'bcrypt'
import User from './User.js'
import jwt from 'jsonwebtoken'
import { sendMail } from '../../config/mailer.js'
import { validateRegister, validateLogin, validateUpdate, validateResetPassword } from './user-validations.js'
import configEnv from '../../config/env.js'

export const register = async (req, res) => {
  const { first_name, last_name, email, password, confirm_password } = req.body
  const user = { first_name, last_name, email, password, confirm_password }

  // Validación de campos
  const checkUser = validateRegister(user)
  if (checkUser.isError) {
    return res.status(400).json({ isError: true, message: 'Error de validación de datos', validationsError: checkUser.error.map(err => err.message) })
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
    return res.status(400).json({ isError: true, message: 'Error de validación de datos', validationsError: checkUser.error.map(err => err.message) })
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
        { userId: userDb._id, first_name: userDb.first_name, last_name: userDb.last_name, email: userDb.email },
        configEnv.jwt_code,
        { expiresIn: '1h' }
      )

      // Creación de token jwt
      const refreshToken = jwt.sign(
        { userId: userDb._id },
        configEnv.jwt_refresh,
        { expiresIn: '5d' }
      )

      res
        .cookie('access_token', token, {
          httpOnly: true,
          SameSite: 'none',
          secure: process.env.NODE_ENV === 'production',
          maxAge: 1000 * 60 * 60
        })
        .cookie('refresh_token', refreshToken, {
          httpOnly: true,
          SameSite: 'none',
          secure: process.env.NODE_ENV === 'production',
          maxAge: 1000 * 60 * 60 * 24 * 5
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

export const forgotPassword = async (req, res) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ isError: true, message: 'Debe ingresar un correo electrónico para identificar usuario' })
  }

  try {
    const userDb = await User.findOne({ where: { email } })

    const resetToken = jwt.sign(
      { userId: userDb._id },
      configEnv.jwt_code,
      { expiresIn: '1h' }
    )

    const resetLink = `${configEnv.cors_origin}/auth/reset-password?token=${resetToken}`

    const response = await sendMail(
      userDb.email,
      'Recuperación de contraseña',
      `Para restablecer tu contraseña haz clic en el siguiente enlace: ${resetLink}`,
      `<p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p> <a href="${resetLink}">Restablecer contraseña</a>`
    )

    res
      .cookie('reset_token', resetToken, {
        httpOnly: true,
        SameSite: 'none',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60
      })
      .status(200).json({
        isError: false,
        message: 'Correo enviado exitosamente'
      })
  } catch (error) {
    console.error('Usuario no encontrado', error)
    res.status(400).json({ isError: true, message: 'Usuario no encontrado, pruebe otro correo electrónico' })
  }
}

export const resetPassword = async (req, res) => {
  const { token, password, confirm_password } = req.body
  const user = { password, confirm_password }

  // Validación de campos
  const checkUser = validateResetPassword(user)
  if (checkUser.isError) {
    return res.status(400).json({ isError: true, message: 'Error de validación de datos', validationsError: checkUser.error.map(err => err.message) })
  }

  try {
    const decoded = jwt.verify(token, configEnv.jwt_code)
    const userDb = await User.findOne({ where: { _id: decoded.userId } })

    // Hash de contraseña
    user.password = await bcrypt.hash(user.password, 10)

    await userDb.update({ password: user.password })
    res.clearCookie('reset_token');

    res.status(200).json({ isError: false, message: 'Contraseña modificada con éxito' })
  } catch (error) {
    console.error('Ha ocurrido un error al actualizar contraseña:', error)
    res.status(400).json({ isError: true, message: 'No se ha podido actualizar la contraseña' })
  }
}

export const update = async (req, res) => {
  const token = req.cookies.access_token
  const { first_name, last_name, email, password, new_password } = req.body

  const user = {}
  if (first_name) user.first_name = first_name
  if (last_name) user.last_name = last_name
  if (email) user.email = email

  // Validación de campos
  const checkUser = validateUpdate(user)
  if (checkUser.isError) {
    return res.status(400).json({ isError: true, message: 'Error de validación de datos', validationError: checkUser.error.map(err => err.message) })
  }

  try {
    // Verificar existencia de usuario con token
    const decoded = jwt.verify(token, configEnv.jwt_code)
    const userDb = await User.findOne({ where: { _id: decoded.userId } })

    if (!userDb) {
      return res.status(400).json({ isError: true, message: 'Usuario inexistente' })
    }

    if (new_password) {
      if (!password) {
        return res.status(400).json({ isError: true, message: 'Debe proporcionar la contraseña actual para cambiar la contraseña' })
      }

      // Verificar si la contraseña actual es válida
      const isPasswordValid = await bcrypt.compare(password, userDb.password)
      if (!isPasswordValid) {
        return res.status(400).json({ isError: true, message: 'La contraseña actual es incorrecta' })
      }

      // Hashear la nueva contraseña y actualizar el usuario
      user.password = await bcrypt.hash(new_password, 10)
    }

    // Actualizar otros datos
    await userDb.update(user)
    res.status(200).json({
      isError: false,
      message: 'Usuario actualizado exitosamente',
      data: userDb
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
  res.clearCookie('refresh_token');
  return res.status(200).json({ isError: false, message: 'Sesión cerrada  con éxito' });
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
