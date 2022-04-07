/*
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-07 11:22:51
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/head/config/modal.config.ts
 */
import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '栏目广告操作',
  formItems: [
    {
      field: 'id',
      type: 'input',
      label: '编号',
      placeholder: '系统生成',
      otherOptions: {
        disabled: true
      }
    },
    {
      field: 'pname',
      type: 'input',
      label: '内容',
      placeholder: '请输入内容',
      rules: [
        {
          required: true,
          message: '请输入内容',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'library',
      type: 'select',
      label: '所属库',
      placeholder: '请选择所属库',
      options: [],
      rules: [
        {
          required: true,
          message: '请选择所属库',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'status',
      type: 'select',
      label: '状态',
      placeholder: '请选择状态',
      rules: [
        {
          required: true,
          message: '请选择状态',
          trigger: 'blur'
        }
      ],
      options: [
        {
          title: '显示',
          value: 1
        },
        {
          title: '不显示',
          value: 0
        }
      ]
    },
    {
      field: 'startTime',
      type: 'datetime',
      label: '开始时间',
      otherOptions: {
        startPlaceholder: '开始时间',
        valueFormat: 'YYYY-MM-DD HH:ss:mm'
      }
    },
    {
      field: 'endTime',
      type: 'datetime',
      label: '结束时间',
      otherOptions: {
        startPlaceholder: '结束时间',
        valueFormat: 'YYYY-MM-DD HH:ss:mm'
      }
    }
  ],
  colLayout: {
    xl: 12, // >1920px 4个
    lg: 12,
    md: 12,
    sm: 24,
    xs: 24
  },
  itemStyle: {}
}
