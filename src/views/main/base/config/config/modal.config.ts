/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-18 11:18:12
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
      field: 'name',
      type: 'input',
      label: '变量名',
      placeholder: '请输入变量名',
      rules: [
        {
          required: true,
          message: '请输入变量名',
          trigger: 'blur'
        }
      ]
    },
    // {
    //   field: 'areaIds',
    //   type: 'select',
    //   label: '国家/地区',
    //   placeholder: '请选择国家或者地区, 默认不选全部',
    //   options: [],
    //   otherOptions: {
    //     multiple: true,
    //     collapseTags: true
    //   }
    // },
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
    },
    {
      field: 'group',
      type: 'select',
      label: '分组',
      placeholder: '请选择分组',
      options: [],
      otherOptions: {}
    },
    {
      field: 'type',
      type: 'select',
      label: '分类',
      placeholder: '请选择分类',
      options: [],
      otherOptions: {}
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
