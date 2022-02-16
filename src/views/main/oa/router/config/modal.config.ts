/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:58
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-16 15:29:17
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/oa/router/config/modal.config.ts
 */
import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '路由管理操作',
  formItems: [
    {
      field: 'id',
      type: 'select',
      label: '上级路由',
      placeholder: '请选择上级路由',
      options: []
    },
    {
      field: 'nickname',
      type: 'input',
      label: '昵称',
      placeholder: '请输入昵称',
      rules: [
        {
          required: true,
          message: '请输入昵称',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'email',
      type: 'input',
      label: '邮箱',
      placeholder: '请输入邮箱',
      rules: [
        {
          required: true,
          message: '请输入邮箱',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'phone',
      type: 'input',
      label: '电话号码',
      placeholder: '请输入电话号码',
      rules: [
        {
          required: true,
          message: '请输入电话号码',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'pwd',
      type: 'password',
      label: '密码',
      placeholder: '请输入密码',
      isHidden: false,
      rules: [
        {
          required: true,
          message: '请输入密码',
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
