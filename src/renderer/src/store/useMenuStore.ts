import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { MenuData } from '@/types/menu.d.ts'
import { getMenuList } from '@api/login'

export const useMenuStore = defineStore('menuId', () => {

  const menuData = ref<MenuData>()
  const setMenuData = async () => {
    const res = await getMenuList()
    menuData.value = res.data
  }
  return {
    menuData,
    setMenuData
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
