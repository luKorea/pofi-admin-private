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
  title: '分类管理',
  propList: [
    { prop: 'name', label: '分类名称', align: 'left' },
    { label: '操作', slotName: 'handler' }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  showFooter: false,
  childrenProps: {
    rowKey: 'id',
    defaultExpandAll: true
  },
  permission: {
    add: false,
    update: true,
    delete: true,
    rowAdd: true,
    drawTable: false
  }
}
