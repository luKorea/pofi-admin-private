/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-23 10:25:28
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/oa/user/config/search.config.ts
 */
import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  labelWidth: '120px',
  colLayout: {
    span: 8
  },
  formItems: [
    {
      field: 'id',
      type: 'input',
      label: '编号',
      placeholder: '请输入编号'
    },
    {
      field: 'name',
      type: 'input',
      label: '专题名称',
      placeholder: '请输入专题名称'
    },
    {
      field: 'typeId',
      type: 'select',
      label: '状态',
      placeholder: '请选择状态',
      options: [
        {
          title: '有效',
          value: 1
        },
        {
          title: '无效',
          value: 0
        }
      ]
    }
  ]
}
