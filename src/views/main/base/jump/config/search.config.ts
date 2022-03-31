/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-31 15:55:32
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/resource/data/config/search.config.ts
 */
import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  labelWidth: '120px',
  colLayout: {
    xl: 8, // >1920px 4个
    lg: 8,
    md: 12,
    sm: 24,
    xs: 24
  },
  formItems: [
    {
      field: 'id',
      type: 'input',
      label: '内部编号',
      placeholder: '请输入内部编号'
    },
    {
      field: 'name',
      type: 'input',
      label: '跳转名称',
      placeholder: '请输入跳转名称'
    },
    {
      field: 'direction',
      type: 'select',
      label: '跳转方向',
      placeholder: '请选择跳转方向',
      options: []
    },
    {
      field: 'platform',
      type: 'select',
      label: '使用平台',
      placeholder: '请选择使用平台',
      options: []
    },
    {
      field: 'type',
      type: 'select',
      label: '链接类型',
      placeholder: '请选择链接类型',
      options: []
    },
    {
      field: 'dateTime',
      type: 'daterange',
      label: '创建时间',
      otherOptions: {
        startPlaceholder: '请输入开始时间',
        endPlaceholder: '请输入结束时间',
        valueFormat: 'YYYY-MM-DD HH:mm:ss'
      }
    }
  ]
}
