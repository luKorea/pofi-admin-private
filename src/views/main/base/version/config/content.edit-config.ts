import { TableConfig } from '@/types/table-config'
export const contentTableEditConfig: TableConfig = {
  title: '版本配置',
  propList: [
    {
      prop: 'name',
      label: '国家/地区',
      width: '120'
    },
    {
      prop: 'status',
      label: '状态',
      editInfo: {
        type: 'select',
        options: [],
        disabled: true
      }
    },
    {
      prop: 'onlineTime',
      label: '发布时间',
      isEdit: false,
      editInfo: {
        type: 'datetime',
        otherOptions: {
          placeholder: '请输入发布时间',
          valueFormat: 'YYYY-MM-DD HH:mm:ss'
        }
      }
    },
    {
      prop: 'endTime',
      label: '停运时间',
      isEdit: false,
      editInfo: {
        type: 'datetime',
        otherOptions: {
          placeholder: '请输入停运时间',
          valueFormat: 'YYYY-MM-DD HH:mm:ss'
        }
      }
    },
    {
      prop: 'isNotice',
      label: '更新公告',
      isEdit: false,
      slotName: 'isNotice',
      editInfo: {
        type: 'other'
      }
    },
    {
      label: '操作',
      width: '100',
      editInfo: {
        type: 'handler'
      }
    }
  ],
  showIndexColumn: false,
  showSelectColumn: true,
  showFooter: false,
  childrenProps: {
    rowKey: 'rid',
    isReserve: true
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
