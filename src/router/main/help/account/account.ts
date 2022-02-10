/*
 * @Author: korealu
 * @Date: 2022-02-10 10:29:55
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 11:22:05
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/help/account/account.ts
 */
const account = () => import('@/views/main/help/account/account.vue')
export default {
  path: '/help/account',
  name: 'account',
  component: account,
  children: [],
  meta: {
    title: '联系账号'
  }
}
