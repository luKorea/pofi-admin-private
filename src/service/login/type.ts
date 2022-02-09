/*
 * @Author: korealu
 * @Date: 2022-02-08 09:31:14
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-09 10:32:28
 * @Description: file content
 * @FilePath: /pofi-admin/src/service/login/type.ts
 */
export interface IAccount {
  email: string
  pwd: string
}

export interface ILoginResult {
  id: number
  name: string
  token: string
}
