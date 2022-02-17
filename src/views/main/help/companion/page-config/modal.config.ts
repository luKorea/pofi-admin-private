/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:58
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-17 14:59:16
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/config/page-config/modal.config.ts
 */
import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '配置管理操作',
  formItems: [
    {
      field: 'title',
      type: 'input',
      label: '使用栏目/名称',
      placeholder: '请输入使用栏目或者名称',
      rules: [
        {
          required: true,
          message: '请输入使用栏目或者名称',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'areaIds',
      type: 'select',
      label: '国家/地区',
      placeholder: '请选择国家或者地区',
      options: [],
      otherOptions: {
        multiple: true
      }
    },
    {
      field: 'show',
      type: 'select',
      label: '是否显示',
      placeholder: '是否显示',
      options: [
        {
          title: '是',
          value: 1
        },
        {
          title: '否',
          value: 0
        }
      ]
    },
    {
      field: 'state',
      type: 'select',
      label: '状态',
      placeholder: '状态',
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
