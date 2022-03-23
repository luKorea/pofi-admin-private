/*
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-23 11:22:28
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/language/config/modal.config.ts
 */
import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '问题管理操作',
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
      field: 'title',
      type: 'input',
      label: '备注',
      placeholder: '请输入备注'
      // rules: [
      //   {
      //     required: true,
      //     message: '请输入名称',
      //     trigger: 'blur'
      //   }
      // ]
    },
    {
      field: 'typeId',
      type: 'select',
      label: '问题类型',
      placeholder: '请选择问题类型',
      options: [],
      rules: [
        {
          required: true,
          message: '请选择问题类型',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'createTime',
      type: 'datetime',
      label: '发布时间',
      placeholder: '请选择发布时间'
    },
    {
      field: 'state',
      type: 'select',
      label: '状态',
      placeholder: '请选择状态',
      options: [
        {
          value: 1,
          title: '显示'
        },
        {
          value: 0,
          title: '不显示'
        }
      ]
    },
    {
      field: 'isHot',
      type: 'select',
      label: '是否热门',
      placeholder: '请选择是否热门',
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
