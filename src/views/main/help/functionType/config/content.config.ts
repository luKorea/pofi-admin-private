/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-23 13:46:10
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/language/config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'
export const contentTableConfig: TableConfig = {
  title: '功能说明分类',
  propList: [
    { prop: 'id', label: 'ID' },
    { prop: 'rank', label: '排序序号' },
    { prop: 'name', label: '名称' },
    { prop: 'url', label: '图片', slotName: 'isImage' },
    { prop: 'title', label: '功能分类标题' },
    { prop: 'subTitle', label: '副标题' },
    { label: '操作', slotName: 'handler' }
  ],
  childrenProps: {
    rowKey: 'id'
  },
  showIndexColumn: false,
  showSelectColumn: false,
  permission: {
    add: true,
    update: true,
    delete: true,
    drawTable: true
  }
}
