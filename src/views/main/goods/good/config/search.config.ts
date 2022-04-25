/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-25 16:57:09
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
      label: '商品编号',
      placeholder: '请输入商品编号'
    },
    {
      field: 'name',
      type: 'input',
      label: '商品名称',
      placeholder: '请输入商品名称'
    },
    {
      field: 'label',
      type: 'input',
      label: '商品标注',
      placeholder: '请输入商品标注'
    },
    {
      field: 'show',
      type: 'select',
      label: '商品状态',
      placeholder: '请选择商品状态',
      options: [
        {
          title: '已上架',
          value: -999
        },
        {
          title: '已下架',
          value: -999
        }
      ]
    },
    {
      field: 'useType',
      type: 'select',
      label: '商品用途',
      placeholder: '请选择商品用途',
      options: [
        {
          title: '常规商品',
          value: 1
        },
        {
          title: '临时商品',
          value: 2
        }
      ]
    }
  ]
}
