/*
 * @Author: korealu
 * @Date: 2022-02-10 10:28:58
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 11:12:27
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/goods/function/function.ts
 */
const goodsFunction = () => import('@/views/main/goods/function/function.vue')
export default {
  path: '/goods/function',
  name: 'goodsFunction',
  component: goodsFunction,
  children: [],
  meta: {
    title: '功能套餐'
  }
}
