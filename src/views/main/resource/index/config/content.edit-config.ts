/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-20 11:29:44
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
      width: '80',
      placeholder: '系统生成'
      // editInfo: {
      //   type: 'input',
      //   disabled: true
      // }
    },
    {
      prop: 'rank',
      label: '排序序号',
      width: '100',
      placeholder: '系统生成'
      // editInfo: {
      //   type: 'input',
      //   disabled: true
      // }
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
        slotName: 'isSelect',
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
        fileTypeName: 'resourceIndex/',
        limit: 1
      }
    },
    {
      prop: 'giftList',
      label: '彩蛋图',
      width: '100px',
      isHidden: true,
      editInfo: {
        type: 'upload',
        fileTypeName: 'resourceIndex/',
        limit: 1
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
        type: 'other',
        slotName: 'isStatus'
      }
    },
    {
      prop: 'shape',
      label: '是否大横矩形',
      width: '100px',
      isHidden: true,
      editInfo: {
        type: 'other',
        slotName: 'isShare'
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
      width: '100',
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
    drawTable: false
  }
}
