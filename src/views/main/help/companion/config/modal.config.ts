/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:58
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-10 10:36:05
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/config/page-config/modal.config.ts
 */
import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '使用指南操作',
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
      label: '标题',
      placeholder: '请输入标题',
      rules: [
        {
          required: true,
          message: '请输入标题',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'bgList',
      type: 'upload',
      label: '图片上传',
      otherOptions: {
        limit: 1,
        fileTypeName: 'helpCompanion/'
      }
    },
    {
      field: 'fileList',
      type: 'upload',
      label: '视频上传',
      otherOptions: {
        limit: 1,
        fileTypeName: 'helpCompanion/'
      }
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
