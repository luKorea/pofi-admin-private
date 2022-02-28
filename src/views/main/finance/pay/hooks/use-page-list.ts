/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-28 11:44:14
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/pay/hooks/use-page-list.ts
 */
import { ref } from 'vue'

export function useComputedPayType(state: number | string) {
  switch (state) {
    case 0:
      return '等待支付'
      break
    case 1:
      return '完成支付'
      break
    case 2:
      return '取消支付'
      break
  }
}
export function useComputedPayWay(state: number | string) {
  switch (state) {
    case 0:
      return '微信'
      break
    case 1:
      return '支付宝'
      break
    case 2:
      return 'QQ支付'
      break
    case 3:
      return 'apple支付'
      break
    case 4:
      return 'apple订阅'
      break
    case 5:
      return 'google支付'
      break
    case 6:
      return 'google订阅'
      break
  }
}

export function useStoreName() {
  const storeTypeInfo = ref({
    actionName: 'payModule/getPageListAction',
    actionListName: 'payModule/pageListData',
    actionCountName: 'payModule/pageListCount',
    deleteAction: 'payModule/deletePageDataAction'
  })
  const operationName = ref({
    editName: 'payModule/editPageDataAction',
    createName: 'payModule/createPageDataAction'
  })
  return [storeTypeInfo, operationName]
}
