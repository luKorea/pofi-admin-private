/*
 * @Author: korealu
 * @Date: 2022-02-10 10:33:13
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 11:14:17
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/resource/classify/classify.ts
 */
const classify = () => import('@/views/main/resource/classify/classify.vue')
export default {
  path: '/resource/classify',
  name: 'classify',
  component: classify,
  children: [],
  meta: {
    title: '分类管理'
  }
}
