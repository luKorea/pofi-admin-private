/*
 * @Author: korealu
 * @Date: 2022-02-10 10:33:36
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 11:15:21
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/resource/keyword/keyword.ts
 */
const keyword = () => import('@/views/main/resource/keyword/keyword.vue')
export default {
  path: '/resource/keyword',
  name: 'keyword',
  component: keyword,
  children: [],
  meta: {
    title: '关键词管理'
  }
}
