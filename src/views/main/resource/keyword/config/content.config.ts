/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-14 14:38:38
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/language/config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'
export const contentTableConfig: TableConfig = {
  title: '关键词管理',
  propList: [
    { prop: 'id', label: 'ID' },
    { prop: 'name', label: '关键词' },
    { prop: 'type', label: '关键词类型', slotName: 'isType' },
    { prop: 'num', label: '资源数量' },
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
