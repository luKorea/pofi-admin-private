/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-15 17:33:42
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/oa/user/config/content.config.ts
 */
export const contentTableConfig = {
  title: '用户列表',
  propList: [
    { prop: 'id', label: 'ID' },
    { prop: 'username', label: '登录名' },
    { prop: 'nickname', label: '用户名' },
    { prop: 'email', label: '邮箱' },
    { prop: 'phone', label: '手机号码' },
    {
      prop: 'createAt',
      label: '创建时间',
      slotName: 'createAt'
    },
    {
      prop: 'onlineTime',
      label: '在线时间',
      slotName: 'updateAt'
    },
    { prop: 'modUser', label: '修改人' },
    { prop: 'valid', label: '状态', slotName: 'status' },
    { label: '操作', slotName: 'handler' }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  showFooter: true,
  permission: {
    add: true,
    update: true,
    delete: true,
    query: true,
    drawTable: true
  }
}
