/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-01 15:30:51
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/head/config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'
export const contentTableConfig: TableConfig = {
  title: '栏目广告',
  propList: [
    { prop: 'id', label: '编号' },
    { prop: 'rank', label: '排序序号' },
    { prop: 'pname', label: '内容' },
    { prop: 'library', label: '所属库', slotName: 'isLibrary' },
    { prop: 'areaList', label: '国家/地区' },
    { prop: 'state', label: '状态', slotName: 'isState' },
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
    drawTable: true
  }
}
