/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-15 10:57:46
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/tradeRecord/hooks/use-page-list.ts
 */
import { ref } from 'vue'

export function useStoreName() {
  const storeTypeInfo = ref({
    actionName: 'goodsFunctionModule/getPageListAction',
    actionListName: 'goodsFunctionModule/pageListData',
    actionCountName: 'goodsFunctionModule/pageListCount',
    deleteAction: 'goodsFunctionModule/deletePageDataAction',
    sortAction: 'goodsFunctionModule/sortPageDataAction'
  })
  const operationName = ref({
    editName: 'goodsFunctionModule/editPageDataAction',
    createName: 'goodsFunctionModule/createPageDataAction'
  })
  return [storeTypeInfo, operationName]
}
