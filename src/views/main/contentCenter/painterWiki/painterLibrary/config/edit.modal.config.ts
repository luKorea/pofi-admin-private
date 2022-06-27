import { TableConfig } from '@/types/table-config'
export const urlModalConfig: TableConfig = {
  propList: [
    {
      prop: 'iconList',
      label: 'Icon',
      width: '100px',
      editInfo: {
        type: 'upload',
        fileTypeName: 'painterLibrary/',
        limit: 1
      }
    },
    {
      prop: 'platform',
      label: '平台',
      editInfo: {
        type: 'input'
      }
    },
    {
      prop: 'jump',
      label: '值',
      editInfo: {
        type: 'input'
      }
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
