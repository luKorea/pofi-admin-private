/*
 * @Author: your name
 * @Date: 2022-03-17 09:54:28
 * @LastEditTime: 2022-03-17 09:54:28
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /pofi-admin/src/service/main/userOperation/userOperation.ts
 */

import hyRequest from '@/service'

export const getItemData = (data: any) => {
  return hyRequest.post<any>({
    url: '/cms/userInfo/show',
    data: data,
    showLoading: false
  })
}
