/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:58
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-21 12:09:57
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/oa/permission/config/modal.config.ts
 */
import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '权限管理操作',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '权限名称',
      placeholder: '请输入权限名称',
      rules: [
        {
          required: true,
          message: '请输入权限名称',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'url',
      type: 'input',
      label: '权限路径',
      placeholder: '请输入权限路径',
      rules: [
        {
          required: true,
          message: '请输入权限路径',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'id',
      type: 'input',
      label: '权限名称',
      isHidden: true
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
