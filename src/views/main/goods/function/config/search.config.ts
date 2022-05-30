/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:58
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-30 10:16:18
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
      label: '套餐编号',
      placeholder: '请输入套餐编号'
    },
    {
      field: 'name',
      type: 'input',
      label: '套餐名称',
      placeholder: '请输入套餐名称'
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
      label: '套餐状态',
      placeholder: '请选择套餐状态',
      options: [
        {
          title: '已上架',
          value: 1
        },
        {
          title: '已下架',
          value: 0
        }
      ]
    },
    {
      field: 'developed',
      type: 'select',
      label: '定价等级',
      placeholder: '请选择定价等级',
      options: [
        {
          title: '低价区',
          value: 1
        },
        {
          title: '中价区',
          value: 2
        },
        {
          title: '高价区',
          value: 3
        }
      ]
    }
  ]
}
