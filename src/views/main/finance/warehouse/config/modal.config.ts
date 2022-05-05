/*
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-05 11:23:21
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/device/imei/config/modal.config.ts
 */
import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '用户资源仓库',
  formItems: [
    {
      field: 'selectNumber',
      type: 'input',
      label: '选中用户数',
      isHidden: true,
      otherOptions: {
        disabled: true
      }
    },
    {
      field: 'selectResource',
      type: 'input',
      label: '选中资源',
      isHidden: true,
      otherOptions: {
        disabled: true
      }
    },
    {
      field: 'state',
      type: 'select',
      label: '是否拥有',
      placeholder: '请选择是否拥有',
      rules: [
        {
          required: true,
          message: '请选择是否拥有',
          trigger: 'blur'
        }
      ],
      options: [
        {
          title: '已拥有',
          value: 1
        },
        {
          title: '未拥有',
          value: 0
        }
      ]
    },
    {
      field: 'remark',
      type: 'textarea',
      label: '修改原因',
      placeholder: '请输入修改原因',
      otherOptions: {
        rows: 6
      },
      rules: [
        {
          required: true,
          message: '请输入修改原因',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'nickId',
      type: 'input',
      label: 'Pofi ID',
      isHidden: false,
      otherOptions: {
        disabled: true
      }
    },
    {
      field: 'nickName',
      type: 'input',
      label: '用户昵称',
      isHidden: false,
      otherOptions: {
        disabled: true
      }
    },
    {
      field: 'resourceName',
      type: 'input',
      label: '资源名称',
      isHidden: false,
      otherOptions: {
        disabled: true
      }
    },
    {
      field: 'snId',
      type: 'input',
      label: '资源编号',
      isHidden: false,
      otherOptions: {
        disabled: true
      }
    },
    {
      field: 'id',
      type: 'input',
      label: '标注ID',
      isHidden: false,
      otherOptions: {
        disabled: true
      }
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
