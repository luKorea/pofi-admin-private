/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-09 10:30:59
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/pay/config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'
export const contentTableConfig: TableConfig = {
  title: '用户管理',
  propList: [
    { prop: 'uid', label: 'UID' },
    { prop: 'nickId', label: 'POFI ID' },
    { prop: 'nickName', label: '用户昵称' },
    { prop: 'head', label: '用户头像', slotName: 'isAvatar' },
    { prop: 'srcDec', label: '注册类型' },
    { prop: 'name', label: '是否实名', slotName: 'isReal' },
    { prop: 'status', label: '账号状态', slotName: 'isStatus' },
    { prop: 'deviceCount', label: '登录设备数' },
    { prop: 'updateTime', label: '更新时间' },
    { prop: 'regTime', label: '创建时间' },
    { label: '操作', slotName: 'handler' }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  permission: {
    add: false,
    update: true,
    operation: true,
    delete: false
  }
}
