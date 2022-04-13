/*
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-13 15:19:54
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/device/imei/config/modal.config.ts
 */
import { IForm } from '@/base-ui/form'

export const resourceModalConfig: IForm = {
  title: '编辑资源资料',
  formItems: [
    // {
    //   field: 'moId',
    //   type: 'input',
    //   label: '资源编号',
    //   otherOptions: {
    //     disabled: true
    //   }
    // },
    // {
    //   field: 'pname',
    //   type: 'input',
    //   label: '模型名称',
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
