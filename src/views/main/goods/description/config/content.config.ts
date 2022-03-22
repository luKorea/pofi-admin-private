/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-22 11:55:17
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/tradeRecord/config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'
export const contentTableConfig: TableConfig = {
  title: '套餐文案',
  propList: [
    { prop: 'id', label: '文案编号' },
    { prop: 'rank', label: '排序序号' },
    { prop: 'name', label: '文案名称' },
    { prop: 'type', label: '文案类型', slotName: 'isType' },
    { prop: 'funcType', label: '所属套餐', slotName: 'isFuncType' },
    { prop: 'parentName', label: '所属权益' },
    { label: '操作', slotName: 'handler' }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  childrenProps: {
    rowKey: 'id'
  },
  permission: {
    add: true,
    update: true,
    delete: true,
    drawTable: true
  }
}
