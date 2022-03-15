/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-15 17:40:12
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

// 排序列表
export function sortPageTableData(url: string, sortData: any) {
  return hyRequest.post<any>({
    url: url,
    data: sortData
  })
}
