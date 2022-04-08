/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-08 11:06:14
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/device/condition/config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'
export const contentTableEditConfig: TableConfig = {
  title: '公告设置',
  propList: [
    {
      prop: 'name',
      label: '国家/地区',
      editInfo: {
        type: 'input',
        placeholder: '国家地区',
        disabled: true
      }
    },
    {
      prop: 'status',
      label: '状态',
      editInfo: {
        type: 'select',
        placeholder: '状态',
        options: [],
        disabled: true
      }
    },
    {
      prop: 'onlineTime',
      label: '发布时间',
      editInfo: {
        type: 'datetime',
        otherOptions: {
          valueFormat: 'YYYY-MM-DD HH:mm:ss'
        }
      }
    },
    {
      prop: 'endTime',
      label: '停运时间',
      editInfo: {
        type: 'datetime',
        otherOptions: {
          valueFormat: 'YYYY-MM-DD HH:mm:ss'
        }
      }
    },
    {
      prop: 'isNotice',
      label: '更新公告',
      editInfo: {
        type: 'other'
      }
    },
    {
      label: '操作',
      editInfo: {
        type: 'handler'
      }
    }
  ],
  showIndexColumn: false,
  showSelectColumn: true,
  showFooter: false,
  childrenProps: {
    rowKey: 'id'
  },
  permission: {
    add: false,
    update: false,
    delete: false,
    columnAdd: true,
    columnDelete: true,
    drawTable: false
  }
}
