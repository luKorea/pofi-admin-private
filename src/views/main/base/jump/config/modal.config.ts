/*
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-31 16:00:52
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/head/config/modal.config.ts
 */
import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '跳转设置操作',
  formItems: [
    {
      field: 'id',
      type: 'input',
      label: '编号',
      placeholder: '系统生成',
      otherOptions: {
        disabled: true
      }
    },
    {
      field: 'name',
      type: 'input',
      label: '跳转方案名称',
      placeholder: '请输入跳转方案名称',
      rules: [
        {
          required: true,
          message: '请输入跳转方案名称',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'platform',
      type: 'select',
      label: '平台',
      placeholder: '请选择平台',
      options: [],
      rules: [
        {
          required: true,
          message: '请选择平台',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'direction',
      type: 'select',
      label: '跳转方向',
      placeholder: '请选择跳转方向',
      options: [],
      rules: [
        {
          required: true,
          message: '请选择跳转方向',
          trigger: 'blur'
        }
      ]
    }
    // {
    //   field: 'state',
    //   type: 'select',
    //   label: '状态',
    //   placeholder: '请选择状态',
    //   rules: [
    //     {
    //       required: true,
    //       message: '请选择状态',
    //       trigger: 'blur'
    //     }
    //   ],
    //   options: [
    //     {
    //       title: '启用',
    //       value: 1
    //     },
    //     {
    //       title: '禁用',
    //       value: 0
    //     }
    //   ]
    // }
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
