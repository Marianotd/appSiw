import bcrypt from 'bcrypt'
import User from './User.js'
import jwt from 'jsonwebtoken'
import configEnv from '../../config/env.js'
import { sendMail } from '../../config/mailer.js'
import { validateLoginSchema, validateRegisterSchema, validateUpdateSchema } from '../../schemas/user.js'
import { createAccessToken, createRefreshToken, createResetToken } from '../../jwt/jwt.js'
import { validateResetPassword } from './user-validations.js'

export const register = async (req, res) => {
  // Validación de campos
  const result = validateRegisterSchema(req.body)

  if (result.error) {
    return res.status(422).json({ isError: true, message: 'Hubo un problema al validar los datos del formulario' })
  }

  // Hash de contraseña
  result.password = await bcrypt.hash(result.password, 10)

  try {
    // Verificar existencia de usuario
    const userDb = await User.findOne({ where: { email: result.email } })
    if (userDb) {
      return res.status(400).json({ isError: true, message: 'El usuario ya se encuentra registrado' })
    }

    // Creación de usuario y respuesta
    await User.create(result)
    res.status(200).json({ isError: false, message: 'Usuario creado correctamente', })
  } catch (error) {
    console.error('Ha ocurrido un error al crear usuario:', error)
    return res.status(400).json({ isError: true, message: 'Error al crear usuario', error: error.message })
  }
}

export const login = async (req, res) => {
  // Validación de campos
  const response = validateLoginSchema(req.body)

  if (response.isError) {
    return res.status(422).json({ isError: true, message: 'Hubo un problema al validar los datos del formulario' })
  }

  try {
    // Verificar existencia de usuario
    const userDb = await User.findOne({ where: { email: response.email } })

    if (!userDb) {
      return res.status(400).json({ isError: true, message: 'Correo electrónico incorrecto' })
    }

    // Verificación de contraseña
    const isValid = await bcrypt.compare(response.password, userDb.password)
    if (!isValid) {
      return res.status(400).json({ isError: true, message: 'Contraseña incorrecta' })
    }

    // Creación de tokens y respuesta
    const access_token = createAccessToken(userDb)
    const refresh_token = createRefreshToken(userDb)

    res
      .cookie('access_token', access_token, {
        httpOnly: true,
        sameSite: 'none',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60
      })
      .cookie('refresh_token', refresh_token, {
        httpOnly: true,
        sameSite: 'none',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 5
      })
      .status(200).json({ isError: false, message: 'Ingreso exitoso', data: { id: userDb._id, token } })
  } catch (error) {
    console.error('Ha ocurrido un error al iniciar sesión:', error)
    return res.status(400).json({ isError: true, message: 'Error al iniciar sesión', error: error.message })
  }
}

export const forgotPassword = async (req, res) => {
  // Validación de campos
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ isError: true, message: 'Debe ingresar un correo electrónico' })
  }

  try {
    // Validación de usuario
    const userDb = await User.findOne({ where: { email } })

    if (!userDb) {
      return res.status(400).json({ isError: true, message: 'Correo electrónico incorrecto' })
    }

    // Creación de tokens
    const resetToken = createResetToken(userDb)
    const resetLink = `${configEnv.cors_origin}/auth/reset-password?token=${resetToken}`

    // Envío de mail de recuperación y respuesta
    await sendMail(
      userDb.email,
      'Recuperación de contraseña',
      `Para restablecer tu contraseña haz clic en el siguiente enlace: ${resetLink}`,
      `<p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p> <a href="${resetLink}">Restablecer contraseña</a>`
    )

    res
      .cookie('reset_token', resetToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60
      })
      .status(200).json({ isError: false, message: 'Correo enviado exitosamente' })
  } catch (error) {
    console.error('Usuario no encontrado', error)
    res.status(400).json({ isError: true, message: 'Usuario no encontrado, pruebe otro correo electrónico' })
  }
}

export const resetPassword = async (req, res) => {
  const { token } = req.body

  // Validación de campos
  const response = validateResetPassword(req.body)

  if (response.isError) {
    return res.status(422).json({ isError: true, message: 'Hubo un problema al validar los datos del formulario' })
  }

  try {
    // Verificar token
    const decoded = jwt.verify(token, configEnv.jwt_code)

    // Búsqueda de usuario
    const userDb = await User.findOne({ where: { _id: decoded.userId } })

    // Hash de contraseña
    response.password = await bcrypt.hash(response.password, 10)

    // Actualización de usuario y respuesta
    await userDb.update({ password: response.password })
    res.clearCookie('reset_token')
    res.status(200).json({ isError: false, message: 'Contraseña modificada con éxito' })
  } catch (error) {
    console.error('Ha ocurrido un error al actualizar contraseña:', error)
    res.status(400).json({ isError: true, message: 'No se ha podido actualizar la contraseña' })
  }
}

export const update = async (req, res) => {
  const token = req.cookies.access_token

  // Validación de campos
  const response = validateUpdateSchema(req.body)

  if (response.isError) {
    return res.status(422).json({ isError: true, message: 'Hubo un problema al validar los datos del formulario' })
  }

  try {
    // Verificar token
    const decoded = jwt.verify(token, configEnv.jwt_code)

    // Búsqueda de usuario
    const userDb = await User.findOne({ where: { _id: decoded.userId } })

    if (!userDb) {
      return res.status(400).json({ isError: true, message: 'Usuario no encontrado' })
    }

    // Verificar si la contraseña actual es válida
    const isPasswordValid = await bcrypt.compare(password, userDb.password)
    if (!isPasswordValid) {
      return res.status(400).json({ isError: true, message: 'La contraseña es incorrecta' })
    }

    // Hashear la nueva contraseña y actualizar el usuario
    response.password = await bcrypt.hash(response.new_password, 10)

    // Actualizar datos y respuesta
    await userDb.update(response)
    res.status(200).json({ isError: false, message: 'Usuario actualizado exitosamente', data: userDb })
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
  // Limpieza de cookies (tokens) y respuesta
  res.clearCookie('access_token')
  res.clearCookie('refresh_token')
  res.clearCookie('reset_token')
  return res.status(200).json({ isError: false, message: 'Sesión cerrada  con éxito' })
}

export const getUser = async (req, res) => {
  try {
    // Verificar user habiendo revisado token
    if (!req.user || !req.user.userId) {
      return res.status(400).json({ isError: true, message: 'Usuario no autenticado o token inválido' })
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
