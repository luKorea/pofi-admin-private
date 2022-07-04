import { TableConfig } from '@/types/table-config'
export const urlModalConfig: TableConfig = {
  propList: [
    {
      prop: 'name',
      label: '专题名称'
    },
    {
      prop: 'showDate',
      label: '文章日期'
    },
    {
      prop: 'areaList',
      label: '国家/地区'
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
