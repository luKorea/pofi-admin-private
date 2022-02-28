/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-28 10:48:38
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/tradeRecord/config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'
export const contentTableConfig: TableConfig = {
  title: '内购记录',
  propList: [
    { prop: 'id', label: '内购ID', sortable: true },
    { prop: 'nickId', label: 'POFI ID', sortable: true },
    { prop: 'nickName', label: '用户昵称' },
    { prop: 'costType', label: '支付方式', slotName: 'costType' },
    { prop: 'cost', label: '支付金额', slotName: 'payMoney', width: '100' },
    { prop: 'pname', label: '目标商品' },
    { prop: 'version', label: '来源平台' },
    { prop: 'remark', label: '备注' },
    { prop: 'time', label: '操作时间' }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  permission: {
    add: false,
    update: false,
    delete: false
  }
}
