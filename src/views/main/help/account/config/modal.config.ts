/*
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-01 10:17:20
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/head/config/modal.config.ts
 */
import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '联系账号操作',
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
      field: 'platform',
      type: 'input',
      label: '平台',
      placeholder: '请输入平台',
      rules: [
        {
          required: true,
          message: '请输入平台',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'account',
      type: 'input',
      label: '账号',
      placeholder: '请输入账号',
      rules: [
        {
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'state',
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
          title: '启用',
          value: 1
        },
        {
          title: '禁用',
          value: 0
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
