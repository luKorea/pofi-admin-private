/*
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-24 15:40:40
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/device/imei/config/modal.config.ts
 */
import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '套餐文案操作',
  formItems: [
    {
      field: 'PBId',
      type: 'input',
      label: '套餐编号',
      placeholder: '系统分配，不能修改',
      otherOptions: {
        disabled: true
      }
    },
    {
      field: 'name',
      type: 'input',
      label: '套餐名称',
      placeholder: '请输入套餐名称',
      rules: [
        {
          required: true,
          message: '请输入套餐名称',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'type',
      type: 'select',
      label: '文案类型',
      placeholder: '请选择文案类型',
      options: [],
      rules: [
        {
          required: true,
          message: '请选择文案类型',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'funcType',
      type: 'select',
      label: '所属套餐',
      placeholder: '请选择所属套餐',
      options: [],
      rules: [
        {
          required: true,
          message: '请选择所属套餐',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'parentId',
      type: 'select',
      label: '所属权益',
      placeholder: '请选择所属权益',
      options: [],
      isHidden: true
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
