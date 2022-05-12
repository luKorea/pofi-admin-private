/*
 * @Author: korealu
 * @Date: 2022-02-08 09:31:15
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-12 13:46:47
 * @Description: file content
 * @FilePath: /pofi-admin/src/service/login/login.ts
 */
import hyRequest from '../index'

import { IAccount } from './type'
// import { IDataType } from '../types'
import md5 from 'md5'

enum LoginAPI {
  AccountLogin = '/cms/user/login',
  LoginUserInfo = '/cms/user/getHome', // 用法: /users/1
  UserMenus = '/cms/router/getRouter', // 用法: role/1/menu
  IsAdmin = '/cms/user/isAdmin',
  CodeLogin = '/cms/user/sendSmsCode', // 获取验证码
  AccountCodeLogin = '/cms/user/getSmsCode',
  editPassword = '/cms/user/updatePwd'
}

export function getCode(phone: any) {
  return hyRequest.post<any>({
    url: LoginAPI.CodeLogin,
    data: {
      phone: phone
    }
  })
}
export function accountCodeLogin(data: any) {
  return hyRequest.post<any>({
    url: LoginAPI.AccountCodeLogin,
    data
  })
}

export function accountLoginRequest(account: IAccount) {
  return hyRequest.post<any>({
    url: LoginAPI.AccountLogin,
    data: {
      email: account.email,
      pwd: md5(account.pwd)
    }
  })
}

export function requestUserInfo() {
  return hyRequest.post<any>({
    url: LoginAPI.LoginUserInfo,
    showLoading: false
  })
}

export function requestUserMenusByRoleId() {
  return hyRequest.post<any>({
    url: LoginAPI.UserMenus,
    showLoading: true
  })
}

// 获取后管用户是否为超管
export function checkUserIsAdmin() {
  return hyRequest.post<any>({
    url: LoginAPI.IsAdmin,
    showLoading: true
  })
}

// 修改密码
export function editPassword(pwd: any) {
  return hyRequest.post<any>({
    url: LoginAPI.editPassword,
    data: {
      pwd: md5(pwd)
    }
  })
}
