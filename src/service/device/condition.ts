/*
 * @Author: korealu
 * @Date: 2022-02-11 10:36:34
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-14 10:16:25
 * @Description: file content
 * @FilePath: /pofi-admin/src/service/device/condition.ts
 */
import hyRequest from '../index'
enum conditionAPI {
  base = '/cms/userImei',
  list = '/getLimit',
  add = '/addLimit',
  edit = '/updateLimit',
  remove = '/delLimit'
}

// 获取限制条件列表
export function getConditionList(queryInfo: any) {
  return hyRequest.post<any>({
    url: conditionAPI.base + conditionAPI.list,
    data: queryInfo
  })
}

export function addCondition(data: any) {
  return hyRequest.post<any>({
    url: conditionAPI.base + conditionAPI.add,
    data: data
  })
}

export function editCondition(data: any) {
  return hyRequest.post<any>({
    url: conditionAPI.base + conditionAPI.edit,
    data: data
  })
}

export function removeCondition(data: any) {
  return hyRequest.post<any>({
    url: conditionAPI.base + conditionAPI.remove,
    data: data
  })
}
