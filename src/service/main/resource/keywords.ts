/*
 * @Author: korealu
 * @Date: 2022-02-11 10:36:34
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-01 11:47:46
 * @Description: file content
 * @FilePath: /pofi-admin/src/service/main/base/head.ts
 */
import hyRequest from '@/service'
export function updateKeywordState(data: any) {
  return hyRequest.post<any>({
    url: `/cms/keyword/updateKeyword`,
    data: data
  })
}
