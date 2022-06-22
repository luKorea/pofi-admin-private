import { TableConfig } from '@/types/table-config'
export const prepModalConfig: TableConfig = {
  propList: [
    {
      prop: 'moId',
      label: '资源编号'
    },
    {
      prop: 'pname',
      label: '名字'
    },
    {
      prop: 'nickId',
      label: 'nickID'
    },
    {
      prop: 'openType',
      label: '资源类型'
    },
    {
      label: '操作',
      editInfo: {
        type: 'handler'
      }
    }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  showFooter: false,
  childrenProps: {
    rowKey: 'id'
  },
  permission: {
    add: false,
    update: false,
    delete: false,
    columnAdd: false,
    columnDelete: false,
    drawTable: false
  }
}
