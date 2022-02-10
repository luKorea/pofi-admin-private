/*
 * @Author: korealu
 * @Date: 2022-02-10 10:31:19
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 11:23:10
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/help/questionType/questionType.ts
 */
const questionType = () =>
  import('@/views/main/help/questionType/questionType.vue')
export default {
  path: '/help/questionType',
  name: 'questionType',
  component: questionType,
  children: [],
  meta: {
    title: '问题类型管理'
  }
}
