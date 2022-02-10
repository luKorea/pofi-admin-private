/*
 * @Author: korealu
 * @Date: 2022-02-10 10:19:37
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 11:18:11
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/base/testConfig/testConfig.ts
 */
const testConfig = () => import('@/views/main/base/testConfig/testConfig.vue')
export default {
  path: '/base/testConfig',
  name: 'testConfig',
  component: testConfig,
  children: [],
  meta: {
    title: '配置管理'
  }
}
