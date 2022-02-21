import { TableConfig } from '@/types/table-config'

/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-21 11:06:15
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/oa/role/config/content.config.ts
 */
export const contentTableConfig: TableConfig = {
  title: '角色列表',
  propList: [
    { prop: 'id', label: 'ID' },
    { prop: 'type', label: '角色标识' },
    { prop: 'name', label: '角色名称' },
    { prop: 'modUser', label: '修改人' },
    {
      prop: 'modTime',
      label: '修改时间',
      slotName: 'updateAt'
    },
    { label: '操作', slotName: 'handler' }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  showFooter: false,
  permission: {
    add: true,
    update: true,
    delete: true,
    query: true,
    drawTable: false,
    distribution: false
  }
}
