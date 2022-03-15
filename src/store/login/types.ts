/*
 * @Author: korealu
 * @Date: 2022-02-09 09:56:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-15 17:45:38
 * @Description: file content
 * @FilePath: /pofi-admin/src/store/login/types.ts
 */
export interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  permissions: string[]
  routerList: any[]
  isAdmin: boolean
}
