/*
 * @Author: korealu
 * @Date: 2022-02-10 10:19:54
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 11:18:32
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/base/version/version.ts
 */
const version = () => import('@/views/main/base/version/version.vue')
export default {
  path: '/base/version',
  name: 'version',
  component: version,
  children: [],
  meta: {
    title: '版本配置'
  }
}
