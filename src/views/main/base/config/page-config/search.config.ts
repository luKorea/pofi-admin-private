/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:58
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-17 13:38:22
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/config/page-config/search.config.ts
 */
import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  labelWidth: '120px',
  colLayout: {
    span: 8
  },
  formItems: [
    {
      field: 'group',
      type: 'select',
      label: '分组查询',
      placeholder: '分组查询',
      options: []
    },
    {
      field: 'rid',
      type: 'input',
      label: '国家',
      placeholder: '国家',
      isHidden: true
    }
  ]
}
