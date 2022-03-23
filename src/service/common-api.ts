/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-23 15:43:26
 * @Description: file content
 * @FilePath: /pofi-admin/src/service/common-api.ts
 */
import hyRequest from '@/service/index'

// 获取表格数据
export function getPageListData(url: string, queryInfo: any) {
  return hyRequest.post<any>({
    url: url,
    data: queryInfo
  })
}

// 删除数据，使用地址栏参数
export function deletePageData(url: string, id: any) {
  return hyRequest.post<any>({
    url: url + '/' + id
  })
}

// 删除数据，使用query参数
export function deletePageToQueryData(url: string, data: any) {
  return hyRequest.post<any>({
    url: url,
    data: data
  })
}

//新增数据
export function createPageData(url: string, newData: any) {
  return hyRequest.post<any>({
    url: url,
    data: newData
  })
}

// 编辑数据
export function editPageData(url: string, editData: any) {
  return hyRequest.post<any>({
    url: url,
    data: editData
  })
}

enum getItemUrl {
  baseConfig = '/cms/config/get', // 基础配置
  resourceKeyword = '/cms/keyword/getKeyword', // 关键词
  resourceClassify = '/cms/classify/getClassify', // 分类管理
  payItem = '/cms/userPay/getPay', // 订单管理
  purseItem = '/cms/userPurse/getPurse', // 用户钱包
  userItem = '/cms/userInfo/show', // 用户操作记录
  seriesItem = '/cms/series/getSeries', // 系列管理
  functionItem = '/cms/function/explain/getExplain', // 功能说明
  functionTypeItem = '/cms/function/type/getFunctionType' // 功能说明分类
}

// 获取单行数据
export const getItemData = (url: string, data: any) => {
  return hyRequest.post<any>({
    url: (getItemUrl as any)[url],
    data: data,
    showLoading: true
  })
}

// 排序列表
export function sortPageTableData(url: string, sortData: any) {
  return hyRequest.post<any>({
    url: url,
    data: sortData
  })
}
