import jwt from 'jsonwebtoken'
import User from '../modules/users/User.js'
import configEnv from '../config/env.js'

export const authenticateJWT = async (req, res) => {
  const token = req.cookies.access_token

  if (!token) {
    return res.status(401).json({ isError: true, message: 'No autorizado: no hay token de acceso' })
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
  const refreshToken = req.cookies.refresh_token

  if (!refreshToken) {
    return res.status(401).json({ isError: true, message: 'No autorizado: no hay token de acceso' })
  }

  try {
    const decoded = jwt.verify(refreshToken, configEnv.jwt_refresh)

    const userDb = await User.findOne({ where: { _id: decoded.userId } })

    const newAccessToken = jwt.sign(
      { userId: userDb._id, first_name: userDb.first_name, last_name: userDb.last_name, email: userDb.email },
      configEnv.jwt_code,
      { expiresIn: '1h' }
    )

    res
      .cookie('access_token', newAccessToken, {
        httpOnly: true,
        samesite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60
      })
      .status(200).json({
        isError: false,
        message: 'Token renovado con éxito',
      })
  } catch (error) {
    console.error('Error al renovar token:', error)
    return res.status(400).json({ isError: true, message: 'Ha ocurrido un error al renovar token' })
  }
}