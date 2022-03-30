/*
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-01 10:17:20
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/head/config/modal.config.ts
 */
import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '用户资料审核',
  formItems: [
    {
      field: 'name',
      label: '用户名称',
      type: 'input',
      otherOptions: {
        disabled: true
      }
    },
    {
      field: 'reason',
      label: '处理意见',
      type: 'textarea',
      placeholder: '请输入处理意见,以便客服回复用户咨询',
      rules: [
        {
          required: true,
          message: '请输入处理意见,以便客服回复用户咨询',
          trigger: 'blur'
        }
      ]
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
