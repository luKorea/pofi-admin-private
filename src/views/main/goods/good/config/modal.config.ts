/*
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-15 10:50:08
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/device/imei/config/modal.config.ts
 */
import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '资源商品操作',
  formItems: [
    {
      field: 'snId',
      type: 'input',
      label: '商品编号',
      placeholder: '系统分配，不能修改，IM开头',
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
      placeholder: '请输入商品标注'
      // rules: [
      //   {
      //     required: true,
      //     message: '请输入商品标注',
      //     trigger: 'blur'
      //   }
      // ]
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
      field: 'original',
      type: 'inputNumber',
      label: '限定数量',
      placeholder: '请输入限定数量',
      otherOptions: {
        min: 0
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
      label: '商品状态',
      placeholder: '请选择商品状态',
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
      field: 'tagStartTime',
      type: 'datetime',
      label: '标签开始时间',
      placeholder: '请选择开始时间'
    },
    {
      field: 'tagEndTime',
      type: 'datetime',
      label: '标签结束时间',
      placeholder: '请选择结束时间'
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
