/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-05 11:36:50
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/tradeRecord/hooks/use-page-list.ts
 */
import { ref } from 'vue'

export function useStoreName() {
  const storeTypeInfo = ref({
    actionName: 'wareHouseModule/getPageListAction',
    actionListName: 'wareHouseModule/pageListData',
    actionCountName: 'wareHouseModule/pageListCount',
    deleteAction: 'wareHouseModule/deletePageDataAction'
  })
  const operationName = ref({
    editName: 'wareHouseModule/editPageDataAction',
    createName: 'wareHouseModule/createPageDataAction'
  })
  return [storeTypeInfo, operationName]
}
