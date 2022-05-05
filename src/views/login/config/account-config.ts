/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:52
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-05 12:18:26
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/login/config/account-config.ts
 */
// 编写好规则
export const rules = {
  email: [
    {
      required: true,
      message: '用户名是必传内容~',
      trigger: 'blur'
    }
    // {
    //   pattern: /^[a-z0-9]{5,10}$/,
    //   message: '用户名必须是5~10个字母或者数字~',
    //   trigger: 'blur'
    // }
  ],
  pwd: [
    {
      required: true,
      message: '密码是必传内容~',
      trigger: 'blur'
    }
    // {
    //   pattern: /^[a-z0-9]{3,}$/,
    //   message: '用户名必须是3位以上的字母或者数字~',
    //   trigger: 'blur'
    // }
  ]
}

export const codeRules = {
  code: [
    {
      required: true,
      message: '验证码必填~',
      trigger: 'blur'
    }
    // {
    //   pattern: /^[a-z0-9]{5,10}$/,
    //   message: '用户名必须是5~10个字母或者数字~',
    //   trigger: 'blur'
    // }
  ]
}
