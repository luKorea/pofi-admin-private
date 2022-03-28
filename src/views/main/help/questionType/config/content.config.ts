/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-23 12:07:08
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/language/config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'
export const contentTableConfig: TableConfig = {
  title: '问题类型管理',
  propList: [
    { prop: 'id', label: '编号' },
    { prop: 'rank', label: '排序序号' },
    { prop: 'title', label: '问题类型' },
    { prop: 'areaList', label: '可用地区' },
    { prop: 'num', label: '问题数量' },
    { prop: 'img', label: '图片', slotName: 'isImage' },
    { prop: 'state', label: '状态', slotName: 'isState' },
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
