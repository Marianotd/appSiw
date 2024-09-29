import { Router } from 'express'
import { login, logout, register, update } from '../../modules/users/user-controller.js'
import { authenticateJWT, refreshJWT } from '../../middleware/authValidator.js'

const router = Router()

router
  // Sesión
  .post('/register', register)
  .post('/login', login)
  .get('/logout', logout)
  .get('/session', authenticateJWT)
  .post('/refresh-token', refreshJWT)

  // User
  .get('/current', authenticateJWT)
  .put('/current/update', update)

export default router
