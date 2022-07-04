/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-23 15:48:11
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/language/config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'
export const contentTableConfig: TableConfig = {
  title: '功能说明管理',
  propList: [
    { prop: 'id', label: '编号' },
    { prop: 'rank', label: '排序序号' },
    { prop: 'name', label: '名称' },
    { prop: 'url', label: '图片', slotName: 'isImage' },
    { prop: 'typeDec', label: '功能分类标题' },
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
