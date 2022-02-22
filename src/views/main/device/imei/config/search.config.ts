/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:58
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-22 12:11:58
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/device/imei/config/search.config.ts
 */
import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  labelWidth: '120px',
  colLayout: {
    span: 8
  },
  formItems: [
    {
      field: 'imei',
      type: 'input',
      label: '设备',
      placeholder: '请输入设备名称'
    },
    {
      field: 'nickId',
      type: 'input',
      label: '用户ID',
      placeholder: '请输入用户ID'
    },
    {
      field: 'search',
      type: 'select',
      label: '设备状态',
      placeholder: '请选择设备状态',
      options: [
        {
          title: '冻结',
          value: 1
        },
        {
          title: '正常',
          value: 0
        }
      ]
    }
  ]
}
