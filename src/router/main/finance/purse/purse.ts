/*
 * @Author: korealu
 * @Date: 2022-02-10 10:27:03
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 11:21:22
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/finance/purse/purse.ts
 */
const purse = () => import('@/views/main/finance/purse/purse.vue')
export default {
  path: '/finance/purse',
  name: 'purse',
  component: purse,
  children: [],
  meta: {
    title: '用户钱包'
  }
}
