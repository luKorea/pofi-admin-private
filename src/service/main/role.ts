/*
 * @Author: korealu
 * @Date: 2022-02-21 14:05:37
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-21 14:31:22
 * @Description: file content
 * @FilePath: /pofi-admin/src/service/main/role.ts
 */
import hyRequest from '@/service'

export function getPermissionTreeData() {
  return hyRequest.post<any>({
    url: '/cms/permission/getPermissionsSenior'
  })
}
