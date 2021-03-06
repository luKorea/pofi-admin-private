/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-20 11:32:57
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/language/config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'
export const contentTableConfig: TableConfig = {
  title: '机构组织',
  propList: [
    { prop: 'id', label: '机构ID', slotName: 'isId' },
    { prop: 'url', label: '机构头像', slotName: 'isImage' },
    { prop: 'name', label: '机构名称' },
    // { prop: 'job', label: '画师职业', slotName: 'isJob' },
    { prop: 'nickId', label: 'Pofi ID' },
    // { prop: 'title', label: '专题数' },
    { prop: 'areaList', label: '国家/地区' },
    { prop: 'region', label: '机构国家/地区', slotName: 'isRegion' },
    // { prop: 'subTitle', label: '包含语言' },
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
