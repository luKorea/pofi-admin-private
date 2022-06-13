/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-06-13 16:38:47
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/tradeRecord/config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'
export const contentTableConfig: TableConfig = {
  title: '用户心得',
  propList: [
    { prop: 'id', label: '心得ID', slotName: 'isID' },
    { prop: 'feelType', label: '分类', slotName: 'isType' },
    { prop: 'name', label: '作者ID', slotName: 'isAuthor' },
    { prop: 'title', label: '心得标题' },
    { prop: 'prepName', label: '主绑定' },
    { prop: 'createTime', label: '创建时间' },
    { prop: 'updateTime', label: '最后修改时间' },
    { prop: 'state', label: '状态', slotName: 'isState' },
    { prop: 'rank', label: '奖励商品' },
    { label: '操作', slotName: 'handler' }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  childrenProps: {
    rowKey: 'id'
  },
  permission: {
    add: true,
    update: true,
    delete: true,
    drawTable: false
  }
}
