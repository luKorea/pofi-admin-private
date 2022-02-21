/*
 * @Author: korealu
 * @Date: 2022-02-21 10:48:12
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-21 11:01:41
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/oa/user/hook/user-page-list.ts
 */
import { ref } from 'vue'
export function useStoreName() {
  const storeTypeInfo = ref({
    actionName: 'oaUserModule/getPageListAction',
    actionListName: 'oaUserModule/pageListData',
    actionCountName: 'oaUserModule/pageListCount',
    deleteAction: 'oaUserModule/deletePageDataAction'
  })
  const operationName = ref({
    editName: 'oaUserModule/editPageDataAction',
    createName: 'oaUserModule/createPageDataAction'
  })

  return [storeTypeInfo, operationName]
}
