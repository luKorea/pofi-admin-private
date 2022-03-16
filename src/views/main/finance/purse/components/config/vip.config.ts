/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-16 12:11:48
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/pay/config/vipTableConfig.ts
 */

import { TableConfig } from '@/types/table-config'
export const vipTableConfig: TableConfig = {
  title: '编辑VIP',
  propList: [
    { prop: 'vipType', label: '功能名' },
    { prop: 'beginTime', label: '开始时间', slotName: 'isBeginTime' },
    { prop: 'endTime', label: '结束时间', slotName: 'isEndTime' },
    { prop: 'effective', label: '是否生效', slotName: 'isEffective' },
    { prop: 'day', label: '剩余天数' },
    { prop: 'saveTime', label: '留存天数' },
    { label: '操作', slotName: 'handler' }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  permission: {
    add: true,
    update: true,
    operation: false,
    delete: false
  }
}
