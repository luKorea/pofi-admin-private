/*
 * @Author: korealu
 * @Date: 2022-02-18 11:45:02
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-18 13:06:05
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
  console.log(file, 'file')
  const suffix = '.' + file.type.split('/')[1]
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
