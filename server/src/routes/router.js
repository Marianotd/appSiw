import { Router } from 'express'
import usersRouter from './modules/users.js'
import clientsRouter from './modules/clients.js'
import invoicesRouter from './modules/invoices.js'

const router = Router()

router.use('/users/', usersRouter)
router.use('/clients/', clientsRouter)
router.use('/invoices/', invoicesRouter)

export default router
