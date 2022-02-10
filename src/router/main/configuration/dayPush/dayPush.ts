/*
 * @Author: korealu
 * @Date: 2022-02-10 10:25:21
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 10:38:29
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/configuration/dayPush/dayPush.ts
 */
const dayPush = () => import('@/views/main/configuration/dayPush/dayPush.vue')
export default {
  path: '/configuration/dayPush',
  name: 'dayPush',
  component: dayPush,
  children: []
}
