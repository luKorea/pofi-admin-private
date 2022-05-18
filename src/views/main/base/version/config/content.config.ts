/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-18 14:08:28
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/language/config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'
export const contentTableConfig: TableConfig = {
  title: '版本管理',
  propList: [
    { prop: 'id', label: '编号' },
    { prop: 'osType', label: '平台', slotName: 'isOsType' },
    { prop: 'versionName', label: '版本名称' },
    { prop: 'version', label: '版本号' },
    { prop: 'notice', label: '更新内容' },
    { prop: 'host', label: '连接服务器', slotName: 'isHost' },
    { prop: 'areaList', label: '可用地区' },
    { prop: 'updateTime', label: '编辑时间' },
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
    add: false,
    update: true,
    delete: true,
    rowAdd: false,
    drawTable: false
  }
}
