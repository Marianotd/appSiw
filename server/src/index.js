import app from './app.js'
import configEnv from './config/env.js'

const PORT = configEnv.port ?? 4000

app.get('/', (req, res) => {
  res.send('Bienvenido.!')
})

const main = async () => {
  try {
    await app.listen(PORT)
    console.log(`Servidor corriendo en el puerto: http://localhost:${PORT}`)
  } catch (error) {
    console.error('Ha ocurrido un error al iniciar servidor: ', error)
  }
}

main()
