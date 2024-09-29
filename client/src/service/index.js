import axios from 'axios'

const URI = import.meta.env.VITE_BACKEND_URL

// Obtener nuevo access token a través del refresh token
const refreshAccessToken = async () => {
  try {
    const response = await axios.get(`${URI}/users/refresh-token`, { withCredentials: true })
    if (response.status === 200) {
      return response.data
    }
  } catch (error) {
    throw new Error('Error al refrescar el token')
  }
}

// Manejo de peticiones con posible refresco de token
export const requestWithRetry = async (requestFunction) => {
  try {
    const response = await requestFunction()
    return response
  } catch (error) {
    if (error.response && error.response.status === 401) {
      try {
        await refreshAccessToken()

        // Refrescado el token vuelve a probar la solicitud original
        return await requestFunction()
      } catch (refreshError) {
        console.error('Error al refrescar token:', refreshError)
        throw refreshError
      }
    } else {
      console.error('Error en la solicitud:', error)
      throw error
    }
  }
}


export const registerUser = async (userData) => {
  return await requestWithRetry(async () => {
    const newUser = await axios.post(`${URI}/users/register`, userData)
    return newUser.data
  })
}

export const updateUser = async (userData) => {
  return await requestWithRetry(async () => {
    const newUser = await axios.put(`${URI}/users/current/update`, userData, {
      withCredentials: true
    })
    return newUser.data
  })
}

export const loginUser = async (userData) => {
  return await requestWithRetry(async () => {
    const user = await axios.post(`${URI}/users/login`, userData, {
      withCredentials: true
    })
    return user.data
  })
}


export const fetchSession = async () => {
  return await requestWithRetry(async () => {
    const user = await axios.get(`${URI}/users/session`, {
      withCredentials: true
    })
    return user.data
  })
}

export const logout = async () => {
  const response = await axios.get(`${URI}/users/logout`, {
    withCredentials: true
  })
  return response
}

export const forgotPassword = async (email) => {
  const response = await axios.post(`${URI}/users/forgot-password`, email, { withCredentials: true })
  return response
}

export const resetPassword = async (data) => {
  const response = await axios.post(`${URI}/users/reset-password`, data, { withCredentials: true })
  return response
}