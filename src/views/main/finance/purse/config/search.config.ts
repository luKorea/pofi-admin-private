/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-22 15:08:05
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/pay/config/search.config.ts
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
    // {
    //   field: 'id',
    //   type: 'input',
    //   label: '用户编号',
    //   placeholder: '请输入用户编号'
    // },
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
      field: 'lv',
      type: 'inputRange',
      startValue: 'startLvValue',
      endValue: 'endLvValue',
      label: '等级'
    },
    {
      field: 'pb',
      type: 'inputRange',
      startValue: 'startPbValue',
      endValue: 'endPbValue',
      label: 'P币余额'
    },
    {
      field: 'number',
      type: 'inputRange',
      startValue: 'startNumberValue',
      endValue: 'endNumberValue',
      label: '积分'
    },
    {
      field: 'proState',
      type: 'select',
      label: 'Pro版',
      placeholder: '请选择Pro版状态',
      options: []
    },
    {
      field: 'plusState',
      type: 'select',
      label: 'Plus版',
      placeholder: '请选择Plus版状态',
      options: []
    },
    // {
    //   field: 'real',
    //   type: 'select',
    //   label: '是否实名',
    //   placeholder: '请选择是否实名',
    //   options: []
    // },
    {
      field: 'markId',
      type: 'select',
      label: '特殊标记',
      placeholder: '请选择特殊标记',
      options: []
    },
    // {
    //   field: 'areasId',
    //   type: 'select',
    //   label: '国家/地区',
    //   placeholder: '请选择国家/地区',
    //   options: []
    // },
    // {
    //   field: 'accountStatus',
    //   type: 'select',
    //   label: '账号状态',
    //   placeholder: '请选择账号状态',
    //   options: []
    // },
    // {
    //   field: 'register',
    //   type: 'select',
    //   label: '注册来源',
    //   placeholder: '请选择注册来源',
    //   options: []
    // },
    {
      field: 'dateTime',
      type: 'datetimerange',
      label: '创建时间',
      otherOptions: {
        startPlaceholder: '请输入开始时间',
        endPlaceholder: '请输入结束时间',
        valueFormat: 'YYYY-MM-DD HH:mm:ss'
      }
    }
  ]
}
