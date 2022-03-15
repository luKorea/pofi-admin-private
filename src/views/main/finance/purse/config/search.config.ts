/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-15 17:12:20
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
      field: 'lv',
      type: 'input',
      label: '等级',
      placeholder: '请输入等级'
    },
    {
      field: 'pb',
      type: 'input',
      label: 'P币余额',
      placeholder: '请输入区间，用英文逗号隔开'
    },
    {
      field: 'proState',
      type: 'select',
      label: 'Pro版',
      placeholder: '请选择Pro版状态',
      options: [
        {
          title: '全部',
          value: -999
        },
        {
          title: '已购买',
          value: 0
        },
        {
          title: '已过期',
          value: 1
        }
      ]
    },
    {
      field: 'plusState',
      type: 'select',
      label: 'Plus版',
      placeholder: '请选择Plus版状态',
      options: [
        {
          title: '全部',
          value: -999
        },
        {
          title: '已购买',
          value: 0
        },
        {
          title: '已过期',
          value: 1
        }
      ]
    }
  ]
}
