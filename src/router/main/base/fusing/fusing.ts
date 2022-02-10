/*
 * @Author: korealu
 * @Date: 2022-02-10 10:18:13
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 11:17:01
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/base/fusing/fusing.ts
 */
const fusing = () => import('@/views/main/base/fusing/fusing.vue')
export default {
  path: '/base/fusing',
  name: 'fusing',
  component: fusing,
  children: [],
  meta: {
    title: '模块&功能管理'
  }
}
