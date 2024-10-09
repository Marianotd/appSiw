import { Router } from 'express'
import usersRouter from './routes/users.js'
import invoicesRouter from './routes/invoices.js'
import { authenticateJWT } from './middleware/authValidator.js'

const router = Router()

router.use('/users', authenticateJWT, usersRouter)
router.use('/invoices', authenticateJWT, invoicesRouter)

export default router
