/*
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-30 10:29:36
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/area/config/modal.config.ts
 */
import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '地区管理操作',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '国家/地区',
      placeholder: '请严格按照表格标准填写',
      rules: [
        {
          required: true,
          message: '请输入国家/地区',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'code',
      type: 'input',
      label: '对应标头',
      placeholder: '请输入对应标头',
      rules: [
        {
          required: true,
          message: '请输入对应标头',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'areaCode',
      type: 'input',
      label: '电话区号',
      placeholder: '请输入电话区号',
      otherOptions: {
        type: 'number'
      },
      rules: [
        {
          required: true,
          message: '请输入电话区号',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'iso',
      type: 'input',
      label: 'ISO标头(APPLE用)',
      placeholder: '请输入ISO标头(APPLE用)',
      rules: [
        {
          required: true,
          message: '请输入ISO标头(APPLE用)',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'isoAndroid',
      type: 'input',
      label: 'ISO标头(Google用)',
      placeholder: '请输入ISOAndroid标头(Google用)',
      rules: [
        {
          required: true,
          message: '请输入ISOAndroid标头(Google用)',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'developed',
      type: 'select',
      label: '定价等级',
      rules: [
        {
          required: true,
          message: '请选择定价等级',
          trigger: 'blur'
        }
      ],
      options: [
        {
          title: '低价区',
          value: 1
        },
        {
          title: '中价区',
          value: 2
        },
        {
          title: '高价区',
          value: 3
        }
      ]
    },
    {
      field: 'state',
      type: 'select',
      label: '状态',
      placeholder: '请选择状态',
      rules: [
        {
          required: true,
          message: '请选择状态',
          trigger: 'blur'
        }
      ],
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
