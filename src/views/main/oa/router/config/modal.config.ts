/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:58
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-05 10:00:24
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/oa/router/config/modal.config.ts
 */
import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '路由管理操作',
  formItems: [
    {
      field: 'parent',
      type: 'select',
      label: '上级路由',
      placeholder: '请选择上级路由',
      options: [],
      rules: [
        {
          required: true,
          message: '请选择上级路由',
          trigger: 'blur'
        }
      ],
      otherOptions: {
        filterable: true
      }
    },
    {
      field: 'name',
      type: 'input',
      label: '路由名称',
      placeholder: '请输入路由名称',
      rules: [
        {
          required: true,
          message: '请输入路由名称',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'title',
      type: 'input',
      label: '路由标题',
      placeholder: '请输入路由标题',
      rules: [
        {
          required: true,
          message: '请输入路由标题',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'path',
      type: 'input',
      label: '路由路径',
      placeholder: '请输入路由路径, 一级路由带 "/",二级路由无需带 ',
      rules: [
        {
          required: true,
          message: '请输入路由路径, 一级路由带 "/",二级路由无需带',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'component',
      type: 'input',
      label: '路由组件地址',
      placeholder:
        '请输入路由组件地址, 请输入前端配置对应地址，例如 "/finance/warehouse/warehouse"',
      rules: [
        {
          required: true,
          message:
            '请输入路由组件地址, 请输入前端配置对应地址，例如 "/finance/warehouse/warehouse"',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'icon',
      type: 'input',
      label: '路由图标',
      placeholder: '请输入路由图标',
      rules: [
        {
          required: true,
          message: '请输入路由图标',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'show',
      type: 'select',
      label: '是否可见',
      placeholder: '请选择是否可见',
      rules: [
        {
          required: true,
          message: '请选择是否可见',
          trigger: 'blur'
        }
      ],
      options: [
        {
          value: 1,
          title: '是'
        },
        {
          value: 0,
          title: '否'
        }
      ]
    },
    {
      field: 'cache',
      type: 'select',
      label: '是否缓存',
      placeholder: '请选择是否缓存',
      rules: [
        {
          required: true,
          message: '请选择是否缓存',
          trigger: 'blur'
        }
      ],
      options: [
        {
          value: 1,
          title: '是'
        },
        {
          value: 0,
          title: '否'
        }
      ]
    },
    {
      field: 'access',
      type: 'select',
      label: '是否授权',
      placeholder: '请选择是否授权',
      rules: [
        {
          required: true,
          message: '请选择是否授权',
          trigger: 'blur'
        }
      ],
      options: [
        {
          value: 1,
          title: '是'
        },
        {
          value: 0,
          title: '否'
        }
      ]
    },
    {
      field: 'props',
      type: 'select',
      label: '是否是动态路由',
      placeholder: '请选择是否是动态路由',
      rules: [
        {
          required: true,
          message: '请选择是否是动态路由',
          trigger: 'blur'
        }
      ],
      options: [
        {
          value: true,
          title: '是'
        },
        {
          value: false,
          title: '否'
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
