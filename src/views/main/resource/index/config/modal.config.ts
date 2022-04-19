/*
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-19 11:39:02
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/language/config/modal.config.ts
 */
import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '首页管理操作',
  formItems: [
    {
      field: 'id',
      type: 'input',
      label: '编号',
      placeholder: '系统生成',
      otherOptions: {
        disabled: true
      }
    },
    {
      field: 'remark',
      type: 'input',
      label: '内容',
      placeholder: '请输入内容',
      rules: [
        {
          required: true,
          message: '请输入内容',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'library',
      type: 'select',
      label: '所属库',
      placeholder: '请选择所属库',
      rules: [
        {
          required: true,
          message: '请选择所属库',
          trigger: 'blur'
        }
      ],
      options: [
        {
          title: '人偶库',
          value: 1
        },
        {
          title: 'pose库',
          value: 2
        }
      ]
    },
    {
      field: 'category',
      type: 'select',
      label: '所属分类页',
      placeholder: '请先选择所属库',
      rules: [
        {
          required: true,
          message: '请选择所属分类页',
          trigger: 'blur'
        }
      ],
      options: []
    },
    {
      field: 'type',
      type: 'select',
      label: '样式类型',
      placeholder: '请选择样式类型',
      rules: [
        {
          required: true,
          message: '请选择样式类型',
          trigger: 'blur'
        }
      ],
      options: []
    },
    {
      field: 'childType',
      type: 'select',
      label: '专栏内容类型',
      placeholder: '请选择专栏内容类型',
      rules: [
        {
          required: true,
          message: '请选择专栏内容类型',
          trigger: 'blur'
        }
      ],
      options: [
        { title: '资源', value: 1 },
        { title: '专题', value: 2 },
        { title: '图标按钮', value: 4 }
      ]
    },
    {
      field: 'status',
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
          title: '显示',
          value: 1
        },
        {
          title: '不显示',
          value: 0
        }
      ]
    },
    // {
    //   field: 'rid',
    //   type: 'select',
    //   label: '地区',
    //   placeholder: '请选择国家/地区',
    //   rules: [
    //     {
    //       required: true,
    //       message: '请选择国家/地区',
    //       trigger: 'blur'
    //     }
    //   ]
    // },
    {
      field: 'remark2',
      type: 'input',
      label: '备注',
      placeholder: '请输入备注'
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
