/*
 * @Author: korealu
 * @Date: 2022-02-10 10:30:45
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 11:22:53
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/help/functionType/functionType.ts
 */
const functionType = () =>
  import('@/views/main/help/functionType/functionType.vue')
export default {
  path: '/help/functionType',
  name: 'functionType',
  component: functionType,
  children: [],
  meta: {
    title: '功能说明分类'
  }
}
