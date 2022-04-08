/*
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-08 10:32:32
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/language/config/modal.config.ts
 */
import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '版本管理操作',
  formItems: [
    {
      field: 'osType',
      type: 'input',
      label: '平台',
      placeholder: '请选择平台',
      otherOptions: {
        disabled: true
      }
    },
    {
      field: 'versionName',
      type: 'input',
      label: '版本名称',
      placeholder: '请输入版本名称',
      rules: [
        {
          required: true,
          message: '请输入版本名称',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'version',
      type: 'input',
      label: '版本号',
      placeholder: '请输入版本号',
      rules: [
        {
          required: true,
          message: '请输入版本号',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'host',
      type: 'select',
      label: '连接服务器',
      placeholder: '请选择服务器',
      options: [],
      rules: [
        {
          required: true,
          message: '请选择服务器',
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
