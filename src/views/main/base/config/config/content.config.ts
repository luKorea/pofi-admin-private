/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-01 09:45:41
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/config/page-config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'

export const contentTableConfig: TableConfig = {
  title: '配置管理列表',
  propList: [
    { prop: 'id', label: '编号' },
    { prop: 'title', label: '使用栏目/名称' },
    { prop: 'state', label: '状态', slotName: 'isState' },
    { prop: 'show', label: '显示', slotName: 'isShow' },
    { prop: 'areaList', label: '国家地区' },
    { prop: 'name', label: '变量名' },
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
