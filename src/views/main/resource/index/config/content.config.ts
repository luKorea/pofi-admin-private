/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-08 11:51:04
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/language/config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'
export const contentTableConfig: TableConfig = {
  title: '首页管理',
  propList: [
    { prop: 'rank', label: '排序序号' },
    { prop: 'id', label: '编号' },
    { prop: 'remark', label: '内容' },
    { prop: 'title', label: '所属库', slotName: 'isTitle' },
    { prop: 'category', label: '所属分类页', slotName: 'isComponent' },
    { prop: 'type', label: '样式类型', slotName: 'isType' },
    { prop: 'rid', label: '国家/地区', slotName: 'isCountry' },
    { prop: 'status', label: '状态', slotName: 'isStatus' },
    { label: '操作', slotName: 'handler' }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  showFooter: true,
  childrenProps: {
    rowKey: 'id'
  },
  permission: {
    add: true,
    update: true,
    delete: true,
    rowAdd: false,
    drawTable: true
  }
}
