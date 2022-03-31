/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:58
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-22 13:41:20
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/device/imei/config/search.config.ts
 */
import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  labelWidth: '120px',
  colLayout: {
    span: 8
  },
  formItems: [
    {
      field: 'moId',
      type: 'input',
      label: '资源编号',
      placeholder: '请输入资源编号'
    },
    {
      field: 'nickId',
      type: 'input',
      label: '标注ID',
      placeholder: '请输入标注ID'
    },
    {
      field: 'pname',
      type: 'input',
      label: '资源名称',
      placeholder: '请输入资源名称'
    },
    {
      field: 'unityType',
      type: 'select',
      label: 'U3D类型',
      placeholder: '请选择U3D类型',
      options: []
    },
    {
      field: 'open',
      type: 'select',
      label: '使用条件',
      placeholder: '请选择使用条件',
      options: []
    },
    {
      field: 'state',
      type: 'select',
      label: '资源状态',
      placeholder: '请选择资源状态',
      options: []
    },
    {
      field: 'dateTime',
      type: 'datetimerange',
      label: '创建时间',
      otherOptions: {
        startPlaceholder: '请输入开始时间',
        endPlaceholder: '请输入结束时间',
        valueFormat: 'YYYY-MM-DD HH:mm:ss'
      }
    },
    {
      field: 'onlineTime',
      type: 'datetimerange',
      label: '上线时间',
      otherOptions: {
        startPlaceholder: '请输入开始时间',
        endPlaceholder: '请输入结束时间',
        valueFormat: 'YYYY-MM-DD HH:mm:ss'
      }
    }
  ]
}
