/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-23 14:36:39
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
      label: '名称',
      placeholder: '请输入名称'
    },
    {
      field: 'type',
      type: 'select',
      label: '所属分类',
      placeholder: '所属分类',
      options: []
    }
  ]
}
