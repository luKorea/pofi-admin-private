/*
 * @Author: korealu
 * @Date: 2022-02-10 10:26:25
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 11:24:58
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/device/imei/imein.ts
 */
const imei = () => import('@/views/main/device/imei/imei.vue')
export default {
  path: '/device/imei',
  name: 'imei',
  component: imei,
  children: [],
  meta: {
    title: '用户设备清单'
  }
}
