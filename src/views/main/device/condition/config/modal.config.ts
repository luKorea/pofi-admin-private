/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:58
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-11 11:58:02
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/device/condition/config/modal.config.ts
 */
import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '方案名称',
      placeholder: '请输入方案名称',
      rules: [
        {
          required: true,
          message: '请输入方案名称',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'limitNum',
      type: 'inputNumber',
      label: '设备限制',
      placeholder: '请输入设备限制',
      otherOptions: {
        min: 0
      },
      rules: [
        {
          required: true,
          message: '请输入设备限制',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'regionName',
      type: 'select',
      label: '地区',
      placeholder: '不选默认全部',
      options: []
    },
    {
      field: 'state',
      type: 'select',
      label: '状态',
      options: [
        {
          title: '启用',
          value: 1
        },
        {
          title: '禁用',
          value: 0
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
