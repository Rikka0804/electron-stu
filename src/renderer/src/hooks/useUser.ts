import { useUserStore, useMenuStore } from '@store';
import router from '@router';

const store = useUserStore();
const menuStore = useMenuStore();
const useLogin = async (data: string) => {
  store.setToken(data);

  // 获取用户信息
  await store.setUserData();

  // 获取菜单列表
  await menuStore.setMenuData();


  router.push('/');


}
export default useLogin
