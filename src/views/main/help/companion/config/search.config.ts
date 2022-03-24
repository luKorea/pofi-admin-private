/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:58
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-17 15:33:10
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/help/companion/page-config/search.config.ts
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
      field: 'title',
      type: 'input',
      label: '标题',
      placeholder: '请输入标题'
    }
  ]
}
