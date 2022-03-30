/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-28 09:52:33
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/tradeRecord/hooks/use-page-list.ts
 */
import { ref } from 'vue'

export function useStoreName() {
  const storeTypeInfo = ref({
    actionName: 'tradeRecordModule/getPageListAction',
    actionListName: 'tradeRecordModule/pageListData',
    actionCountName: 'tradeRecordModule/pageListCount',
    deleteAction: 'tradeRecordModule/deletePageDataAction'
  })
  const operationName = ref({
    editName: 'tradeRecordModule/editPageDataAction',
    createName: 'tradeRecordModule/createPageDataAction'
  })
  return [storeTypeInfo, operationName]
}
