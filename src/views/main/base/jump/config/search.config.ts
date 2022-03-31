/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:58
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-10 10:26:15
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
      options: [
        { value: -999, info: 'all', title: '全部' },
        { value: 1, info: 'out', title: 'APP外部' },
        { value: 2, info: 'in', title: '内部' }
      ]
    },
    {
      field: 'platform',
      type: 'select',
      label: '使用平台',
      placeholder: '请选择使用平台',
      options: [
        { value: 1, info: 'out', title: 'APP' },
        { value: 2, info: 'in', title: 'APP内-H5网页' },
        { value: 3, info: 'in', title: 'H5网页' },
        { value: 4, info: 'in', title: '小程序' },
        { value: 5, info: 'in', title: '其他' }
      ]
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
      type: 'datetimerange',
      label: '创建时间',
      otherOptions: {
        startPlaceholder: '请输入开始时间',
        endPlaceholder: '请输入结束时间',
        valueFormat: 'YYYY-MM-DD HH:mm:ss'
      }
    }
  ]
}
