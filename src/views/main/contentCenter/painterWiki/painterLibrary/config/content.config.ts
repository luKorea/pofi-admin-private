/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-06-22 13:41:58
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/language/config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'
export const contentTableConfig: TableConfig = {
  title: '画师库',
  propList: [
    { prop: 'id', label: '画师ID', slotName: 'isId' },
    { prop: 'url', label: '画师头像', slotName: 'isImage' },
    { prop: 'name', label: '画师名称' },
    // { prop: 'job', label: '画师职业', slotName: 'isJob' },
    { prop: 'nickId', label: 'Pofi ID' },
    { prop: 'title', label: '专题数' },
    { prop: 'areaList', label: '国家/地区' },
    { prop: 'subTitle', label: '包含语言' },
    { prop: 'createTime', label: '创建时间' },
    { prop: 'status', label: '状态', slotName: 'isState' },
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
