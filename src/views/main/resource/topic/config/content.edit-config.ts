/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-18 15:55:30
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/device/condition/config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'
export const contentTableEditConfig: TableConfig = {
  title: '内容设置（多语言）',
  propList: [
    {
      prop: 'rank',
      label: '序号',
      placeholder: '系统生成',
      editInfo: {
        type: 'input',
        placeholder: '系统生成',
        disabled: true
      }
    },
    {
      prop: 'id',
      placeholder: '系统生成',
      label: '编号',
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
