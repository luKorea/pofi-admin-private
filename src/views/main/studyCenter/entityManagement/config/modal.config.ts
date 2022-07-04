/*
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-23 15:14:21
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/language/config/modal.config.ts
 */
import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '功能说明操作',
  formItems: [
    {
      field: 'name',
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
      field: 'typeId',
      type: 'select',
      label: '所属分类',
      placeholder: '请选择所属分类',
      options: [],
      rules: [
        {
          required: true,
          message: '请选择所属分类',
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
