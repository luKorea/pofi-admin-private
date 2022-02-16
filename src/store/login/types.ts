/*
 * @Author: korealu
 * @Date: 2022-02-09 09:56:39
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-16 15:51:47
 * @Description: file content
 * @FilePath: /pofi-admin/src/store/login/types.ts
 */
export interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  permissions: string[]
  routerList: any[]
}
