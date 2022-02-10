/*
 * @Author: korealu
 * @Date: 2022-02-10 10:34:02
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 11:14:55
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/resource/topic/topic.ts
 */
const topic = () => import('@/views/main/resource/topic/topic.vue')
export default {
  path: '/resource/topic',
  name: 'topic',
  component: topic,
  children: [],
  meta: {
    title: '专题管理'
  }
}
