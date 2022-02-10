export const contentTableConfig = {
  title: '用户列表',
  propList: [
    { prop: 'id', label: 'ID' },
    { prop: 'realname', label: '登录名' },
    { prop: 'cellphone', label: '邮箱' },
    { prop: 'cellphone', label: '手机号码' },
    { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
    {
      prop: 'createAt',
      label: '创建时间',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '在线时间',
      slotName: 'updateAt'
    },
    { prop: 'cellphone', label: '修改人' },
    { prop: 'cellphone', label: '状态' },
    { label: '操作', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}
