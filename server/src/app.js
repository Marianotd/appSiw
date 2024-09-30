import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import configEnv from './config/env.js'
import db from './database/db.js'
import router from './routes/router.js'

// Inicialización
const app = express()
app.use(cors({ origin: configEnv.cors_origin, credentials: true }))

// Configuración
app.use(express.json())
app.use(cookieParser())

// BDD
const connectDB = async () => {
  try {
    await db.authenticate()
    await db.sync({ force: false })
    console.log(`Conectado a la base de datos: ${db.getDatabaseName()}`)
  } catch (error) {
    console.error('No ha sido posible conectar a la base de datos:', error)
  }
}

connectDB()

// Ruta para API
app.use('/api', router)

export default app
