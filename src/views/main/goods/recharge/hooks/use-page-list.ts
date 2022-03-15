/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-15 10:43:12
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/tradeRecord/hooks/use-page-list.ts
 */
import { ref } from 'vue'

export function useStoreName() {
  const storeTypeInfo = ref({
    actionName: 'goodsRechargeModule/getPageListAction',
    actionListName: 'goodsRechargeModule/pageListData',
    actionCountName: 'goodsRechargeModule/pageListCount',
    deleteAction: 'goodsRechargeModule/deletePageDataAction',
    sortAction: 'goodsRechargeModule/sortPageDataAction'
  })
  const operationName = ref({
    editName: 'goodsRechargeModule/editPageDataAction',
    createName: 'goodsRechargeModule/createPageDataAction'
  })
  return [storeTypeInfo, operationName]
}
