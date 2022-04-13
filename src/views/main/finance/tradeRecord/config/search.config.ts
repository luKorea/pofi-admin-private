/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-13 09:00:25
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
      label: '内购ID',
      placeholder: '请输入内购ID'
    },
    {
      field: 'nickId',
      type: 'input',
      label: 'Pofi ID',
      placeholder: '请输入Pofi ID'
    },
    {
      field: 'nickName',
      type: 'input',
      label: '用户昵称',
      placeholder: '请输入用户昵称'
    },
    {
      field: 'cost',
      type: 'inputNumber',
      label: '支付金额',
      placeholder: '请输入支付金额',
      otherOptions: {
        min: 0
      }
    },
    {
      field: 'account',
      type: 'input',
      label: '登录账号',
      placeholder: '请输入登录账号'
    },
    {
      field: 'markId',
      type: 'select',
      label: '特殊标记',
      placeholder: '请选择特殊标记',
      options: []
    },
    {
      field: 'remark',
      type: 'input',
      label: '备注',
      placeholder: '请输入备注'
    },
    {
      field: 'costType',
      type: 'select',
      label: '支付方式',
      placeholder: '请选择支付方式',
      options: [
        {
          title: 'P币支付',
          value: 'COST_PB'
        }
      ]
    },
    {
      field: 'dateTime',
      type: 'datetimerange',
      label: '操作时间',
      otherOptions: {
        startPlaceholder: '请输入开始时间',
        endPlaceholder: '请输入结束时间',
        valueFormat: 'YYYY-MM-DD HH:mm:ss'
      }
    }
  ]
}
