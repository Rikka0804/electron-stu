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

export interface User {
  id: string;
  username: string;
  realName: string;
  userType: number;
  email: string;
  phone: string;
  gender: number;
  avatar: string;
  enabled: number;
  delFlag: number;
  remark: string | null;
}

export interface Permission {
  [index: number]: string;
}

export interface Unit {
  id: string;
  name: string;
  code: string;
  codeseq: string;
  contact: string;
  mobile: string;
  email: string;
  web: string;
  parentId: string;
  hasChildren: number;
  system: number;
  enabled: number;
  leaderId: string | null;
  createBy: string;
  createTime: number | null;
  updateBy: string | null;
  updateTime: number | null;
  address: string;
}

export interface Role {
  id: string;
  roleName: string;
  rolePerm: string;
}

export interface IUserData {
  userInfo: User;
  permissions: Permission;
  units: Unit;
  roles: Role[];
}
