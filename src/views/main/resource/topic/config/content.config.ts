/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-23 12:07:08
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/language/config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'
export const contentTableConfig: TableConfig = {
  title: '专题管理',
  propList: [
    { prop: 'id', label: '编号' },
    { prop: 'title', label: '专题名称' },
    { prop: 'num', label: '内容数量' },
    { prop: 'num', label: '国家/地区' },
    { prop: 'state', label: '状态', slotName: 'isState' },
    { label: '操作', slotName: 'handler' }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  showFooter: true,
  childrenProps: {
    rowKey: 'id'
  },
  permission: {
    add: true,
    update: true,
    delete: true,
    rowAdd: false,
    drawTable: true
  }
}
