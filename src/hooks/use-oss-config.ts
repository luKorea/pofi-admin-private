/*
 * @Author: korealu
 * @Date: 2022-02-18 11:45:02
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-18 12:53:54
 * @Description: file content
 * @FilePath: /pofi-admin/src/hooks/use-oss-config.ts
 */
import { getOssToken } from '@/service/upload'
export function useOSSConfig() {
  return getOssToken(2).then((res: any) => res.data)
}
export function clientSendFile(
  client: any,
  fileTypName: string,
  fileName: string,
  file: any
) {
  // resultFiles 是 input 中选中的文件列表
  // insertImgFn 是获取图片 url 后，插入到编辑器的方法
  const suffix = '.' + file.name.split('.').pop()
  const name = fileTypName + fileName + suffix
  return new Promise((resolve: any, reject: any) => {
    client
      .multipartUpload(name, file)
      .then((val: any) => {
        resolve(val)
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}
