/*
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-15 11:24:32
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/device/imei/config/modal.config.ts
 */
import { IForm } from '@/base-ui/form'

export const relevanceModalConfig: IForm = {
  title: '编辑相关关联',
  formItems: [
    // {
    //   field: 'moId',
    //   type: 'input',
    //   label: '资源编号',
    //   placeholder: '系统生成',
    //   otherOptions: {
    //     disabled: true
    //   }
    // },
    {
      field: 'cidList',
      type: 'cascader',
      otherOptions: {
        props: {
          value: 'id',
          label: 'name',
          isLeaf: 'leaf',
          children: 'children',
          checkStrictly: true,
          multiple: true
        }
      },
      label: '所含分类',
      placeholder: '请选择所含分类',
      options: [],
      rules: [
        {
          required: true,
          message: '请选择所含分类',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'face',
      type: 'select',
      label: '外貌类型',
      placeholder: '请选择外貌类型',
      options: [],
      otherOptions: {
        multiple: true
      }
    },
    {
      field: 'style',
      type: 'select',
      label: '风格主题',
      placeholder: '请选择风格主题',
      options: [],
      otherOptions: {
        multiple: true
      }
    },
    {
      field: 'scene',
      type: 'select',
      label: '场景应用',
      placeholder: '请选择场景应用',
      options: [],
      otherOptions: {
        multiple: true
      }
    },
    {
      field: 'other',
      type: 'select',
      label: '其他关联',
      placeholder: '请选择其他关联',
      options: [],
      otherOptions: {
        multiple: true
      }
    },
    {
      field: 'hide',
      type: 'select',
      label: '隐藏标签',
      placeholder: '请选择隐藏标签',
      options: [],
      otherOptions: {
        multiple: true
      }
    },
    {
      field: 'isPrep',
      type: 'select',
      label: '是否关联资源',
      placeholder: '请选择是否关联资源',
      options: [
        {
          title: '不关联',
          value: 1
        },
        {
          title: '关联',
          value: 2
        }
      ],
      rules: [
        {
          required: true,
          message: '请选择是否关联资源',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'rel',
      type: 'select',
      label: '关联目的',
      placeholder: '请选择关联目的',
      isHidden: true,
      options: [
        {
          value: 1,
          title: '捆绑销售'
        },
        {
          value: 2,
          title: '附属主体(Pose库必选)'
        }
      ],
      rules: [
        {
          required: true,
          message: '请选择关联目的',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'prep',
      type: 'select',
      label: '主关联资源',
      placeholder: '请选择主关联资源',
      isHidden: true,
      options: [],
      otherOptions: {
        multiple: true,
        clearable: false
      },
      rules: [
        {
          required: true,
          message: '请选择主关联资源',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'subPrep',
      type: 'select',
      label: '副关联资源',
      otherOptions: {
        multiple: true,
        clearable: false
      },
      placeholder: '请选择副关联资源',
      isHidden: true,
      options: []
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
