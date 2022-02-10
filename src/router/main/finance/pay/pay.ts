/*
 * @Author: korealu
 * @Date: 2022-02-10 10:26:53
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 11:21:16
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/finance/pay/pay.ts
 */
const pay = () => import('@/views/main/finance/pay/pay.vue')
export default {
  path: '/finance/pay',
  name: 'pay',
  component: pay,
  children: [],
  meta: {
    title: '订单管理'
  }
}
