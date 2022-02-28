/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-28 15:50:16
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/pay/config/operation.config.ts
 */

import { TableConfig } from '@/types/table-config'
export const operationTableConfig: TableConfig = {
  title: '操作日志',
  propList: [
    { prop: 'optTypeDec', label: '操作类型' },
    { prop: 'mark', label: '操作内容' },
    { prop: 'createTime', label: '时间' },
    { prop: 'opt', label: '操作人' },
    { prop: 'msg', label: '备注' }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  permission: {
    add: false,
    update: false,
    operation: false,
    delete: false
  }
}
