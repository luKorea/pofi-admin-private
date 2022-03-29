/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-14 14:12:28
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/resource/data/config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'
export const contentTableConfig: TableConfig = {
  title: '资源数据统计',
  propList: [
    { prop: 'id', label: 'ID', width: '50' },
    { prop: 'moId', label: '资源编号' },
    { prop: 'nickId', label: '标注ID' },
    { prop: 'moType', label: '资源类型', slotName: 'isMoType' },
    { prop: 'pname', label: '模型名称' },
    { prop: 'open', label: '使用条件', slotName: 'isOpen' },
    { prop: 'state', label: '模型状态', slotName: 'isState' },
    { prop: 'download', label: '下载量', slotName: 'isDownload' },
    { prop: 'comment', label: '评论' },
    { prop: 'collect', label: '收藏' },
    { prop: 'share', label: '分享' },
    { prop: 'have', label: '拥有' },
    { prop: 'buy', label: '购买' },
    { prop: 'pv', label: '浏览量(PV)' },
    { prop: 'uv', label: '访客数(UV)' },
    { label: '操作', slotName: 'handler' }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  permission: {
    add: false,
    update: false,
    operation: true,
    delete: false
  }
}
