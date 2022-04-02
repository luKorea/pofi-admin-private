/*
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-28 14:43:35
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/pay/config/modal.config.ts
 */
import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '订单管理',
  formItems: [
    {
      field: 'nickName',
      type: 'input',
      label: '用户昵称'
    },
    {
      field: 'onId',
      type: 'input',
      label: '订单号'
    },
    {
      field: 'code',
      type: 'input',
      label: '商品ID'
    },
    {
      field: 'wayCopy',
      type: 'input',
      label: '充值方式'
    },
    {
      field: 'costCopy',
      type: 'input',
      label: '金额'
    },
    {
      field: 'create',
      type: 'input',
      label: '创建时间'
    },
    {
      field: 'state',
      type: 'select',
      label: '订单状态',
      placeholder: '请选择订单状态',
      options: []
    },
    {
      label: '备注',
      type: 'input',
      field: 'remark',
      rules: [
        {
          required: true,
          message: '请输入备注',
          trigger: 'blur'
        }
      ]
    }
  ],
  colLayout: {
    xl: 12, // >1920px 4个
    lg: 12,
    md: 12,
    sm: 24,
    xs: 24
  },
  itemStyle: {}
}
