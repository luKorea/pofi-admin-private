/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-04 16:07:20
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/language/config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'
export const contentTableConfig: TableConfig = {
  title: '画师专题',
  propList: [
    { prop: 'id', label: '编号' },
    { prop: 'type', label: '专题类型', slotName: 'isType' },
    { prop: 'name', label: '专题名称' },
    { prop: 'authorName', label: '画师名称' },
    { prop: 'showDate', label: '文章日期' },
    { prop: 'areaList', label: '国家/地区' },
    { prop: 'status', label: '是否显示', slotName: 'isState' },
    { prop: 'isUp', label: '是否上架', slotName: 'isUp' },
    { label: '操作', slotName: 'handler' }
  ],
  childrenProps: {
    rowKey: 'id'
  },
  showIndexColumn: false,
  showSelectColumn: false,
  permission: {
    add: true,
    update: true,
    delete: true,
    drawTable: false
  }
}
