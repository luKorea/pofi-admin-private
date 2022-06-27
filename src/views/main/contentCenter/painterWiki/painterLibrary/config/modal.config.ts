/*
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-06-27 14:13:48
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/language/config/modal.config.ts
 */
import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '画师库操作',
  formItems: [
    {
      field: 'kid',
      type: 'input',
      label: '编号',
      placeholder: '系统自动生成, 以PR开头',
      otherOptions: {
        disabled: true
      }
    },
    {
      field: 'name',
      type: 'input',
      label: '画师名',
      placeholder: '请输入画师名',
      rules: [
        {
          required: true,
          message: '请输入画师名',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'job',
      type: 'select',
      label: '画师职业',
      placeholder: '请选择画师职业',
      options: [],
      rules: [
        {
          required: true,
          message: '请选择画师职业',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'region',
      type: 'select',
      label: '画师国家/地区',
      placeholder: '请选择画师国家/地区',
      options: []
      // rules: [
      //   {
      //     required: true,
      //     message: '请选择画师国家/地区',
      //     trigger: 'blur'
      //   }
      // ]
    },
    {
      field: 'keywordList',
      type: 'select',
      label: '标签关键字',
      placeholder: '请选择标签关键字',
      options: [],
      otherOptions: {
        multiple: true
      }
      // rules: [
      //   {
      //     required: true,
      //     message: '请选择标签关键字',
      //     trigger: 'blur'
      //   }
      // ]
    },
    {
      field: 'status',
      type: 'select',
      label: '展示状态',
      placeholder: '请选择展示状态',
      options: [
        {
          title: '显示',
          value: 1
        },
        {
          title: '隐藏',
          value: 0
        }
      ],
      rules: [
        {
          required: true,
          message: '请选择展示状态',
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
