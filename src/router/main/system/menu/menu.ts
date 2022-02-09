/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:51
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-09 10:03:06
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/system/menu/menu.ts
 */
const menu = () => import('@/views/main/system/menu/menu.vue')
export default {
  path: '/main/system/menu',
  name: 'menu',
  component: menu,
  children: [],
  meta: {
    title: '菜单管理'
  }
}
