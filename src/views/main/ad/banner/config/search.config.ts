/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:58
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-15 14:50:08
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
      field: 'pname',
      type: 'input',
      label: '内容',
      placeholder: '请输入内容'
    },
    {
      field: 'library',
      type: 'select',
      label: '所属库',
      placeholder: '请选择所属库',
      options: []
    },
    {
      field: 'status',
      type: 'select',
      label: '状态',
      placeholder: '请选择状态',
      options: [
        { title: '显示', value: 1 },
        { title: '不显示', value: 0 }
      ]
    }
  ]
}
