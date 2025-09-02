import { request } from '@utils/request'
import axios from '@utils/request'
import type { LoginData, IUserData } from '@/types/login'
import type { MenuData } from '@/types/menu'
import { useUserStore } from '@store'

// 图形验证码
export const captchaImage = ( params:{
	key:string
} ):Promise<ArrayBuffer>=>{
    return axios({
    	url:'/captcha/image',
		  responseType:'arraybuffer',
		  params
    })
}


interface LoginResult {
  code: string
  msg: string
  data?: string
}


//账号密码登录
export const loginByJson = ( data:LoginData ) =>{
    return request<string>(
    	'/u/loginByJson',
    	'POST',
    	data
			//...
    )
}

interface PhoneLoginResult {
  code: string
  msg: string
  data?: string | null
}
// 获取手机号验证码
export const getLoginCaptcha = ( params:{mobile:string} ) =>{
    return request<string>(
    	'captcha/sendRegisterOrLoginCaptcha',
    	'GET',
    	params
			//...
    )
}

//手机号验证码登录
export const loginByMobile = ( data:{
  mobile: string
  captcha: string
} ) =>{
    return request<string>(
    	'/u/loginByMobile',
    	'POST',
    	data
			//...
    )
}

// 获取用户信息
export const getUserInfo = () =>{
    return request<IUserData>(
    	'/personal/getInfo',
    	'GET',
			//...
    )
}

// 获取菜单列表
export const getMenuList = () =>{
    return request<MenuData>(
    	`/personal/getRouters/${useUserStore().userData?.roles[0].rolePerm}`,
    	'GET',
			//...
    )
}
