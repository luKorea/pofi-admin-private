/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-06 16:23:26
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
    { prop: 'pro', label: 'Pro专业版', slotName: 'isPro' },
    { prop: 'plus', label: 'Plus', slotName: 'isPlus' },
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
