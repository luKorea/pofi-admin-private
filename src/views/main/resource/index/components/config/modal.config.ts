/*
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-18 13:39:58
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/language/config/modal.config.ts
 */
import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '系列管理操作',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '分类页',
      placeholder: '请输入分类页',
      rules: [
        {
          required: true,
          message: '请输入分类页',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'desc',
      type: 'textarea',
      label: '备注',
      placeholder: '请输入备注'
    },
    {
      field: 'status',
      type: 'select',
      label: '状态',
      placeholder: '请选择状态',
      options: [
        {
          title: '显示',
          value: 1
        },
        {
          title: '不显示',
          value: 0
        }
      ],
      rules: [
        {
          required: true,
          message: '请选择状态',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'index',
      type: 'input',
      label: '序号',
      placeholder: '系统生成',
      isHidden: true
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
