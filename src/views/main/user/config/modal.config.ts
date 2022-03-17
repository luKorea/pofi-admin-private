/*
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-17 15:37:15
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/pay/config/modal.config.ts
 */
import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '用户管理操作',
  formItems: [
    {
      field: 'nickName',
      type: 'input',
      label: '用户昵称',
      placeholder: '请输入用户昵称'
    },
    {
      field: 'region',
      type: 'input',
      label: '国家/地区',
      placeholder: '请输入国家/地区'
    },
    {
      field: 'province',
      type: 'input',
      label: '省份',
      placeholder: '请输入省份'
    },
    {
      field: 'city',
      type: 'input',
      label: '城市',
      placeholder: '请输入城市'
    },
    {
      field: 'phone',
      type: 'input',
      label: '手机号码（登录账号）',
      placeholder: '请输入手机号码'
    },
    {
      field: 'email',
      type: 'input',
      label: '邮箱地址（登录账号）',
      placeholder: '请输入邮箱地址'
    },
    {
      field: 'mark',
      type: 'select',
      label: '特殊标记',
      options: []
    },
    {
      field: 'status',
      type: 'select',
      label: '账号状态',
      rules: [
        {
          required: true,
          message: '请选择账号状态',
          trigger: 'blur'
        }
      ],
      options: [
        {
          title: '注销',
          value: 1
        },
        {
          title: '正常',
          value: 2
        }
      ]
    },
    {
      field: 'gender',
      type: 'select',
      label: '性别',
      placeholder: '请选择性别',
      options: [
        {
          title: '默认',
          value: 0
        },
        {
          title: '男性',
          value: 1
        },
        {
          title: '女性',
          value: 2
        },
        {
          title: '其他',
          value: 3
        }
      ]
    },
    {
      field: 'birthday',
      type: 'date',
      label: '生日',
      otherOptions: {
        format: 'YYYY-MM-DD',
        valueFormat: 'YYYY-MM-DD'
      }
    },
    {
      field: 'jobId',
      type: 'select',
      label: '职业',
      options: []
    },
    {
      field: 'interest',
      type: 'select',
      label: '画风爱好',
      options: []
    },
    {
      label: '备注',
      type: 'textarea',
      field: 'remark',
      placeholder: '请输入备注',
      rules: [
        {
          required: true,
          message: '请输入备注',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'srcDec',
      type: 'input',
      label: '注册类型',
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
      field: 'regTime',
      type: 'input',
      label: '注册时间',
      otherOptions: {
        disabled: true
      }
    },
    {
      field: 'onlineTime',
      type: 'input',
      label: '最近登录时间',
      otherOptions: {
        disabled: true
      }
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
