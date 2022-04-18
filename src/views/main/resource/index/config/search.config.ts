/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-18 16:07:54
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/oa/user/config/search.config.ts
 */
import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  labelWidth: '120px',
  colLayout: {
    span: 12
  },
  formItems: [
    {
      field: 'id',
      type: 'input',
      label: '编号',
      placeholder: '请输入编号'
    },
    {
      field: 'remark',
      type: 'input',
      label: '内容名称',
      placeholder: '请输入内容名称'
    },
    {
      field: 'type',
      type: 'select',
      label: '样式类型',
      placeholder: '请选择样式类型',
      options: []
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
      ]
    }
  ]
}
