import jwt from 'jsonwebtoken'
import configEnv from '../config/env.js'

export const authenticateJWT = (req, res, next) => {
  const token = req.cookies.access_token

  if (!token) {
    return res.status(400).json({ isError: true, message: 'No autorizado: no hay token de acceso' })
  }

  try {
    const decoded = jwt.verify(token, configEnv.jwt_code)
    req.user = decoded
    next()
  } catch (error) {
    console.error('Error al validar token:', error)
    return res.status(400).json({ isError: true, message: 'Token inválido' })
  }
}
