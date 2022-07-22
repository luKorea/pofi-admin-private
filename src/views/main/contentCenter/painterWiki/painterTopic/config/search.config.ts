/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:58
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-22 14:14:22
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
      label: '专题名称',
      placeholder: '请输入专题名称'
    },
    {
      field: 'type',
      type: 'select',
      label: '专题类型',
      placeholder: '请选择专题类型',
      options: []
    },
    {
      field: 'paid',
      type: 'select',
      label: '画师',
      placeholder: '请选择画师',
      options: []
    },
    {
      field: 'status',
      type: 'select',
      label: '展示状态',
      placeholder: '请选择展示状态',
      options: [
        {
          title: '显示',
          value: 1
        },
        {
          title: '隐藏',
          value: 0
        }
      ]
    },
    {
      field: 'dateTime',
      type: 'daterange',
      label: '文章日期',
      otherOptions: {
        startPlaceholder: '请输入开始时间',
        endPlaceholder: '请输入结束时间',
        valueFormat: 'YYYY-MM-DD'
      }
    }
  ]
}
