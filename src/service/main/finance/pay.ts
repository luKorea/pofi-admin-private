/*
 * @Author: korealu
 * @Date: 2022-02-28 09:54:41
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-28 14:49:41
 * @Description: file content
 * @FilePath: /pofi-admin/src/service/main/finance/pay.ts
 */

import hyRequest from '@/service'

export const getItemData = (data: any) => {
  return hyRequest.post<any>({
    url: '/cms/userPay/show',
    data: data
  })
}
