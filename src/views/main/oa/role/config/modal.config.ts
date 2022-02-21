/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:58
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-21 11:06:56
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/oa/role/config/modal.config.ts
 */
import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '角色管理操作',
  formItems: [
    {
      field: 'type',
      type: 'input',
      label: '角色标识',
      placeholder: '请输入角色标识',
      rules: [
        {
          required: true,
          message: '请输入角色标识',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'name',
      type: 'input',
      label: '角色名称',
      placeholder: '请输入角色名称',
      rules: [
        {
          required: true,
          message: '请输入角色名称',
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
