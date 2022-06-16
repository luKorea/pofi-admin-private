/*
 * @Author: korealu
 * @Date: 2022-02-18 11:45:02
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-06-16 09:36:37
 * @Description: file content
 * @FilePath: /pofi-admin/src/hooks/use-oss-config.ts
 */
import { getOssToken } from '@/service/upload'
import OSS from 'ali-oss'
import localCache from '@/utils/cache'
import dayJs from 'dayjs'
import { OSSURL } from '@/service/request/config'

// export function useGetClient() {
//   let client: any = null
//   if (localCache.getSessionCache('ossRes')) {
//     const res = localCache.getSessionCache('ossRes')
//     client = new OSS({
//       region: 'oss-cn-hongkong',
//       stsToken: res.securityToken,
//       bucket: res.bucketName,
//       refreshSTSTokenInterval: 300000,
//       refreshSTSToken: async () => {
//         // 向您搭建的STS服务获取临时访问凭证。
//         const info: any = await useOSSConfig()
//         return {
//           accessKeyId: info.accessKeyId,
//           accessKeySecret: info.accessKeySecret,
//           stsToken: info.stsToken
//         }
//       },
//       ...res
//     })
//   } else {
//     useOSSConfig().then((res) => {
//       localCache.setSessionCache('ossRes', res)
//       client = new OSS({
//         region: 'oss-cn-hongkong',
//         stsToken: res.securityToken,
//         bucket: res.bucketName,
//         refreshSTSTokenInterval: 300000,
//         ...res
//       })
//     })
//   }
//   return client
// }
export function useGetClient() {
  let client: any = null
  useOSSConfig().then((res) => {
    client = new OSS({
      region: 'oss-cn-hongkong',
      stsToken: res.securityToken,
      bucket: res.bucketName,
      ...res
    })
  })
  return client
}

export function useOSSConfig(type = 2) {
  return getOssToken(type).then((res: any) => res.data)
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
    try {
      client
        .multipartUpload(name, file)
        .then((val: any) => {
          resolve(val)
        })
        .catch((err: any) => {
          reject(err)
        })
    } catch (err) {
      console.log(err)
    }
  })
}
