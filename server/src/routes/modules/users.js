import { Router } from 'express'
import { login, register, update } from '../../modules/users/user-controller.js'

const router = Router()

// Sesion
router
  .post('/register', register)
  .post('/login', login)
  .put('/update', update)

// User
// .get('/current', handleAuth(users), controller.getUserSession)
// .put('/current/update', handleAuth(users), controller.currentUpdate)
// .put('/current/uploadphoto',
//   handleAuth(users),
//   uploader('profiles', 5, ['image/jpeg', 'image/png']).single('photo'),
//   controller.uploadPhoto)

export default router
