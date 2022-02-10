/*
 * @Author: korealu
 * @Date: 2022-02-10 10:33:22
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 11:14:39
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/resource/data/data.ts
 */
const data = () => import('@/views/main/resource/data/data.vue')
export default {
  path: '/resource/data',
  name: 'data',
  component: data,
  children: [],
  meta: {
    title: '资源数据统计'
  }
}
