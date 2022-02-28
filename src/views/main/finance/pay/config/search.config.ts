/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:58
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-28 11:49:22
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/pay/config/search.config.ts
 */
import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  labelWidth: '120px',
  colLayout: {
    span: 8
  },
  formItems: [
    {
      field: 'onId',
      type: 'input',
      label: '订单号',
      placeholder: '请输入订单'
    },
    {
      field: 'nickId',
      type: 'input',
      label: 'Pofi ID',
      placeholder: '请输入Pofi ID'
    },
    {
      field: 'code',
      type: 'input',
      label: '商品ID',
      placeholder: '请输入商品ID'
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
    },
    {
      field: 'nickName',
      type: 'input',
      label: '用户昵称',
      placeholder: '请输入用户昵称'
    },
    {
      field: 'attachment',
      type: 'input',
      label: '附件',
      placeholder: '请输入附件名'
    },
    {
      field: 'state',
      type: 'select',
      label: '订单状态',
      placeholder: '请选择订单状态',
      options: [
        {
          title: '等待支付',
          value: 0
        },
        {
          title: '完成支付',
          value: 1
        },
        {
          title: '取消支付',
          value: 2
        }
      ]
    },
    {
      field: 'way',
      type: 'select',
      label: '充值方式',
      placeholder: '请选择充值方式',
      options: [
        {
          value: 0,
          title: '微信'
        },
        {
          value: 1,
          title: '支付宝'
        },
        {
          value: 2,
          title: 'QQ支付'
        },
        {
          value: 3,
          title: 'apple支付'
        },
        {
          value: 4,
          title: 'apple订阅'
        },
        {
          value: 5,
          title: 'google支付'
        },
        {
          value: 6,
          title: 'google订阅'
        }
      ]
    }
  ]
}
