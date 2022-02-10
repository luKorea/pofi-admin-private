/*
 * @Author: korealu
 * @Date: 2022-02-10 10:32:57
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 11:13:59
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/resource/center/center.ts
 */
const center = () => import('@/views/main/resource/center/center.vue')
export default {
  path: '/resource/resourceCenter',
  name: 'center',
  component: center,
  children: [],
  meta: {
    title: '资源管理中心'
  }
}
