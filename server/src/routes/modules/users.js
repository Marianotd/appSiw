import { Router } from 'express'
import { getUser, login, logout, register, update } from '../../modules/users/user-controller.js'
import { authenticateJWT } from '../../middleware/authValidator.js'

const router = Router()

router
  // Sesión
  .post('/register', register)
  .post('/login', login)
  .get('/logout', logout)
  .get('/session', authenticateJWT)

  // User
  .get('/current', authenticateJWT, getUser)
  .put('/current/update', authenticateJWT, update)

export default router
