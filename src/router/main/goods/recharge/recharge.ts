/*
 * @Author: korealu
 * @Date: 2022-02-10 10:29:24
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 11:13:26
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/goods/recharge/recharge.ts
 */
const recharge = () => import('@/views/main/goods/recharge/recharge.vue')
export default {
  path: '/goods/recharge',
  name: 'recharge',
  component: recharge,
  children: [],
  meta: {
    title: '充值套餐'
  }
}
