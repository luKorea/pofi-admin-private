/*
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-22 16:57:42
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/pay/config/modal.config.ts
 */
import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '用户钱包操作',
  formItems: [
    {
      field: 'nickName',
      type: 'input',
      label: '用户昵称',
      otherOptions: {
        disabled: true
      }
    },
    {
      field: 'nickId',
      type: 'input',
      label: 'POFI ID',
      otherOptions: {
        disabled: true
      }
    },
    {
      field: 'accountStatus',
      type: 'select',
      label: '用户状态',
      placeholder: '请选择用户状态',
      options: [
        {
          value: 1,
          title: '注销'
        },
        {
          value: 2,
          title: '正常'
        }
      ],
      otherOptions: {
        disabled: true
      }
    },
    {
      field: 'markId',
      type: 'select',
      label: '特殊标记',
      placeholder: '请选择特殊标记',
      options: [],
      otherOptions: {
        disabled: true
      }
    },
    {
      field: 'region',
      type: 'input',
      label: '国家地区',
      otherOptions: {
        disabled: true
      }
    },
    {
      field: 'title',
      type: 'input',
      label: '目前头衔',
      otherOptions: {
        disabled: true
      }
    },
    {
      field: 'pb',
      type: 'input',
      placeholder: '请输入P币余额',
      label: 'P币余额',
      otherOptions: {
        disabled: false,
        type: 'number'
      }
    },
    {
      field: 'score',
      type: 'input',
      placeholder: '请输入积分',
      label: '积分',
      otherOptions: {
        type: 'number'
      }
    },
    {
      field: 'lv',
      type: 'input',
      placeholder: '请输入等级',
      label: '等级',
      otherOptions: {
        type: 'number'
      }
    },
    {
      field: 'remark',
      type: 'textarea',
      label: '备注',
      placeholder: '本次操作原因',
      rules: [
        {
          required: true,
          message: '请输入本次操作原因',
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
