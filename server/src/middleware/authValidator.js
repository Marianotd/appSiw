import jwt from 'jsonwebtoken'
import configEnv from '../config/env.js'

export const authenticateJWT = async (req, res) => {
  const token = req.cookies.access_token

  if (!token) {
    return res.status(400).json({ isError: true, message: 'No autorizado: no hay token de acceso' })
  }

  try {
    const decoded = jwt.verify(token, configEnv.jwt_code)

    req.user = decoded

    res.status(200).json({ isError: false, message: 'Sesión activa', data: req.user })
  } catch (error) {
    console.error('Error al validar token:', error)
    return res.status(400).json({ isError: true, message: 'Token inválido' })
  }
}

export const refreshJWT = async (req, res) => {
  const refreshToken = req.cookies.access_token

  if (!refreshToken) {
    return res.status(400).json({ isError: true, message: 'No autorizado: no hay token de acceso' })
  }
}