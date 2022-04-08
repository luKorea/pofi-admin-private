/*
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-08 11:25:14
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/language/config/modal.config.ts
 */
import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '首页管理操作',
  formItems: [
    {
      field: 'mtId',
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
      label: '名称',
      placeholder: '请输入名称',
      rules: [
        {
          required: true,
          message: '请输入名称',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'color',
      type: 'select',
      label: '标题颜色',
      placeholder: '请选择标题颜色',
      rules: [
        {
          required: true,
          message: '请选择标题颜色',
          trigger: 'blur'
        }
      ],
      options: [
        {
          title: '深色',
          value: 1
        },
        {
          title: '浅色',
          value: 0
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
          title: '有效',
          value: 1
        },
        {
          title: '失效',
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
