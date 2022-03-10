/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-10 10:04:57
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/resource/data/config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'
export const contentTableConfig: TableConfig = {
  title: '资源数据统计',
  propList: [
    { prop: 'onId', label: '订单号' },
    { prop: 'nickId', label: 'POFI ID' },
    { prop: 'code', label: '商品ID' },
    { prop: 'nickName', label: '用户昵称' },
    { prop: 'state', label: '支付状态', slotName: 'payState' },
    { prop: 'way', label: '充值方式', slotName: 'payWay' },
    { prop: 'cost', label: '金额', slotName: 'payMoney' },
    { prop: 'attachment', label: '附件' },
    { prop: 'createTime', label: '创建时间' },
    { label: '操作', slotName: 'handler' }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  permission: {
    add: false,
    update: false,
    operation: true,
    delete: false
  }
}
