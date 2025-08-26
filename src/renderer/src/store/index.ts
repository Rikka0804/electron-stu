import { defineStore } from 'pinia'
import { useUserStore } from './useUserStore'
export const useStore = defineStore('storeId', {
  state: () => {
    return {
      user:useUserStore()
    }
  },
  getters:{},
  actions:{}
})
