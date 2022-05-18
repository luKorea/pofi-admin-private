/*
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-18 13:59:16
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/language/config/modal.config.ts
 */
import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '版本管理操作',
  formItems: [
    // {
    //   field: 'osTypeName',
    //   type: 'input',
    //   label: '平台',
    //   placeholder: '请选择平台',
    //   otherOptions: {
    //     disabled: true
    //   }
    // },
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
      type: 'inputNumber',
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
    },
    {
      field: 'status',
      type: 'select',
      label: '版本状态',
      placeholder: '请选择版本状态',
      options: [
        { title: '失效', value: 0 },
        { title: '生效', value: 1 }
      ],
      rules: [
        {
          required: true,
          message: '请选择版本状态',
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
