/*
 * @Author: korealu
 * @Date: 2022-02-28 09:54:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-16 11:04:43
 * @Description: file content
 * @FilePath: /pofi-admin/src/service/main/finance/pay.ts
 */

import hyRequest from '@/service'

export const getItemData = (data: any) => {
  return hyRequest.post<any>({
    url: '/cms/userPurse/getPurse',
    data: data,
    showLoading: false
  })
}

// 获取用户标记
export const getUserTypeData = () => {
  return hyRequest.post<any>({
    url: '/cms/userPurse/getMarkList',
    showLoading: false
  })
}
