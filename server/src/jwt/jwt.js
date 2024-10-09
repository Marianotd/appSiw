import jwt from 'jsonwebtoken'
import configEnv from '../config/env'

const createAccessToken = (data) => jwt.sign(
  { userId: data._id, first_name: data.first_name, last_name: data.last_name, email: data.email },
  configEnv.jwt_code,
  { expiresIn: '1h' }
)

const createRefreshToken = (data) => jwt.sign(
  { userId: data._id },
  configEnv.jwt_refresh,
  { expiresIn: '5d' }
)

const createResetToken = (data) => jwt.sign(
  { userId: data._id },
  configEnv.jwt_code,
  { expiresIn: '1h' }
)

export { createAccessToken, createRefreshToken, createResetToken }