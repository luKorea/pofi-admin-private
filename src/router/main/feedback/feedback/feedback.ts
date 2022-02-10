/*
 * @Author: korealu
 * @Date: 2022-02-10 09:17:54
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 09:48:29
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/feedback/feedback/feedback.ts
 */
const feedback = () => import('@/views/main/feedback/feedback/feedback.vue')
export default {
  path: '/feedback/Feedback',
  name: 'feedback',
  component: feedback,
  children: [],
  meta: {
    title: '问题列表'
  }
}
