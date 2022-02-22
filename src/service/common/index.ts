/*
 * @Author: korealu
 * @Date: 2022-02-11 10:36:34
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-22 10:22:39
 * @Description: file content
 * @FilePath: /pofi-admin/src/service/common/index.ts
 */
import hyRequest from '../index'
enum commonAPI {
  country = '/cms/area/getRecordsAll',
  router = '/cms/router/getPlainRouter',
  group = '/cms/config/getGroup',
  routers = '/cms/router/routers',
  role = '/cms/role/getRoles' // 获取系统角色列表
}

// 获取所有地区数据
export function getCountrySelectList() {
  return hyRequest.post<any>({
    url: commonAPI.country,
    showLoading: false
  })
}
// 获取所有分组(配置管理中需要)
export function getBaseConfigGroupList() {
  return hyRequest.post<any>({
    url: commonAPI.group,
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

// 获取所有角色路由列表
export function getRouterTreeList() {
  return hyRequest.post<any>({
    url: commonAPI.routers,
    showLoading: false
  })
}

// 获取系统角色列表
export function getRolesList() {
  return hyRequest.post<any>({
    url: commonAPI.role,
    showLoading: false
  })
}
