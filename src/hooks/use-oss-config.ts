/*
 * @Author: korealu
 * @Date: 2022-02-18 11:45:02
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-18 16:52:25
 * @Description: file content
 * @FilePath: /pofi-admin/src/hooks/use-oss-config.ts
 */
import { getOssToken } from '@/service/upload'
import OSS from 'ali-oss'
import localCache from '@/utils/cache'
import dayJs from 'dayjs'

export function useGetClient() {
  let client: any = null
  if (localCache.getSessionCache('ossRes')) {
    const res = localCache.getSessionCache('ossRes')
    const expirationDate = dayJs(res.expiration).valueOf()
    const nowDate = dayJs(new Date()).valueOf()
    if (expirationDate < nowDate) {
      console.log('OSS过期')
      localCache.clearSessionCache()
      useOSSConfig().then((res) => {
        localCache.setSessionCache('ossRes', res)
        client = new OSS({
          region: 'oss-cn-hongkong',
          stsToken: res.securityToken,
          bucket: res.bucketName,
          ...res
        })
      })
    } else {
      client = new OSS({
        region: 'oss-cn-hongkong',
        stsToken: res.securityToken,
        bucket: res.bucketName,
        ...res
      })
    }
  } else {
    useOSSConfig().then((res) => {
      localCache.setSessionCache('ossRes', res)
      client = new OSS({
        region: 'oss-cn-hongkong',
        stsToken: res.securityToken,
        bucket: res.bucketName,
        ...res
      })
    })
  }
  return client
}

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
