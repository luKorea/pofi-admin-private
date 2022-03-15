/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-15 10:35:24
 * @Description: file content
 * @FilePath: /pofi-admin/src/base-ui/form/types/index.ts
 */
type IFormType =
  | 'input'
  | 'password'
  | 'select'
  | 'datepicker'
  | 'datetimerange'
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
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: any
  itemStyle?: any
  title?: string
}
