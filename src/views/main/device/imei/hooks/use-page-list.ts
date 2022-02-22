/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-22 12:43:02
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/device/imei/hooks/use-page-list.ts
 */
import { ref } from 'vue'

export function useStoreName() {
  const storeTypeInfo = ref({
    actionName: 'userImeiModule/getPageListAction',
    actionListName: 'userImeiModule/pageListData',
    actionCountName: 'userImeiModule/pageListCount',
    deleteAction: 'userImeiModule/deletePageDataAction'
  })
  const operationName = ref({
    editName: 'userImeiModule/editPageDataAction',
    createName: 'userImeiModule/createPageDataAction'
  })
  return [storeTypeInfo, operationName]
}
