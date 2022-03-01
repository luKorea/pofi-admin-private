/*
 * @Author: korealu
 * @Date: 2022-02-11 10:36:34
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-01 09:47:33
 * @Description: file content
 * @FilePath: /pofi-admin/src/service/main/base/head.ts
 */
import hyRequest from '../../index'
enum conditionAPI {
  sort = '/cms/head/updateSort'
}

// 排序列表
export function getConditionList(queryInfo: any) {
  return hyRequest.post<any>({
    url: conditionAPI.sort,
    data: queryInfo
  })
}
