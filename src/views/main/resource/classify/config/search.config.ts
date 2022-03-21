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
      field: 'name',
      type: 'input',
      label: '关键词',
      placeholder: '请输入关键词'
    },
    {
      field: 'type',
      type: 'select',
      label: '关键词类型',
      placeholder: '请选择关键词类型',
      options: []
    }
  ]
}
