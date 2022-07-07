/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:58
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-04 14:11:56
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
      label: '是否显示',
      placeholder: '请选择是否显示',
      options: [
        {
          title: '是',
          value: 1
        },
        {
          title: '否',
          value: 0
        }
      ]
    },
    {
      field: 'showDate',
      type: 'datetime',
      label: '文章日期',
      otherOptions: {
        placeholder: '请输入文章日期',
        valueFormat: 'YYYY-MM-DD'
      }
    }
  ]
}