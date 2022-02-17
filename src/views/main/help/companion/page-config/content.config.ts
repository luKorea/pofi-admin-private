/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-17 17:08:50
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/help/companion/page-config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'

export const contentTableConfig: TableConfig = {
  title: '配置管理列表',
  propList: [
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
  childrenProps: {
    rowKey: 'id'
  },
  permission: {
    add: true,
    update: true,
    delete: true,
    query: true,
    drawTable: false
  }
}
