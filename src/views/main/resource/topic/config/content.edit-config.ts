/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-19 11:43:16
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/device/condition/config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'
export const contentTableEditConfig: TableConfig = {
  title: '内容设置',
  propList: [
    {
      prop: 'id',
      label: '序号',
      editInfo: {
        type: 'input',
        placeholder: '系统生成',
        disabled: true
      }
    },
    {
      prop: 'rank',
      label: '排序序号',
      editInfo: {
        type: 'input',
        placeholder: '系统生成',
        disabled: true
      }
    },
    {
      prop: 'tempMid',
      label: '资源名称',
      editInfo: {
        type: 'other',
        placeholder: '请输入资源名称',
        slotName: 'isMid',
        disabled: false
      }
    },
    {
      prop: 'subTitle',
      label: '副标题',
      editInfo: {
        type: 'input',
        placeholder: '请输入副标题'
      }
    },
    {
      prop: 'url',
      label: '图片',
      width: '100px',
      editInfo: {
        type: 'upload',
        fileTypeName: 'resourceTopic/'
      }
    },
    // {
    //   prop: 'createTime',
    //   label: '编辑时间',
    //   isEdit: false,
    //   editInfo: {
    //     type: 'datetime',
    //     placeholder: '请输入编辑时间',
    //     otherOptions: {
    //       valueFormat: 'YYYY-MM-DD HH:mm:ss'
    //     }
    //   }
    // },
    {
      label: '操作',
      editInfo: {
        type: 'handler'
      }
    }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
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
    drawTable: true
  }
}
