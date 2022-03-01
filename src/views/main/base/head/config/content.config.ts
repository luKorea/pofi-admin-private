/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-01 11:18:26
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/head/config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'
export const contentTableConfig: TableConfig = {
  title: '默认头像',
  propList: [
    { prop: 'sort', label: '排序序号' },
    { prop: 'id', label: 'ID' },
    { prop: 'url', label: '头像', slotName: 'slotImage' },
    { prop: 'name', label: '昵称' },
    { prop: 'url', label: '头像地址', slotName: 'slotUrl' },
    { prop: 'state', label: '状态', slotName: 'slotState' },
    { prop: 'areaList', label: '地区' },
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
