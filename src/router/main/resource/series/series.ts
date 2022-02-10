/*
 * @Author: korealu
 * @Date: 2022-02-10 10:33:53
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 11:15:26
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/resource/series/series.ts
 */
const series = () => import('@/views/main/resource/series/series.vue')
export default {
  path: '/resource/series',
  name: 'series',
  component: series,
  children: [],
  meta: {
    title: '系列管理'
  }
}
