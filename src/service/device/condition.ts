/*
 * @Author: korealu
 * @Date: 2022-02-11 10:36:34
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-11 12:00:00
 * @Description: file content
 * @FilePath: /pofi-admin/src/service/device/condition.ts
 */
import hyRequest from '../index'
enum conditionAPI {
  list = '/cms/userImei/getLimit',
  add = '/cms/userImei/addLimit'
}

// 获取限制条件列表
export function getConditionList(queryInfo: any) {
  return hyRequest.post<any>({
    url: conditionAPI.list,
    data: queryInfo
  })
}

export function addCondition(data: any) {
  return hyRequest.post<any>({
    url: conditionAPI.add,
    data: data
  })
}
