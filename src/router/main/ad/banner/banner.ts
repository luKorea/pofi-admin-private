/*
 * @Author: korealu
 * @Date: 2022-02-10 10:10:17
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 10:11:53
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/ad/banner/banner.ts
 */
const banner = () => import('@/views/main/ad/banner/banner.vue')
export default {
  path: '/ad/banner',
  name: 'banner',
  component: banner,
  meta: {
    title: '栏目广告'
  }
}
