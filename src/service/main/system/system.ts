/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:48
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-15 17:22:03
 * @Description: file content
 * @FilePath: /pofi-admin/src/service/main/system/system.ts
 */
import hyRequest from '../../index'

export function getPageListData(url: string, queryInfo: any) {
  return hyRequest.post<any>({
    url: url,
    data: queryInfo
  })
}

// url: /users/id
export function deletePageData(url: string, data: any) {
  return hyRequest.delete<any>({
    url: url,
    data: data
  })
}

export function createPageData(url: string, newData: any) {
  return hyRequest.post<any>({
    url: url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return hyRequest.patch<any>({
    url: url,
    data: editData
  })
}
