import { fetchSession, loginUser, logout } from '../service/index'

export const sessionSlice = (set, get) => ({
  idUser: null,
  userDetail: {},
  status: false,

  userLoginStore: async (userData) => {
    try {
      const { data } = await loginUser(userData)
      if (data) {
        set(() => ({
          status: true,
          idUser: data.id,
        }))
      }
      return data
    } catch (error) {
      set(() => ({
        status: false,
      }))
      throw error
    }
  },
  setUserDetail: (updatedUser) => {
    set(() => ({
      userDetail: {
        ...get().userDetail,
        ...updatedUser,
      }
    }));
  },
  isSessionActive: async () => {
    try {
      const { data } = await fetchSession()
      set(() => ({
        status: true,
        idUser: data._id,
        userDetail: { first_name: data.first_name, last_name: data.last_name, email: data.email }
      }))
      return true
    } catch (error) {
      console.error(error.response.data.message)
      set(() => ({ status: false }))
      return false
    }
  },
  logoutStore: async () => {
    const { data } = await logout()

    if (!data.isError) {
      set(() => ({
        status: false,
        userId: null,
        userDetail: {}
      }))

      return true
    } else {
      return false
    }
  }
})