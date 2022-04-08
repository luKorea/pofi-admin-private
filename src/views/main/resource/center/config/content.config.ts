/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-08 14:09:03
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/device/imei/config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'
export const contentTableConfig: TableConfig = {
  title: '资源管理中心',
  propList: [
    { prop: 'id', label: 'ID', sortable: true, minWidth: '50' },
    { prop: 'moId', label: '资源编号' },
    { prop: 'nickId', label: '标注ID' },
    { prop: 'pname', label: '模型名称' },
    { prop: 'unityType', label: 'U3D类型', slotName: 'isU3D' },
    { prop: 'open', label: '使用条件', slotName: 'isOpen' },
    { prop: 'state', label: '模型状态', slotName: 'isState' },
    {
      prop: 'version',
      label: '设备版本',
      slotName: 'isVersion',
      align: 'left'
    },
    { prop: 'onlineTime', label: '上线时间', slotName: 'createAt' },
    { prop: 'updatedTime', label: '最后修改日期', slotName: 'createAt' },
    { label: '操作', slotName: 'handler' }
  ],
  showIndexColumn: false,
  showSelectColumn: true,
  permission: {
    add: false,
    update: false,
    delete: false
  }
}
