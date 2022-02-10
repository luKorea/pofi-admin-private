/*
 * @Author: korealu
 * @Date: 2022-02-10 10:17:35
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 11:16:09
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/base/accessory/accessory.ts
 */
const accessory = () => import('@/views/main/base/accessory/accessory.vue')
export default {
  path: '/base/accessory',
  name: 'accessory',
  component: accessory,
  children: [],
  meta: {
    title: '附件管理'
  }
}
