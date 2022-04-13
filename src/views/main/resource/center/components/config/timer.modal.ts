/*
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-13 15:20:00
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/device/imei/config/modal.config.ts
 */
import { IForm } from '@/base-ui/form'

export const timerModalConfig: IForm = {
  title: '编辑时间状态',
  formItems: [
    // {
    //   field: 'moId',
    //   type: 'input',
    //   label: '资源编号',
    //   placeholder: '资源编号',
    //   otherOptions: {
    //     disabled: true
    //   }
    // },
    // {
    //   field: 'pname',
    //   type: 'input',
    //   label: '模型名称',
    //   placeholder: '模型名称',
    //   otherOptions: {
    //     disabled: true
    //   }
    // },
    {
      field: 'createdTime',
      type: 'datetime',
      label: '创建时间',
      otherOptions: {
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        disabled: true,
        placeholder: '请选择创建时间'
      }
    },
    {
      field: 'updatedTime',
      type: 'datetime',
      label: '更新时间',
      otherOptions: {
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        disabled: true,
        placeholder: '请选择更新时间'
      }
    },
    {
      field: 'state',
      type: 'select',
      label: '资源状态',
      placeholder: '请选择资源状态',
      options: [],
      rules: [
        {
          required: true,
          message: '请选择资源状态',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'onlineTime',
      type: 'datetime',
      label: '上线时间',
      otherOptions: {
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        placeholder: '请选择上线时间'
      },
      rules: [
        {
          required: true,
          message: '请选择上线时间',
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
