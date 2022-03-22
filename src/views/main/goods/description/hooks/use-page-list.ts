/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-22 11:48:35
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/tradeRecord/hooks/use-page-list.ts
 */
import { ref } from 'vue'

export function useStoreName() {
  const storeTypeInfo = ref({
    actionName: 'goodsDescriptionModule/getPageListAction',
    actionListName: 'goodsDescriptionModule/pageListData',
    actionCountName: 'goodsDescriptionModule/pageListCount',
    deleteAction: 'goodsDescriptionModule/deletePageDataAction',
    sortAction: 'goodsDescriptionModule/sortPageDataAction'
  })
  const operationName = ref({
    editName: 'goodsDescriptionModule/editPageDataAction',
    createName: 'goodsDescriptionModule/createPageDataAction'
  })
  return [storeTypeInfo, operationName]
}
