/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-15 11:09:18
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/tradeRecord/config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'
export const contentTableConfig: TableConfig = {
  title: '功能套餐',
  propList: [
    { prop: 'id', label: '套餐编号', slotName: 'isID' },
    { prop: 'label', label: '商品标注' },
    { prop: 'name', label: '套餐名称' },
    { prop: 'sale', label: '销售价' },
    { prop: 'original', label: '原价' },
    { prop: 'version', label: '说明文字' },
    { prop: 'labelShow', label: '备注' },
    { prop: 'rank', label: '排序序号' },
    { prop: 'developed', label: '发达国家', slotName: 'isDeveloped' },
    { prop: 'show', label: '套餐状态', slotName: 'isState' },
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
