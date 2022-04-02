/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-15 17:10:19
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/pay/config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'
export const contentTableConfig: TableConfig = {
  title: '用户钱包',
  propList: [
    { prop: 'nickId', label: 'POFI ID', sortable: true },
    { prop: 'nickName', label: '用户昵称' },
    { prop: 'pb', label: 'P币余额', slotName: 'isPb' },
    { prop: 'lv', label: '等级', slotName: 'isLevel' },
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
