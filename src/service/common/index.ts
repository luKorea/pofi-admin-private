/*
 * @Author: korealu
 * @Date: 2022-02-11 10:36:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-17 11:01:29
 * @Description: file content
 * @FilePath: /pofi-admin/src/service/common/index.ts
 */
import hyRequest from '../index'
enum commonAPI {
  country = '/cms/area/getRecordsAll',
  router = '/cms/router/getPlainRouter',
  group = '/cms/config/getGroup',
  routers = '/cms/router/routers',
  role = '/cms/role/getRoles', // 获取系统角色列表
  reg = '/cms/userInfo/getRegList', // 获取用户注册来源
  mark = '/cms/userInfo/getMarkList', // 获取用户特殊标记
  job = '/cms/userInfo/getJobList', // 获取用户职业
  draw = '/cms/userInfo/getDrawList' // 获取用户画风
}

// 公用API获取不同下拉列表。存在的暂时不修改，后续再统一修改
export function getCommonSelectList(type: string) {
  return hyRequest.post<any>({
    url: (commonAPI as any)[type],
    showLoading: false
  })
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
