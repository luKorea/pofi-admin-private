/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-17 16:00:49
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/pay/config/search.config.ts
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
      field: 'nickId',
      type: 'input',
      label: 'POFI ID',
      placeholder: '请输入POFI ID'
    },
    {
      field: 'nickName',
      type: 'input',
      label: '用户昵称',
      placeholder: '请输入用户昵称'
    },
    {
      field: 'account',
      type: 'input',
      label: '登录账号',
      placeholder: '请输入登录账号'
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
      field: 'status',
      type: 'select',
      label: '用户账号状态',
      placeholder: '请选择用户账号状态',
      options: [
        {
          title: '全部',
          value: -999
        },
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
      field: 'isReal',
      type: 'select',
      label: '是否实名',
      placeholder: '请选择用户实名状态',
      options: [
        {
          title: '全部',
          value: -999
        },
        {
          title: '是',
          value: 1
        },
        {
          title: '否',
          value: 2
        }
      ]
    },
    {
      field: 'srcType',
      type: 'select',
      label: '用户注册来源',
      placeholder: '请选择用户注册来源',
      options: [
        {
          title: '全部',
          value: -999
        }
      ]
    },
    {
      field: 'areaId',
      type: 'select',
      label: '国家地区',
      placeholder: '请选择国家地区',
      options: [
        {
          title: '全部',
          value: -999
        }
      ]
    },
    {
      field: 'markId',
      type: 'select',
      label: '特殊标记',
      placeholder: '请选择特殊标记',
      options: [
        {
          title: '全部',
          value: -999
        }
      ]
    }
  ]
}
