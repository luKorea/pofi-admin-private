/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-23 11:07:06
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/language/config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'
export const contentTableConfig: TableConfig = {
  title: '问题管理',
  propList: [
    { prop: 'id', label: 'ID' },
    // { prop: 'rank', label: '排序序号' },
    { prop: 'title', label: '备注' },
    { prop: 'typeDec', label: '问题类型' },
    { prop: 'isHot', label: '热门', slotName: 'isHot' },
    { prop: 'state', label: '状态', slotName: 'isState' },
    { prop: 'createTime', label: '发布时间' },
    { prop: 'modUser', label: '操作人' },
    { label: '操作', slotName: 'handler' }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  permission: {
    add: true,
    update: true,
    delete: true,
    drawTable: false
  }
}
