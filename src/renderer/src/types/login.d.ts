// 账号密码数据
export type LoginData = {
  username: string
  password: string
  captcha: string
  key: string
}

// 手机号登陆
export type PhoneLoginData = {
  mobile: string
  captcha: string
}
