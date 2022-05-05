/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-05 10:19:46
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/tradeRecord/config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'
export const contentTableConfig: TableConfig = {
  title: '用户资源仓库',
  propList: [
    { prop: 'nickId', label: 'POFI ID', sortable: true },
    { prop: 'nickName', label: '资源名字' },
    { prop: 'costType', label: '资源编号' },
    { prop: 'cost', label: '标注ID' },
    { prop: 'pname', label: '模型状态', slotName: 'isState' },
    { prop: 'version', label: '是否拥有', slotName: 'isHave' },
    { prop: 'remark', label: '获取方式', slotName: 'isGetter' },
    { prop: 'time', label: '拥有时间' },
    { label: '操作', slotName: 'handler' }
  ],
  showIndexColumn: false,
  showSelectColumn: true,
  permission: {
    add: false,
    update: true,
    delete: false
  }
}
