/*
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-22 09:55:57
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/language/config/modal.config.ts
 */
import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '关键词管理操作',
  formItems: [
    {
      field: 'id',
      type: 'input',
      label: '编号',
      placeholder: '系统自动生成',
      otherOptions: {
        disabled: true
      }
    },
    {
      field: 'name',
      type: 'input',
      label: '关键词',
      placeholder: '请输入关键词',
      rules: [
        {
          required: true,
          message: '请输入关键词',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'type',
      type: 'select',
      label: '关键词类型',
      placeholder: '请选择关键词类型',
      options: [],
      rules: [
        {
          required: true,
          message: '请选择关键词类型',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'status',
      type: 'select',
      label: '状态',
      placeholder: '请选择状态',
      options: [
        {
          title: '显示',
          value: 0
        },
        {
          title: '隐藏',
          value: 1
        }
        // {
        //   title: '未知',
        //   value: 2
        // }
      ],
      rules: [
        {
          required: true,
          message: '请选择状态',
          trigger: 'blur'
        }
      ]
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
