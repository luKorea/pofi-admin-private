/*
 * @Author: korealu
 * @Date: 2022-02-28 09:54:41
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-07 17:57:10
 * @Description: file content
 * @FilePath: /pofi-admin/src/service/main/finance/pay.ts
 */

import hyRequest from '@/service'

export const getItemData = (data: any) => {
  return hyRequest.post<any>({
    url: '/cms/userPay/getPay',
    data: data
  })
}
