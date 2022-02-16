import { TableConfig } from '@/types/table-config'

/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-16 09:33:58
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/oa/router/config/content.config.ts
 */
export const contentTableConfig: TableConfig = {
  title: '用户列表',
  propList: [
    { prop: 'id', label: 'ID' },
    { prop: 'path', label: '路径' },
    { prop: 'title', label: '名称' },
    { prop: 'component', label: '组件' },
    { prop: 'props', label: '是否是动态路由', slotName: 'isRouter' },
    { prop: 'show', label: '是否显示', slotName: 'isShow' },
    { prop: 'cache', label: '是否缓存', slotName: 'isKeep' },
    { prop: 'access', label: '是否授权', slotName: 'isAuth' }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  permission: {
    add: true,
    update: false,
    delete: false,
    query: true,
    drawTable: false
  }
}
