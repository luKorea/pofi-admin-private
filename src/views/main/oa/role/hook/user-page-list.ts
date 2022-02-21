/*
 * @Author: korealu
 * @Date: 2022-02-21 10:48:12
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-21 14:35:19
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/oa/role/hook/user-page-list.ts
 */
import { ref } from 'vue'
import { getPermissionTreeData } from '@/service/main/role'
import { getRouterTreeList } from '@/service/common'

export function usePermissionTree() {
  const selectPermissionList = ref<any>([])
  const selectRouterList = ref<any>([])
  getRouterTreeList().then((res: any) => {
    if (res.result === 0) {
      selectRouterList.value = res.data
    }
  })
  getPermissionTreeData().then((res: any) => {
    if (res.result === 0) {
      selectPermissionList.value = res.data.data
    }
  })
  return {
    selectPermissionList,
    selectRouterList
  }
}

export function useStoreName() {
  const storeTypeInfo = ref({
    actionName: 'oaRoleModule/getPageListAction',
    actionListName: 'oaRoleModule/pageListData',
    actionCountName: 'oaRoleModule/pageListCount',
    deleteAction: 'oaRoleModule/deletePageDataAction'
  })
  const operationName = ref({
    editName: 'oaRoleModule/editPageDataAction',
    createName: 'oaRoleModule/createPageDataAction'
  })

  return [storeTypeInfo, operationName]
}
