/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-06 17:46:50
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/language/config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'
export const contentTableConfig: TableConfig = {
  title: '多语言管理',
  propList: [
    { prop: 'id', label: 'ID' },
    { prop: 'code', label: '内部编码' },
    { prop: 'name', label: '语言名称' },
    { prop: 'area', label: '默认国家/地区' },
    { prop: 'state', label: '状态', slotName: 'isState' }
    // { label: '操作', slotName: 'handler' }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  permission: {
    add: false,
    update: false,
    delete: false,
    drawTable: false
  }
}
