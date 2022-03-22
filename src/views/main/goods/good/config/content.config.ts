/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-15 10:44:15
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/tradeRecord/config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'
export const contentTableConfig: TableConfig = {
  title: '资源商品',
  propList: [
    { prop: 'snId', label: '商品编号', slotName: 'isID' },
    { prop: 'label', label: '商品标注' },
    { prop: 'name', label: '商品名称' },
    { prop: 'unityType', label: '商品类型', slotName: 'isUnity' },
    { prop: 'content', label: '商品内容', slotName: 'isContent' },
    { prop: 'show', label: '商品状态', slotName: 'isState' },
    { prop: 'promotionSwitch', label: '活动状态', slotName: 'isActive' },
    { prop: 'createTime', label: '创建时间' },
    { label: '操作', slotName: 'handler' }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  permission: {
    add: true,
    update: true,
    delete: true,
    drawTable: false
  }
}
