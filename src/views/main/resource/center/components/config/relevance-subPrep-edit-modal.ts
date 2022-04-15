import { TableConfig } from '@/types/table-config'
export const subPrepModalConfig: TableConfig = {
  propList: [
    {
      prop: 'moId',
      label: '资源编号',
      editInfo: {
        type: 'input',
        placeholder: '系统生成',
        disabled: true
      }
    },
    {
      prop: 'pname',
      label: '名字',
      editInfo: {
        type: 'input',
        placeholder: '系统生成',
        disabled: true
      }
    },
    {
      prop: 'nickId',
      label: 'nickID',
      editInfo: {
        type: 'other',
        placeholder: '请输入资源名称',
        disabled: true
      }
    },
    {
      prop: 'sale',
      label: '价格',
      editInfo: {
        type: 'input',
        disabled: true,
        placeholder: '价格'
      }
    },
    {
      prop: 'openType',
      label: '资源类型',
      editInfo: {
        type: 'input',
        disabled: true,
        placeholder: '资源类型'
      }
    },
    {
      prop: 'snId',
      label: '商品ID(折扣)',
      editInfo: {
        type: 'input',
        disabled: true,
        placeholder: '请输入商品ID(折扣)'
      }
    },
    {
      prop: 'endTime',
      label: '结束时间',
      isEdit: false,
      editInfo: {
        type: 'datetime',
        placeholder: '请输入结束时间',
        otherOptions: {
          valueFormat: 'YYYY-MM-DD HH:mm:ss'
        }
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
