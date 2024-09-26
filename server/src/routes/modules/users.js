import { Router } from 'express'
import { getUser, login, logout, register, update } from '../../modules/users/user-controller.js'

const router = Router()

router
  // Sesión
  .post('/register', register)
  .post('/login', login)
  .post('/logout', logout)

  // User
  .get('/current', getUser)
  .put('/current/update', update)

export default router
