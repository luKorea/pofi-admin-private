/*
 * @Author: korealu
 * @Date: 2022-02-10 10:30:34
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 11:22:43
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/help/function/function.ts
 */
const helpFunction = () => import('@/views/main/help/function/function.vue')
export default {
  path: '/help/function',
  name: 'helpFunction',
  component: helpFunction,
  children: [],
  meta: {
    title: '功能说明'
  }
}
