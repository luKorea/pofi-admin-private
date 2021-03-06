/*
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-16 11:40:35
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/pay/config/modal.config.ts
 */
import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: 'VIP操作',
  formItems: [
    {
      field: 'day',
      type: 'inputNumber',
      label: '增加天数',
      placeholder: '请输入整数日,负数表示扣除',
      rules: [
        {
          required: true,
          message: '请输入整数日,负数表示扣除',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'type',
      type: 'select',
      label: 'VIP类型',
      placeholder: '请选择VIP类型',
      rules: [
        {
          required: true,
          message: '请选择VIP类型',
          trigger: 'blur'
        }
      ],
      options: [
        {
          title: 'Pro',
          value: 'Pro'
        },
        {
          title: 'Plus',
          value: 'Plus'
        }
      ],
      otherOptions: {
        disabled: false
      }
    },
    {
      field: 'description',
      type: 'input',
      label: '描述',
      placeholder: '描述内容仅在内部记录可见，可以选择不填写...',
      rules: [
        {
          required: true,
          message: '请输入描述',
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
