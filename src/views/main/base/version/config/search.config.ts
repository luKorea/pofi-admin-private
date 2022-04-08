/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-08 10:11:35
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
      field: 'osType',
      type: 'select',
      label: '平台',
      placeholder: '请选择平台',
      options: []
    },
    {
      field: 'status',
      type: 'select',
      label: '版本状态',
      placeholder: '请选择版本状态',
      options: []
    }
  ]
}
