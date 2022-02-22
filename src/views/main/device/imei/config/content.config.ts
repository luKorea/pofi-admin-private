/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-22 13:53:35
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/device/imei/config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'
export const contentTableConfig: TableConfig = {
  title: '用户设备清单',
  propList: [
    { prop: 'id', label: 'ID', sortable: true, minWidth: '50' },
    { prop: 'imei', label: '设备ID' },
    { prop: 'osType', label: '设备类型', slotName: 'isType' },
    { prop: 'mobileBrand', label: '设备品牌' },
    { prop: 'mobileVersion', label: '设备版本' },
    { prop: 'version', label: 'APP版本' },
    { prop: 'uid', label: '用户ID' },
    { prop: 'ip', label: '客户端IP' },
    { prop: 'createTime', label: '最近登录', slotName: 'createAt' },
    { prop: 'loginTime', label: '首次登录', slotName: 'loginAt' },
    { prop: 'state', label: '状态', slotName: 'isState' }
    // { label: '操作', slotName: 'handler', minWidth: '50' }
  ],
  showIndexColumn: false,
  showSelectColumn: true,
  permission: {
    add: false,
    update: false,
    delete: false
  }
}
