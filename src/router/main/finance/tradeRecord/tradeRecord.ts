/*
 * @Author: korealu
 * @Date: 2022-02-10 10:27:16
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-10 11:21:40
 * @Description: file content
 * @FilePath: /pofi-admin/src/router/main/finance/tradeRecord/tradeRecord.ts
 */
const tradeRecord = () =>
  import('@/views/main/finance/tradeRecord/tradeRecord.vue')
export default {
  path: '/finance/tradeRecord',
  name: 'tradeRecord',
  component: tradeRecord,
  children: [],
  meta: {
    title: '内测记录'
  }
}
