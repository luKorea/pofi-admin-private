/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-30 10:18:28
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/tradeRecord/config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'
export const contentTableConfig: TableConfig = {
  title: '充值套餐',
  propList: [
    { prop: 'id', label: '套餐编号', slotName: 'isID' },
    { prop: 'label', label: '商品标注' },
    { prop: 'name', label: '套餐名称' },
    { prop: 'sale', label: '销售价' },
    { prop: 'original', label: '原价' },
    { prop: 'rcg', label: '实际到账(P币)' },
    { prop: 'labelShow', label: '说明文字' },
    // { prop: 'labelShow', label: '备注' },
    { prop: 'rank', label: '排序序号' },
    { prop: 'developed', label: '定价等级', slotName: 'isDeveloped' },
    { prop: 'show', label: '商品状态', slotName: 'isState' },
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
