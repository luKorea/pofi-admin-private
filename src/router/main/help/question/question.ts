/*
 * @Author: korealu
 * @Date: 2022-02-10 10:31:05
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 11:22:57
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/help/question/question.ts
 */
const question = () => import('@/views/main/help/question/question.vue')
export default {
  path: '/help/question',
  name: 'question',
  component: question,
  children: [],
  meta: {
    title: '问题管理'
  }
}
