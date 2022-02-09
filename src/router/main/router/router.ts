/*
 * @Author: korealu
 * @Date: 2022-02-09 16:33:48
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-09 16:33:48
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/oa/router/router.ts
 */
const user = () => import('@/views/main/system/user/user.vue')
export default {
  path: '/oa/router',
  name: 'user',
  component: user,
  children: [],
  meta: {
    title: '用户管理'
  }
}
