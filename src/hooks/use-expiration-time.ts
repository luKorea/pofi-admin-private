/*
 * @Author: korealu
 * @Date: 2022-03-10 11:20:03
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-10 11:44:43
 * @Description: file content
 * @FilePath: /pofi-admin/src/hooks/use-expiration-time.ts
 */
import localCache from '@/utils/cache'
import { errorTip } from '@/utils/tip-info'
// 判断用户登录状态是否过期，过期跳转到登录页
export function useExpirationTime(router: any) {
  const expirationTime = localCache.getCache('userInfo').time
  if (expirationTime < new Date().getTime()) {
    errorTip('登录状态已过期，请重新登录')
    localCache.deleteCache('token')
    localCache.deleteCache('userInfo')
    localCache.deleteCache('routerList')
    localCache.deleteCache('userMenus')
    router.replace('/login')
  }
}
