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
    { prop: 'id', label: '编号', sortable: true },
    { prop: 'platform', label: '平台' },
    { prop: 'account', label: '账号名称' },
    { prop: 'blackIcon', label: '图标(暗黑)', slotName: 'isBlack' },
    { prop: 'icon', label: '图标', slotName: 'isWhite' },
    { prop: 'jump', label: '链接地址' },
    { prop: 'areaList', label: '地区' },
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
    drawTable: false
  }
}
