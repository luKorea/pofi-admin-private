/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-10 17:54:37
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/tradeRecord/config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'
export const contentTableConfig: TableConfig = {
  title: '用户资源仓库',
  propList: [
    { prop: 'nickId', label: 'POFI ID', sortable: true },
    { prop: 'pname', label: '资源名字' },
    { prop: 'moid', label: '资源编号' },
    { prop: 'labelId', label: '标注ID' },
    { prop: 'state', label: '模型状态', slotName: 'isState' },
    { prop: 'num', label: '是否拥有', slotName: 'isHave' },
    { prop: 'way', label: '获取方式', slotName: 'isGetter' },
    { prop: 'createTime', label: '拥有时间' },
    { label: '操作', slotName: 'handler' }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  permission: {
    add: true,
    update: true,
    delete: false
  }
}
