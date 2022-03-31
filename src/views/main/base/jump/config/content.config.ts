/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-01 15:30:51
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/head/config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'
export const contentTableConfig: TableConfig = {
  title: '跳转设置',
  propList: [
    { prop: 'id', label: '内部编号', sortable: true },
    { prop: 'platform', label: '使用平台' },
    { prop: 'name', label: '跳转名称' },
    { prop: 'direction', label: '跳转方向' },
    { prop: 'typeDes', label: '跳转类型' },
    { prop: 'jump', label: '链接地址' },
    { prop: 'createTime', label: '创建时间', slotName: 'updateAt' },
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
    drawTable: false
  }
}
