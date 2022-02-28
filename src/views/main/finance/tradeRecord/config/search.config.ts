/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:58
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-28 10:18:19
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/tradeRecord/config/search.config.ts
 */
import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  labelWidth: '120px',
  colLayout: {
    span: 8
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
      type: 'input',
      label: '支付金额',
      placeholder: '请输入支付金额'
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
      field: 'nickId',
      type: 'datetimerange',
      label: '操作时间',
      otherOptions: {
        startPlaceholder: '请输入开始时间',
        endPlaceholder: '请输入结束时间'
      }
    }
  ]
}
