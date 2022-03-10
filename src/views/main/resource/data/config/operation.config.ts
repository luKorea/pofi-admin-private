/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-10 13:55:11
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/resource/data/config/operation.config.ts
 */

import { TableConfig } from '@/types/table-config'
export const operationTableConfig: TableConfig = {
  title: '下载量日志',
  propList: [
    { prop: 'mark', label: '操作内容' },
    { prop: 'opt', label: '操作人' },
    { prop: 'createTime', label: '时间' }
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
