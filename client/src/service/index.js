import axios from 'axios'

const URI = import.meta.env.VITE_BACKEND_URL

export const registerUser = async (userData) => {
  const newUser = await axios.post(`${URI}/users/register`, userData)
  return newUser.data
}

export const loginUser = async (userData) => {
  const user = await axios.post(`${URI}/users/login`, userData, {
    withCredentials: true
  })
  return user.data
}

export const fetchSession = async () => {
  const user = await axios.get(`${URI}/users/current`, {
    withCredentials: true
  })
  return user.data
}