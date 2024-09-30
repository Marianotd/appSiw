import app from './app.js'
import configEnv from './config/env.js'

const port = configEnv.port || 4000

app.get('/', (req, res) => {
  res.send('Bienvenido.!')
})

const main = async () => {
  try {
    await app.listen(port)
    console.log(`Servidor corriendo en el puerto: ${port}`)
  } catch (error) {
    console.log(error)
  }
}

main()
