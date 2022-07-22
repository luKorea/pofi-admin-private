/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-22 10:27:45
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/tradeRecord/config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'
export const contentTableConfig: TableConfig = {
  title: '问题列表',
  propList: [
    { prop: 'id', label: '编号', sortable: true, width: '80' },
    { prop: 'content', label: '内容' },
    { prop: 'nickName', label: '用户名', slotName: 'isNickName' },
    { prop: 'nickId', label: '用户ID', slotName: 'isNickID' },
    { prop: 'typeDec', label: '类型' },
    { prop: 'region', label: '地区', slotName: 'isRegion' },
    { prop: 'contact', label: '联系方式' },
    { prop: 'status', label: '状态', slotName: 'isStatus' },
    { prop: 'optTag', label: '标签', slotName: 'isTag' },
    { prop: 'remark', label: '备注' },
    { prop: 'optTime', label: '最后更新', slotName: 'updateAt' },
    { prop: 'time', label: '创建时间' },
    { label: '操作', slotName: 'handler' }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  permission: {
    add: false,
    update: false,
    delete: false
  }
}
