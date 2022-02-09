/*
 * @Author: korealu
 * @Date: 2022-02-08 09:31:15
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-09 10:48:28
 * @Description: file content
 * @FilePath: /pofi-admin/src/service/login/login.ts
 */
import hyRequest from '../index'

import { IAccount, ILoginResult } from './type'
import { IDataType } from '../types'
import md5 from 'md5'

enum LoginAPI {
  AccountLogin = '/cms/user/login',
  LoginUserInfo = '/users/', // 用法: /users/1
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

export function requestUserInfoById(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

export function requestUserMenusByRoleId() {
  return hyRequest.get<any>({
    url: LoginAPI.UserMenus,
    showLoading: false
  })
}
