/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-16 15:06:30
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/oa/user/config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'

export const contentTableConfig: TableConfig = {
  title: '用户列表',
  propList: [
    { prop: 'id', label: 'ID' },
    { prop: 'username', label: '登录名' },
    { prop: 'nickname', label: '用户名' },
    { prop: 'email', label: '邮箱' },
    { prop: 'phone', label: '手机号码' },
    {
      prop: 'createAt',
      label: '创建时间',
      slotName: 'createAt'
    },
    {
      prop: 'onlineTime',
      label: '在线时间',
      slotName: 'updateAt'
    },
    { prop: 'modUser', label: '修改人' },
    { prop: 'valid', label: '状态', slotName: 'status' },
    { label: '操作', slotName: 'handler', minWidth: '100px' }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  showFooter: false,
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
