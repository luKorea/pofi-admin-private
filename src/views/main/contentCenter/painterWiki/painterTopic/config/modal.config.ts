/*
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-04 15:39:37
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/language/config/modal.config.ts
 */
import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '画师专题操作',
  formItems: [
    {
      field: 'id',
      type: 'input',
      label: '编号',
      placeholder: '系统自动生成',
      otherOptions: {
        disabled: true
      }
    },
    {
      field: 'type',
      type: 'select',
      label: '专题类型',
      placeholder: '请选择专题类型',
      options: [],
      rules: [
        {
          required: true,
          message: '请选择专题类型',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'name',
      type: 'input',
      label: '专题名称',
      placeholder: '请输入专题名称',
      rules: [
        {
          required: true,
          message: '请输入专题名称',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'showDate',
      type: 'datetime',
      label: '文章日期',
      rules: [
        {
          required: true,
          message: '请选择文章日期',
          trigger: 'blur'
        }
      ],
      otherOptions: {
        placeholder: '请选择文章日期',
        valueFormat: 'YYYY-MM-DD HH:ss:mm'
      }
    },
    {
      field: 'status',
      type: 'select',
      label: '展示状态',
      placeholder: '请选择展示状态',
      defaultValue: 1,
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
    },
    {
      field: 'isUp',
      type: 'select',
      label: '是否上架',
      placeholder: '请选择是否上架',
      defaultValue: 1,
      options: [
        {
          title: '是',
          value: 1
        },
        {
          title: '否',
          value: 0
        }
      ],
      rules: [
        {
          required: true,
          message: '请选择是否上架',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'color',
      type: 'select',
      label: '显示样式(封面文字)',
      isHidden: false,
      placeholder: '请选择显示样式(封面文字)',
      options: [
        { value: 1, title: '深色' },
        { value: 0, title: '浅色' }
      ],
      rules: [
        {
          required: true,
          message: '请选择显示样式(封面文字)',
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
