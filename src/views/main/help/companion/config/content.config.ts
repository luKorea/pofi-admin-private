/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-20 17:16:34
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/help/companion/page-config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'

export const contentTableConfig: TableConfig = {
  title: '使用指南',
  propList: [
    { prop: 'rank', label: '排序序号' },
    { prop: 'id', label: '编号' },
    { prop: 'title', label: '标题' },
    { prop: 'bgUrl', label: '图片', slotName: 'image' },
    { prop: 'fileUrl', label: '视频', slotName: 'video' },
    { prop: 'state', label: '状态', slotName: 'state' },
    { label: '操作', slotName: 'handler', minWidth: '100px' }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  showFooter: true,
  permission: {
    add: true,
    update: true,
    delete: true,
    query: true,
    drawTable: true
  },
  childrenProps: {
    rowKey: 'id'
  }
}
