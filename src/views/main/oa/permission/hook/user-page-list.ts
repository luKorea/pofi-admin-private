/*
 * @Author: korealu
 * @Date: 2022-02-21 10:48:12
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-21 11:01:02
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/oa/permission/hook/user-page-list.ts
 */
import { ref } from 'vue'
export function useStoreName() {
  const storeTypeInfo = ref({
    actionName: 'oaPermissionModule/getPageListAction',
    actionListName: 'oaPermissionModule/pageListData',
    actionCountName: 'oaPermissionModule/pageListCount',
    deleteAction: 'oaPermissionModule/deletePageDataAction'
  })
  const operationName = ref({
    editName: 'oaPermissionModule/editPageDataAction',
    createName: 'oaPermissionModule/createPageDataAction'
  })

  return [storeTypeInfo, operationName]
}
