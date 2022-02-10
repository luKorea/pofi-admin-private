/*
 * @Author: korealu
 * @Date: 2022-02-10 10:25:57
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 11:23:53
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/device/condition/condition.ts
 */
const condition = () => import('@/views/main/device/condition/condition.vue')
export default {
  path: '/device/condition',
  name: 'condition',
  component: condition,
  children: [],
  meta: {
    title: '限制条件'
  }
}
