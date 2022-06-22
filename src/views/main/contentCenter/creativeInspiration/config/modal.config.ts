/*
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-06-22 10:04:11
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/device/imei/config/modal.config.ts
 */
import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '创作灵感操作',
  formItems: [
    {
      field: 'kid',
      type: 'input',
      label: '灵感编号',
      placeholder: '系统生成, 以FL开头',
      otherOptions: {
        disabled: true
      }
    },
    {
      field: 'title',
      type: 'input',
      label: '灵感标题',
      placeholder: '请输入灵感标题'
    },
    {
      field: 'show',
      type: 'select',
      label: '灵感状态',
      placeholder: '请选择灵感状态',
      options: [
        {
          value: 1,
          title: '显示'
        },
        {
          value: 0,
          title: '隐藏'
        }
      ],
      rules: [
        {
          required: true,
          message: '请选择灵感状态',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'feelType',
      type: 'select',
      label: '灵感分类',
      placeholder: '请选择灵感分类',
      options: [],
      rules: [
        {
          required: true,
          message: '请选择灵感分类',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'keywordList',
      type: 'select',
      label: '标签关键字',
      placeholder: '请选择标签关键字',
      options: [],
      otherOptions: {
        multiple: true
      },
      rules: [
        {
          required: true,
          message: '请选择标签关键字',
          trigger: 'blur'
        }
      ]
    },
    // {
    //   field: 'keywordList1',
    //   type: 'select',
    //   label: '隐藏标签',
    //   placeholder: '请选择隐藏标签',
    //   options: [],
    //   otherOptions: {
    //     multiple: true
    //   },
    //   disabled: true
    //   // rules: [
    //   //   {
    //   //     required: true,
    //   //     message: '请选择主标签',
    //   //     trigger: 'blur'
    //   //   }
    //   // ]
    // },
    {
      field: 'isPrep',
      type: 'select',
      label: '是否关联资源',
      placeholder: '请选择是否关联资源',
      options: [
        {
          title: '不关联',
          value: 0
        },
        {
          title: '关联',
          value: 1
        }
      ],
      rules: [
        {
          required: true,
          message: '请选择是否关联资源',
          trigger: 'blur'
        }
      ]
    }
    // {
    //   field: 'remark',
    //   type: 'textarea',
    //   label: '官方评论（临时）',
    //   placeholder: '请输入官方评论（临时）',
    //   otherOptions: {
    //     disabled: true
    //   }
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
