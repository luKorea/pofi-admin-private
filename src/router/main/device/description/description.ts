/*
 * @Author: korealu
 * @Date: 2022-02-10 10:26:13
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 11:24:13
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/device/description/description.ts
 */
const deviceDescription = () =>
  import('@/views/main/device/description/description.vue')
export default {
  path: '/device/description',
  name: 'deviceDescription',
  component: deviceDescription,
  children: [],
  meta: {
    title: '预警文案'
  }
}
