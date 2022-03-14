/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-14 16:57:26
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/fusing/page-config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'

export const contentTableConfig: TableConfig = {
  title: '权限&功能管理',
  propList: [
    { prop: 'id', label: 'ID' },
    { prop: 'name', label: '模块&功能' },
    { prop: 'path', label: '接口地址' },
    { prop: 'state', label: '状态', slotName: 'isState' }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  showFooter: false,
  permission: {
    add: false,
    update: false,
    delete: false,
    query: true,
    drawTable: false
  }
}
