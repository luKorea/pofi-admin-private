/*
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-14 14:40:58
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/language/config/modal.config.ts
 */
import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '多语言管理操作',
  formItems: [
    {
      field: 'code',
      type: 'input',
      label: '内部编码',
      placeholder: '请输入内部编码',
      rules: [
        {
          required: true,
          message: '请输入内部编码',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'name',
      type: 'input',
      label: '语言名称',
      placeholder: '请输入语言名称',
      rules: [
        {
          required: true,
          message: '请输入语言名称',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'area',
      type: 'input',
      label: '默认地区/国家',
      placeholder: '请输入默认地区/国家',
      rules: [
        {
          required: true,
          message: '请输入默认地区/国家',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'state',
      type: 'select',
      label: '状态',
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
