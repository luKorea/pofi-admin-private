/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-16 17:10:55
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/device/condition/config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'
export const contentTableConfig: TableConfig = {
  title: '用户列表',
  propList: [
    { prop: 'id', label: '序号', sortable: true },
    { prop: 'name', label: '方案名称', isEdit: true },
    { prop: 'limitNum', label: '具体内容', slotName: 'limitNum', isEdit: true },
    { prop: 'createTime', label: '编辑时间', isEdit: true },
    { label: '操作', slotName: 'handler' }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  showFooter: false,
  permission: {
    add: false,
    update: false,
    delete: false,
    columnAdd: true,
    columnDelete: true
  }
}
