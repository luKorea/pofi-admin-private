/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:58
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-21 11:30:41
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
      options: []
    },
    {
      field: 'name',
      type: 'input',
      label: '路由名称',
      placeholder: '请输入路由名称'
    },
    {
      field: 'title',
      type: 'input',
      label: '路由标题',
      placeholder: '请输入路由标题'
    },
    {
      field: 'path',
      type: 'input',
      label: '路由路径',
      placeholder: '请输入路由路径'
    },
    {
      field: 'component',
      type: 'input',
      label: '路由组件地址',
      placeholder: '请输入路由组件地址'
    },
    {
      field: 'icon',
      type: 'input',
      label: '路由图标',
      placeholder: '请输入路由图标'
    },
    {
      field: 'show',
      type: 'select',
      label: '是否可见',
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
