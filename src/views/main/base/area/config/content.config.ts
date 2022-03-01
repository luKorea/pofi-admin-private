/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-01 14:22:33
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/area/config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'
export const contentTableConfig: TableConfig = {
  title: '地区管理',
  propList: [
    { prop: 'id', label: 'ID' },
    { prop: 'name', label: '国家/地区' },
    { prop: 'picture', label: '图片', slotName: 'slotImage' },
    { prop: 'code', label: '标头' },
    { prop: 'areaCode', label: '电话区号' },
    { prop: 'iso', label: 'ISO标头' },
    { prop: 'developed', label: '定价等级', slotName: 'slotLevel' },
    { prop: 'state', label: '状态', slotName: 'slotState' },
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
