/*
 * @Author: korealu
 * @Date: 2022-02-14 11:20:07
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-14 11:22:52
 * @Description: api列表
 * @FilePath: /pofi-admin/src/service/apiList.ts
 */

enum DeviceConditionAPI {
  base = '/cms/userImei',
  list = '/getLimit',
  add = '/addLimit',
  edit = '/updateLimit',
  remove = '/delLimit'
}

export const apiList: any = {
  device: {
    condition: DeviceConditionAPI
  }
}
