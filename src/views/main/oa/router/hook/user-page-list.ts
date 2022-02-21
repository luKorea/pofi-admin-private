/*
 * @Author: korealu
 * @Date: 2022-02-21 10:48:12
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-21 11:01:28
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/oa/router/hook/user-page-list.ts
 */
import { ref } from 'vue'
export function useStoreName() {
  const storeTypeInfo = ref({
    actionName: 'oaRouterModule/getPageListAction',
    actionListName: 'oaRouterModule/pageListData',
    actionCountName: 'oaRouterModule/pageListCount',
    deleteAction: 'oaRouterModule/deletePageDataAction'
  })
  const operationName = ref({
    editName: 'oaRouterModule/editPageDataAction',
    createName: 'oaRouterModule/createPageDataAction'
  })

  return [storeTypeInfo, operationName]
}
