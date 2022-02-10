/*
 * @Author: korealu
 * @Date: 2022-02-10 10:19:17
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 11:17:54
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/base/language/language.ts
 */
const language = () => import('@/views/main/base/language/language.vue')
export default {
  path: '/base/language',
  name: 'language',
  component: language,
  children: [],
  meta: {
    title: '多语言管理'
  }
}
