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
    // {
    //   prop: 'sale',
    //   label: '价格(P币)',
    //   width: '100'
    // },
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
    // {
    //   prop: 'snId',
    //   label: '商品ID(折扣)',
    //   editInfo: {
    //     type: 'input',
    //     placeholder: '商品ID(折扣)',
    //     disabled: false
    //   }
    // },
    // {
    //   prop: 'endTime',
    //   label: '结束时间',
    //   isEdit: false,
    //   editInfo: {
    //     type: 'datetime',
    //     otherOptions: {
    //       placeholder: '请输入结束时间',
    //       valueFormat: 'YYYY-MM-DD HH:mm:ss'
    //     }
    //   }
    // }
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
