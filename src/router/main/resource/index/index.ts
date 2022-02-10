/*
 * @Author: korealu
 * @Date: 2022-02-10 10:48:05
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 11:15:09
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/resource/index/index.ts
 */
const resourceIndex = () => import('@/views/main/resource/index/index.vue')
export default {
  path: '/resource/index',
  name: 'resourceIndex',
  component: resourceIndex,
  children: [],
  meta: {
    title: '首页管理'
  }
}
