/*
 * @Author: korealu
 * @Date: 2022-03-14 15:06:53
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-14 15:06:54
 * @Description: file content
 * @FilePath: /pofi-admin/src/service/main/base/config.ts
 */
import hyRequest from '@/service'
enum conditionAPI {
  del = '/cms/userInfo/delHead',
  batch = '/cms/userInfo/pass'
}

// 驳回用户请求
export function checkUserModify(data: any) {
  return hyRequest.post<any>({
    url: conditionAPI.del,
    data: data,
    showLoading: false
  })
}

// 批量通过
export function batchAdopt(data: any) {
  return hyRequest.post<any>({
    url: conditionAPI.batch,
    data: data
  })
}
