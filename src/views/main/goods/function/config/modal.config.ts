/*
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-18 15:08:16
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/device/imei/config/modal.config.ts
 */
import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '功能套餐操作',
  formItems: [
    {
      field: 'PNId',
      type: 'input',
      label: '套餐编号',
      placeholder: '系统分配，不能修改，PN开头',
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
      field: 'label',
      type: 'input',
      label: '商品标注',
      placeholder: '请输入商品标注',
      rules: [
        {
          required: true,
          message: '请输入商品标注',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'day',
      type: 'inputNumber',
      label: '套餐天数',
      placeholder: '请输入套餐天数'
    },
    {
      field: 'sale',
      type: 'inputNumber',
      label: '销售价',
      placeholder: '请输入销售价',
      otherOptions: {
        min: 0
      }
    },
    {
      field: 'original',
      type: 'inputNumber',
      label: '原价',
      placeholder: '请输入原价',
      otherOptions: {
        min: 0
      }
    },
    {
      field: 'rcg',
      type: 'inputNumber',
      label: '实际到账(P币)',
      placeholder: '请输入实际到账(P币)',
      otherOptions: {
        min: 0
      }
    },
    // {
    //   field: 'rank',
    //   type: 'inputNumber',
    //   label: '套餐排序',
    //   placeholder: '请输入套餐排序序号',
    //   otherOptions: {
    //     min: 0
    //   },
    //   rules: [
    //     {
    //       required: true,
    //       message: '请输入套餐排序序号',
    //       trigger: 'blur'
    //     }
    //   ]
    // },
    {
      field: 'funcType',
      type: 'select',
      label: '是否订阅',
      placeholder: '请选择是否订阅',
      options: [
        {
          title: '否',
          value: 1
        },
        {
          title: '是',
          value: 2
        }
      ]
    },
    {
      field: 'func',
      type: 'select',
      label: '功能内容',
      placeholder: '请选择功能内容',
      options: [
        {
          title: 'Pro专业版',
          value: 1
        },
        {
          title: 'Plus豪华版',
          value: 2
        }
      ]
    },
    {
      field: 'modeType',
      type: 'select',
      label: '资源类型',
      placeholder: '请选择资源类型',
      options: []
    },
    {
      field: 'moId',
      type: 'select',
      label: '资源名字',
      placeholder: '请选择资源名字',
      options: [],
      otherOptions: {
        multiple: true
      }
    },
    {
      field: 'developed',
      type: 'select',
      label: '定价等级',
      placeholder: '请选择定价等级',
      rules: [
        {
          required: true,
          message: '请选择定价等级',
          trigger: 'blur'
        }
      ],
      options: [
        {
          title: '发达国家',
          value: 1
        },
        {
          title: '发展中国家',
          value: 2
        }
      ]
    },
    {
      field: 'show',
      type: 'select',
      label: '套餐状态',
      placeholder: '请选择套餐状态',
      rules: [
        {
          required: true,
          message: '请选择套餐状态',
          trigger: 'blur'
        }
      ],
      options: [
        {
          title: '上架',
          value: 1
        },
        {
          title: '下架',
          value: 0
        }
      ]
    },
    {
      field: 'labelShow',
      type: 'textarea',
      label: '说明文字',
      placeholder: '请输入说明文字',
      otherOptions: {
        rows: 2
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
