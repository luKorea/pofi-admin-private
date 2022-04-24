/*
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-24 17:20:28
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
      label: '商品名称',
      placeholder: '请输入商品名称',
      rules: [
        {
          required: true,
          message: '请输入商品名称',
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
      field: 'useType',
      type: 'select',
      label: '商品用途',
      placeholder: '请选择商品用途',
      rules: [
        {
          required: true,
          message: '请选择商品用途',
          trigger: 'blur'
        }
      ],
      options: [
        {
          title: '常规商品',
          value: 1
        },
        {
          title: '临时商品',
          value: 2
        }
      ]
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
      field: 'limitNum',
      type: 'inputNumber',
      label: '限定数量',
      placeholder: '请输入限定数量',
      otherOptions: {
        min: 0
      }
    },
    {
      field: 'saleNum',
      type: 'inputNumber',
      label: '已售出',
      placeholder: '已售出数量',
      otherOptions: {
        disabled: true
      }
    },
    // {
    //   field: 'developed',
    //   type: 'select',
    //   label: '定价等级',
    //   placeholder: '请选择定价等级',
    //   rules: [
    //     {
    //       required: true,
    //       message: '请选择定价等级',
    //       trigger: 'blur'
    //     }
    //   ],
    //   options: [
    //     {
    //       title: '发达国家',
    //       value: 1
    //     },
    //     {
    //       title: '发展中国家',
    //       value: 2
    //     }
    //   ]
    // },
    // {
    // {
    //   field: 'moId',
    //   label: '绑定模型',
    //   type: 'selectRemote',
    //   placeholder: '请输入模型资源id或名称搜索',
    //   options: []
    // },
    // {
    //   field: 'tagType',
    //   label: '活动标签',
    //   type: 'select',
    //   placeholder: '请活动标签',
    //   options: []
    // },
    // {
    //   field: 'tagStartTime',
    //   type: 'datetime',
    //   label: '标签开始时间',
    //   placeholder: '请选择开始时间'
    // },
    // {
    //   field: 'tagEndTime',
    //   type: 'datetime',
    //   label: '标签结束时间',
    //   placeholder: '请选择结束时间'
    // },
    {
      field: 'unityType',
      label: 'U3D类型',
      type: 'select',
      placeholder: '请选择U3D类型',
      options: []
    },
    {
      field: 'moId',
      label: '绑定模型名称',
      type: 'select',
      placeholder: '请先选择U3D类型',
      options: []
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
      ],
      rules: [
        {
          required: true,
          message: '请选择商品用途',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'cmsContent',
      label: '绑定模型名称',
      type: 'textarea',
      placeholder: '绑定模型名称',
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
