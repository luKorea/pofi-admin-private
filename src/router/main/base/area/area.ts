/*
 * @Author: korealu
 * @Date: 2022-02-10 10:17:47
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 11:16:21
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/base/area/area.ts
 */
const area = () => import('@/views/main/base/area/area.vue')
export default {
  path: '/base/area',
  name: 'area',
  component: area,
  children: [],
  meta: {
    title: '地区管理'
  }
}
