import { fetchSession, loginUser } from '../service/index'

export const sessionSlice = (set, get) => ({
  idUser: null,
  userDetail: {},
  status: false,

  userLoginStore: async (userData) => {
    const { data } = await loginUser(userData)
    if (data) {
      set(() => ({
        status: true,
        idUser: data.id,
      }));
    }
  },
  isSessionActive: async () => {
    const { data } = await fetchSession()
    if (data) {
      set(() => ({
        status: true,
        idUser: data._id,
        userDetail: { firstName: data.first_name, lastName: data.last_name, email: data.email }
      }))
      return true
    } else {
      set(() => ({ status: true }))
      return false
    }
  }
})