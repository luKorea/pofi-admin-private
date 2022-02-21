/*
 * @Author: korealu
 * @Date: 2022-02-21 17:35:13
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-21 17:35:13
 * @Description: file content
 * @FilePath: /pofi-admin/src/service/main/user.ts
 */

import hyRequest from '@/service'
export function updateUserValid(data: any) {
  return hyRequest.post<any>({
    url: '/cms/user/updateUserValid',
    data: data
  })
}
