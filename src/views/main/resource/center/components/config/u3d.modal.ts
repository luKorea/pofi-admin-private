/*
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-11 17:52:29
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/device/imei/config/modal.config.ts
 */
import { IForm } from '@/base-ui/form'

export const u3dModalConfig: IForm = {
  title: '编辑U3D文件',
  formItems: [
    {
      field: 'libraryName',
      type: 'input',
      label: '当前所属库',
      placeholder: '当前所属库',
      otherOptions: {
        disabled: true
      }
    },
    {
      field: 'updatedTime',
      type: 'input',
      label: '上次编辑时间',
      placeholder: '系统自动生成编辑时间',
      otherOptions: {
        disabled: true
      }
    },
    {
      field: 'moId',
      type: 'input',
      label: '资源编号',
      placeholder: '系统生成',
      otherOptions: {
        disabled: true
      }
    },
    {
      field: 'nickId',
      type: 'input',
      label: '标注ID',
      placeholder: '请输入标注ID',
      rules: [
        {
          required: true,
          message: '请输入标注ID',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'pname',
      type: 'input',
      label: '后管展示名字',
      placeholder: '后管展示名字',
      rules: [
        {
          required: true,
          message: '请输入后管展示名字',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'sign',
      type: 'input',
      label: '版权信息',
      placeholder: '请输入版权信息',
      rules: [
        {
          required: true,
          message: '请输入版权信息',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'resourceType',
      type: 'select',
      label: '资源类型',
      placeholder: '请选择资源类型',
      options: [],
      rules: [
        {
          required: true,
          message: '请选择资源类型',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'resourceFileType',
      type: 'select',
      label: '资源文件类型',
      placeholder: '请选择资源文件类型',
      options: [],
      rules: [
        {
          required: true,
          message: '请选择资源文件类型',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'u3dType',
      type: 'select',
      label: 'U3D类型',
      placeholder: '请选择U3D类型',
      options: [],
      rules: [
        {
          required: true,
          message: '请选择U3D类型',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'moType',
      type: 'select',
      label: '类型',
      placeholder: '请选择类型',
      options: [],
      rules: [
        {
          required: true,
          message: '请选择类型',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'device',
      type: 'select',
      label: '设备要求',
      placeholder: '请选择设备要求',
      options: [],
      rules: [
        {
          required: true,
          message: '请选择设备要求',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'msId',
      type: 'cascader',
      label: '所属系列',
      placeholder: '请选择所属系列',
      options: [],
      otherOptions: {
        props: {
          value: 'msId',
          label: 'name',
          isLeaf: 'leaf',
          children: 'children',
          checkStrictly: true
        }
      },
      rules: [
        {
          required: true,
          message: '请选择所属系列',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'funcList',
      type: 'checkbox',
      label: '特色功能',
      placeholder: '请选择特色功能',
      options: [],
      rules: [
        {
          required: true,
          message: '请选择特色功能',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'open',
      type: 'select',
      label: '使用条件',
      placeholder: '请选择使用条件',
      options: [],
      rules: [
        {
          required: true,
          message: '请选择使用条件',
          trigger: 'blur'
        }
      ]
    }
    // {
    //   field: 'areaIds',
    //   type: 'select',
    //   label: '国家/地区',
    //   placeholder: '不选默认全部',
    //   options: [],
    //   otherOptions: {
    //     multiple: true,
    //     collapseTags: true
    //   }
    // }
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
