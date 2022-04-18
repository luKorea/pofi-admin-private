/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-18 18:14:59
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
      prop: 'title',
      label: '按钮名称',
      editInfo: {
        type: 'input',
        placeholder: '请输入按钮名称',
        disabled: false
      }
    },
    {
      prop: 'tid',
      label: '资源名称',
      isHidden: true,
      editInfo: {
        type: 'other',
        placeholder: '请输入资源名称',
        disabled: false
      }
    },
    {
      prop: 'title',
      label: '标题',
      isHidden: true,
      editInfo: {
        type: 'input',
        placeholder: '请输入标题'
      }
    },
    {
      prop: 'subTitle',
      label: '副标题',
      isHidden: true,
      editInfo: {
        type: 'input',
        placeholder: '请输入副标题'
      }
    },
    {
      prop: 'coverList',
      label: '图片',
      width: '100px',
      editInfo: {
        type: 'upload',
        fileTypeName: 'resourceIndex/'
      }
    },
    {
      prop: 'giftList',
      label: '彩蛋图',
      width: '100px',
      isHidden: true,
      editInfo: {
        type: 'upload',
        fileTypeName: 'resourceIndex/'
      }
    },
    {
      prop: 'jump',
      label: '跳转地址',
      editInfo: {
        type: 'textarea',
        placeholder: '请输入跳转地址',
        otherOptions: {
          rows: 3
        }
      }
    },
    {
      prop: 'status',
      label: '状态',
      width: '100px',
      editInfo: {
        type: 'other'
      }
    },
    {
      prop: 'shape',
      label: '是否大横矩形',
      width: '100px',
      isHidden: true,
      editInfo: {
        type: 'other'
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
