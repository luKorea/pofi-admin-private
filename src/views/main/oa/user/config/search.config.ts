/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:58
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-09 17:49:48
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/oa/user/config/search.config.ts
 */
import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  labelWidth: '120px',
  colLayout: {
    span: 8
  },
  formItems: [
    {
      field: 'id',
      type: 'input',
      label: '模糊查询',
      placeholder: '请输入id'
    }
    // {
    //   field: 'name',
    //   type: 'input',
    //   label: '用户名',
    //   placeholder: '请输入用户名'
    // },
    // {
    //   field: 'realname',
    //   type: 'input',
    //   label: '真实姓名',
    //   placeholder: '请输入真实姓名'
    // },
    // {
    //   field: 'cellphone',
    //   type: 'input',
    //   label: '电话号码',
    //   placeholder: '请输入电话号码'
    // },
    // {
    //   field: 'enable',
    //   type: 'select',
    //   label: '用户状态',
    //   placeholder: '请选择用户状态',
    //   options: [
    //     { title: '启用', value: 1 },
    //     { title: '禁用', value: 0 }
    //   ]
    // },
    // {
    //   field: 'createAt',
    //   type: 'datepicker',
    //   label: '创建时间',
    //   otherOptions: {
    //     startPlaceholder: '开始时间',
    //     endPlaceholder: '结束时间',
    //     type: 'daterange'
    //   }
    // }
  ]
}
