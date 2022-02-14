/*
 * @Author: korealu
 * @Date: 2022-02-08 09:31:15
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-14 10:56:17
 * @Description: file content
 * @FilePath: /pofi-admin/src/service/login/login.ts
 */
import hyRequest from '../index'

import { IAccount } from './type'
import { IDataType } from '../types'
import md5 from 'md5'

enum LoginAPI {
  AccountLogin = '/cms/user/login',
  LoginUserInfo = '/cms/user/getHome', // 用法: /users/1
  UserMenus = '/cms/router/getRouter' // 用法: role/1/menu
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
  return hyRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo,
    showLoading: false
  })
}

export function requestUserMenusByRoleId() {
  return hyRequest.get<any>({
    url: LoginAPI.UserMenus,
    showLoading: false
  })
}
