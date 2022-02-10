/*
 * @Author: korealu
 * @Date: 2022-02-10 10:13:02
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 10:14:22
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/activity/activityCharge/activityCharge.ts
 */
const activityCharge = () =>
  import('@/views/main/activity/activityCharge/activityCharge.vue')
export default {
  path: '/activity/activityCharge',
  name: 'activityCharge',
  component: activityCharge,
  children: [],
  meta: {
    title: '充值页活动'
  }
}
