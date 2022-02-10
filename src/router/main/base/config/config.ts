/*
 * @Author: korealu
 * @Date: 2022-02-10 10:17:58
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 11:16:46
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/base/config/config.ts
 */
const config = () => import('@/views/main/base/config/config.vue')
export default {
  path: '/base/config',
  name: 'config',
  component: config,
  children: [],
  meta: {
    title: '配置管理(超管)'
  }
}
