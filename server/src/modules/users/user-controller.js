import bcrypt, { hash } from 'bcrypt'
import User from './User.js'
import { validateRegister, validateLogin, validateUpdate } from './user-validations.js'

export const register = async (req, res) => {
  const { first_name, last_name, email, password, confirm_password } = req.body
  const user = { first_name, last_name, email, password, confirm_password }

  // Validación de campos
  const checkUser = validateRegister(user)
  if (checkUser.isError)
    return res.status(400).json({ isError: true, message: 'Error de validación de datos', error: checkUser.error })

  // Hash de contraseña
  user.password = await bcrypt.hash(user.password, 10)

  try {
    // Verificar existencia de usuario
    if (User.findOne({ where: { email: user.email } }))
      return res.status(400).json({ isError: true, message: 'Usuario existente' })

    const userDb = await User.create(user)
    res.status(200).json({
      isError: false,
      message: 'Usuario creado correctamente',
      data: userDb._id
    })

  } catch (error) {
    console.error('Ha ocurrido un error al crear usuario:', error)
    return res.status(400).json({
      isError: true,
      message: 'Error al crear usuario',
      error: error.message
    })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  const user = { email, password }

  // Validación de campos
  const checkUser = validateLogin(user)
  if (checkUser.isError)
    return res.status(400).json({ isError: true, message: 'Error de validación de datos', error: checkUser.error })

  try {
    // Verificar existencia de usuario
    const userDb = await User.findOne({ where: { email: user.email } })
    if (!userDb)
      return res.status(400).json({ isError: true, message: 'Usuario inexistente' })

    // Verificación de contraseña
    const isValid = await bcrypt.compare(user.password, userDb.password)
    if (!isValid)
      return res.status(400).json({ isError: true, message: 'Contraseña incorrecta' })

    res.status(200).json({
      isError: false,
      message: 'Usuario logueado exitosamente',
      data: userDb._id
    })

  } catch (error) {
    console.error('Ha ocurrido un error al iniciar sesión:', error)
    return res.status(400).json({
      isError: true,
      message: 'Error al iniciar sesión',
      error: error.message
    })
  }
}

export const update = async (req, res) => {
  const { first_name, last_name, email, password } = req.body
  const user = { first_name, last_name, email, password }

  // Validación de campos
  const checkUser = validateUpdate(user)
  if (checkUser.isError)
    return res.status(400).json({ isError: true, message: 'Error de validación de datos', error: checkUser.error })

  try {
    // Verificar existencia de usuario
    const userDb = await User.findOne({ where: { email: user.email } })
    if (!userDb)
      return res.status(400).json({ isError: true, message: 'Usuario inexistente' })

    if (!userDb) {
      console.error('Ha ocurrido un error al iniciar sesión')
      return res.status(400).json({
        isError: true,
        message: 'Usuario no encontrado'
      })
    }

    await userDb.update(user)

    res.status(200).json({
      isError: false,
      message: 'Usuario actualizado exitosamente',
      data: userDb
    })
  } catch (error) {
    console.error('Ha ocurrido un error al actualizar usuario:', error)
    return res.status(400).json({
      isError: true,
      message: 'Error al actualizar usuario',
      error: error.message
    })
  }
}

export const logout = async (req, res) => {
  const { email } = req.body

  try {

  } catch (error) {
    console.error('Ha ocurrido un error al cerrar sesión:', error)
    return res.status(400).json({
      isError: true,
      message: 'Error al cerrar sesión',
      error: error.message
    })
  }
}
