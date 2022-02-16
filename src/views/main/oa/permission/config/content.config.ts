import { TableConfig } from '@/types/table-config'

/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-16 09:34:45
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/oa/permission/config/content.config.ts
 */
export const contentTableConfig: TableConfig = {
  title: '权限列表',
  propList: [
    { prop: 'id', label: 'ID' },
    { prop: 'name', label: '名字' },
    { prop: 'url', label: 'URL' },
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
    query: true
  }
}
