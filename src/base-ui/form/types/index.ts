/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:44
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-04 10:51:18
 * @Description: file content
 * @FilePath: /pofi-admin/src/base-ui/form/types/index.ts
 */
type IFormType =
  | 'input'
  | 'inputRange'
  | 'password'
  | 'select'
  | 'selectRemote'
  | 'date'
  | 'datepicker'
  | 'datetimerange'
  | 'datetime'
  | 'daterange'
  | 'radio'
  | 'cascader'
  | 'checkbox'
  | 'inputNumber'
  | 'switch'
  | 'upload'
  | 'timeSelect'
  | 'treeSelect'
  | 'editor'
  | 'textarea'

export interface IFormItem {
  field: string
  type: IFormType
  label: string
  prop?: string
  rules?: any[]
  placeholder?: any
  // 针对select
  options?: any[]
  // 针对特殊的属性
  otherOptions?: any
  isHidden?: boolean
  disabled?: boolean
  // 针对区间选择器
  startValue?: any
  endValue?: any
  defaultValue?: any
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: any
  itemStyle?: any
  title?: string
}
