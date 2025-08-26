import request from "@utils/request";
import type { LoginData } from '@/types/login'

// 图形验证码
export const captchaImage = (params:{
  key: string
}): Promise<ArrayBuffer> =>{
    return request({
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
export const loginByJson = ( data:LoginData ): Promise<LoginResult> =>{
    return request({
    	url:'/u/loginByJson',
    	method:'POST',
    	data
			//...
    })
}

interface PhoneLoginResult {
  code: string
  msg: string
  data?: string | null
}
// 获取手机号验证码
export const getLoginCaptcha = ( params:{mobile:string} ): Promise<PhoneLoginResult> =>{
    return request({
    	url:'captcha/sendRegisterOrLoginCaptcha',
    	params
			//...
    })
}

//手机号验证码登录
export const loginByMobile = ( data:{
  mobile: string
  captcha: string
} ): Promise<LoginResult> =>{
    return request({
    	url:'/u/loginByMobile',
    	method:'POST',
    	data
			//...
    })
}
