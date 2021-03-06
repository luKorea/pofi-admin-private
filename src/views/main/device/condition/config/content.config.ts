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
  title: '限制条件列表',
  propList: [
    { prop: 'id', label: '序号', sortable: true },
    { prop: 'name', label: '方案名称' },
    { prop: 'limitNum', label: '具体内容', slotName: 'limitNum' },
    { prop: 'state', label: '状态', slotName: 'status' },
    { prop: 'regionName', label: '可用地区' },
    { prop: 'createTime', label: '编辑时间' },
    { label: '操作', slotName: 'handler' }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  permission: {
    add: true,
    update: true,
    delete: true
  }
}
