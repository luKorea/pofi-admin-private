/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:58
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-09 10:18:58
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/tradeRecord/config/search.config.ts
 */
import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  labelWidth: '120px',
  colLayout: {
    xl: 8, // >1920px 4个
    lg: 8,
    md: 12,
    sm: 24,
    xs: 24
  },
  formItems: [
    {
      field: 'nickId',
      type: 'input',
      label: 'Pofi ID',
      placeholder: '请输入Pofi ID'
    },
    {
      field: 'nickName',
      type: 'input',
      label: '用户昵称',
      placeholder: '请输入用户昵称'
    },
    {
      field: 'account',
      type: 'input',
      label: '登录账号',
      placeholder: '请输入登录账号'
    },
    {
      field: 'status',
      type: 'select',
      label: '用户账号状态',
      placeholder: '请选择用户账号状态',
      options: [
        {
          title: '全部',
          value: -999
        },
        {
          title: '注销',
          value: 1
        },
        {
          title: '正常',
          value: 2
        }
      ]
    },
    {
      field: 'isReal',
      type: 'select',
      label: '是否实名',
      placeholder: '请选择用户实名状态',
      options: [
        {
          title: '全部',
          value: -999
        },
        {
          title: '是',
          value: 1
        },
        {
          title: '否',
          value: 2
        }
      ]
    },
    {
      field: 'markId',
      type: 'select',
      label: '特殊标记',
      placeholder: '请选择特殊标记',
      options: []
    },
    {
      field: 'srcType',
      type: 'select',
      label: '用户注册来源',
      placeholder: '请选择用户注册来源',
      options: []
    },
    {
      field: 'areaId',
      type: 'select',
      label: '国家地区',
      placeholder: '请选择国家地区',
      options: [
        {
          title: '全部',
          value: -999
        }
      ]
    },
    {
      field: 'dateTime',
      type: 'datetimerange',
      label: '注册时间',
      otherOptions: {
        startPlaceholder: '请输入开始时间',
        endPlaceholder: '请输入结束时间',
        valueFormat: 'YYYY-MM-DD HH:mm:ss'
      }
    },
    {
      field: 'nickId',
      type: 'input',
      label: '资源编号',
      placeholder: '请输入资源编号'
    },
    {
      field: 'nickId',
      type: 'input',
      label: '资源名称',
      placeholder: '请输入资源名称'
    },
    {
      field: 'nickId',
      type: 'input',
      label: '标注ID',
      placeholder: '请输入标注ID'
    },
    {
      field: 'costType',
      type: 'select',
      label: '是否拥有',
      placeholder: '请选择是否拥有',
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
      field: 'costType',
      type: 'select',
      label: '心愿单',
      placeholder: '请选择心愿单',
      options: [
        {
          title: '已加入心愿单',
          value: 1
        },
        {
          title: '未加入心愿单',
          value: 0
        }
      ]
    },
    {
      field: 'snId',
      type: 'select',
      label: 'U3D类型',
      placeholder: '请选择U3D类型',
      options: []
    },
    {
      field: 'have',
      type: 'select',
      label: '获取方式',
      placeholder: '请选择获取方式',
      options: []
    }
  ]
}
