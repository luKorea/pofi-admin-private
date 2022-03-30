/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:58
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-28 17:29:01
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/tradeRecord/config/search.config.ts
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
      field: 'content',
      type: 'input',
      label: '问题',
      placeholder: '请输入反馈内容'
    },
    {
      field: 'uid',
      type: 'input',
      label: 'Pofi ID',
      placeholder: '请输入Pofi ID'
    },
    {
      field: 'id',
      type: 'input',
      label: '问题编号',
      placeholder: '请输入问题编号'
    },
    {
      field: 'optId',
      type: 'select',
      label: '处理人',
      placeholder: '请选择处理人',
      options: []
    },
    {
      field: 'type',
      type: 'select',
      label: '类型',
      placeholder: '请选择类型',
      options: []
    },
    {
      field: 'status',
      type: 'select',
      label: '状态',
      placeholder: '请选择状态',
      options: []
    },
    {
      field: 'optTag',
      type: 'select',
      label: '标签',
      placeholder: '请选择标签',
      options: []
    },
    {
      field: 'region',
      type: 'select',
      label: '地区',
      placeholder: '请选择地区',
      options: []
    },
    {
      field: 'language',
      type: 'select',
      label: '语言',
      placeholder: '请选择语言',
      options: []
    },
    {
      field: 'dateTime',
      type: 'daterange',
      label: '操作时间',
      otherOptions: {
        startPlaceholder: '请输入开始时间',
        endPlaceholder: '请输入结束时间',
        valueFormat: 'YYYY-MM-DD'
      }
    }
  ]
}
