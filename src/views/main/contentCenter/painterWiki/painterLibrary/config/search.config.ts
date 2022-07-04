/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:58
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-04 10:59:33
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/oa/user/config/search.config.ts
 */
import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  labelWidth: '120px',
  colLayout: {
    span: 8
  },
  formItems: [
    {
      field: 'paid',
      type: 'input',
      label: '画师ID',
      placeholder: '请输入画师ID'
    },
    {
      field: 'nickId',
      type: 'input',
      label: 'pofi ID',
      placeholder: '请输入pofi ID'
    },
    {
      field: 'name',
      type: 'input',
      label: '画师名称',
      placeholder: '请输入画师名称'
    },
    // {
    //   field: 'state',
    //   type: 'select',
    //   label: '账号状态',
    //   placeholder: '请选择账号状态',
    //   options: []
    // },
    {
      field: 'region',
      type: 'select',
      label: '画师国家/地区',
      placeholder: '请选择画师国家/地区',
      options: []
    },
    {
      field: 'platform',
      type: 'select',
      label: '第三方绑定',
      placeholder: '请选择第三方绑定',
      options: []
    },
    // {
    //   field: 'country',
    //   type: 'input',
    //   label: '第三方URl',
    //   placeholder: '请输入第三方URL'
    // },
    {
      field: 'dateTime',
      type: 'daterange',
      label: '创建时间',
      otherOptions: {
        startPlaceholder: '请输入开始时间',
        endPlaceholder: '请输入结束时间',
        valueFormat: 'YYYY-MM-DD'
      }
    }
    // {
    //   field: 'country',
    //   type: 'input',
    //   label: '备注',
    //   placeholder: '请输入备注'
    // },
    // {
    //   field: 'country',
    //   type: 'select',
    //   label: '是否有专题',
    //   placeholder: '请选择是否有专题',
    //   options: []
    // },
    // {
    //   field: 'country',
    //   type: 'select',
    //   label: '包含语言',
    //   placeholder: '请选择包含语言',
    //   options: []
    // }
  ]
}
