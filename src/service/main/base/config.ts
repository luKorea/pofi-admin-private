/*
 * @Author: korealu
 * @Date: 2022-03-14 15:06:53
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-14 15:06:54
 * @Description: file content
 * @FilePath: /pofi-admin/src/service/main/base/config.ts
 */
import hyRequest from '../../index'
enum conditionAPI {
  isAdmin = '/cms/user/isAdmin'
}

// 获取后管用户是否为超管
export function checkUserIsAdmin() {
  return hyRequest.post<any>({
    url: conditionAPI.isAdmin
  })
}
