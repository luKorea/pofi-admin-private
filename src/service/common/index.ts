/*
 * @Author: korealu
 * @Date: 2022-02-11 10:36:34
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-16 15:43:40
 * @Description: file content
 * @FilePath: /pofi-admin/src/service/common/index.ts
 */
import hyRequest from '../index'
enum commonAPI {
  country = '/cms/area/getRecordsAll',
  router = '/cms/router/getPlainRouter'
}

// 获取所有地区数据
export function getCountrySelectList() {
  return hyRequest.post<any>({
    url: commonAPI.country,
    showLoading: false
  })
}

// 获取所有路由列表
export function getRouterSelectList() {
  return hyRequest.post<any>({
    url: commonAPI.router,
    showLoading: false
  })
}
