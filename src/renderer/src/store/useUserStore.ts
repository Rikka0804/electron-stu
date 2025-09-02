import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IUserData } from '@/types/login'
import { getUserInfo} from '@api/login'

export const useUserStore = defineStore('userId', () => {
  const token = ref<string>('')
  const setToken = (newToken: string) => {
    token.value = newToken
  }

   const userData = ref<IUserData>()
   const setUserData = async () => {
    const res = await getUserInfo()
    userData.value = res.data
  }

  const clear = () => {
    token.value = ''
    userData.value = undefined
  }


  return {
    token,
    setToken,
    userData,
    setUserData,
    clear

  }

},{
  persist: {
    enabled: true, //开启数据缓存
    strategies: [
      {
        storage: localStorage,//默认走session
        // paths: ['token', 'permissions']
      }
    ]
  }
})
