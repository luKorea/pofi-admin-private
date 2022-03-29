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
  title: '资源数据统计操作',
  formItems: [
    {
      field: 'moId',
      type: 'input',
      label: '资源编号',
      otherOptions: {
        disabled: true
      }
    },
    {
      field: 'pname',
      type: 'input',
      label: '模型名称',
      otherOptions: {
        disabled: true
      }
    },
    {
      field: 'frontShow',
      type: 'input',
      label: '前端显示',
      otherOptions: {
        disabled: true
      }
    },
    {
      field: 'downloadState',
      type: 'select',
      label: '状态',
      placeholder: '请选择状态',
      options: [
        {
          title: '隐藏',
          value: 0
        },
        {
          title: '显示',
          value: 1
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
