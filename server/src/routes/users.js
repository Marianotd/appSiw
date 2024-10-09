import { Router } from 'express'
import { forgotPassword, login, logout, register, resetPassword, update } from '../modules/users/user-controller.js'
import { authenticateJWT, refreshJWT } from '../middleware/authValidator.js'

const router = Router()

router
  .post('/register', register)
  .post('/login', login)
  .get('/logout', logout)
  .post('/forgot-password', forgotPassword)
  .post('/reset-password', resetPassword)
  .put('/current/update', update)
  .get('/session', authenticateJWT)
  .get('/current', authenticateJWT)
  .get('/refresh-token', refreshJWT)

export default router
