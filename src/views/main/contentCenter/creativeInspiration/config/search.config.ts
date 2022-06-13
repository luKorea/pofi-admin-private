/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:58
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-06-13 17:03:51
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
      field: 'id',
      type: 'input',
      label: '灵感编号',
      placeholder: '请输入灵感编号'
    },
    {
      field: 'title',
      type: 'input',
      label: '文章标题',
      placeholder: '请输入文章标题'
    },
    {
      field: 'pofiid',
      type: 'input',
      label: '作者Pofi ID',
      placeholder: '请输入作者Pofi ID'
    },
    {
      field: 'feelType',
      type: 'select',
      label: '灵感分类',
      placeholder: '请选择灵感分类',
      options: []
    },
    {
      field: 'prep',
      type: 'select',
      label: '主绑定资源',
      placeholder: '请选择主绑定资源',
      options: []
    },
    {
      field: 'subPrep',
      type: 'select',
      label: '次绑定资源',
      placeholder: '请选择次绑定资源',
      options: []
    },
    {
      field: 'show',
      type: 'select',
      label: '灵感状态',
      placeholder: '请选择灵感状态',
      options: [
        {
          value: 1,
          title: '显示'
        },
        {
          value: 0,
          title: '隐藏'
        }
      ]
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
