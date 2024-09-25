import express from 'express'
import cors from 'cors'
import configEnv from './config/env.js'
import db from './database/db.js'
import router from './routes/router.js'

// Inicialización
const app = express()
app.use(cors({ origin: configEnv.cors_origin }))

// Configuración
app.use(express.json())

// BDD
const connectDB = async () => {
  try {
    await db.authenticate()
    console.log(`Conectado a la base de datos: ${db.getDatabaseName()}`)
  } catch (error) {
    console.error('No ha sido posible conectar a la base de datos:', error)
  }
}

connectDB()

// Ruta App
app.get('/', (req, res) => {
  res.send('Bienvenido.!')
})

// Ruta para API
app.use('/api', router)

export default app
