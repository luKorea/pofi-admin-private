/*
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-23 11:40:32
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/language/config/modal.config.ts
 */
import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '问题类型管理操作',
  formItems: [
    // {
    //   field: 'id',
    //   type: 'input',
    //   label: '编号',
    //   placeholder: '系统生成',
    //   otherOptions: {
    //     disabled: true
    //   }
    // },
    {
      field: 'title',
      type: 'input',
      label: '问题类型',
      placeholder: '请输入问题类型',
      rules: [
        {
          required: true,
          message: '请输入问题类型',
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
          title: '生效',
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
