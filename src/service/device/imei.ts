/*
 * @Author: korealu
 * @Date: 2022-02-22 14:10:18
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-22 14:11:32
 * @Description: file content
 * @FilePath: /pofi-admin/src/service/device/imei.ts
 */
import hyRequest from '@/service'

export function selectImeiOperation(data: any) {
  return hyRequest.post<any>({
    url: '/cms/userImei/updateBatch',
    data: data
  })
}
