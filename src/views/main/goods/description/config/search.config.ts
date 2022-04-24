/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-24 14:07:14
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
      field: 'snId',
      type: 'input',
      label: '文案编号',
      placeholder: '请输入文案编号'
    },
    {
      field: 'name',
      type: 'input',
      label: '文案名称',
      placeholder: '请输入文案名称'
    },
    {
      field: 'type',
      type: 'select',
      label: '文案类型',
      placeholder: '请选择文案类型',
      options: []
    },
    {
      field: 'funcType',
      type: 'select',
      label: '所属套餐',
      placeholder: '请选择所属套餐',
      options: []
    }
  ]
}
