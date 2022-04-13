/*
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-13 14:20:36
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/device/imei/config/modal.config.ts
 */
import { IForm } from '@/base-ui/form'

export const u3dModalConfig: IForm = {
  title: '编辑U3D文件',
  formItems: [
    {
      field: 'pname',
      type: 'input',
      label: '模型名称',
      placeholder: '模型名称',
      otherOptions: {
        disabled: true
      }
    },
    {
      field: 'nickId',
      type: 'input',
      label: '模型标注',
      placeholder: '模型标注',
      otherOptions: {
        disabled: true
      }
    }
    // {
    //   field: 'iosVersion',
    //   type: 'input',
    //   label: 'IOS版本号',
    //   placeholder: '当前IOS版本号',
    //   otherOptions: {
    //     disabled: true
    //   }
    // },
    // {
    //   field: 'androidVersion',
    //   type: 'input',
    //   label: 'Android版本号',
    //   placeholder: '当前Android版本号',
    //   otherOptions: {
    //     disabled: true
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
