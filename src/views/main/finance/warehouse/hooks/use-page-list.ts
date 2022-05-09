/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-09 10:20:39
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/tradeRecord/hooks/use-page-list.ts
 */
import { ref } from 'vue'
import { getCommonSelectList } from '@/service/common'

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

// 动态设置下拉列表的值
export function useMapSelectValue() {
  const regList = ref<any>([])
  const markList = ref<any>([])
  const countryList = ref<any>([])
  Promise.allSettled([
    getCommonSelectList('reg'),
    getCommonSelectList('mark'),
    getCommonSelectList('country')
  ])
    .then((result) => {
      for (let i = 0; i < result.length; i++) {
        if (result[i].status === 'fulfilled') {
          regList.value = (result[0] as any)?.value?.data
          markList.value = (result[1] as any)?.value?.data
          countryList.value = (result[2] as any)?.value?.data?.rows
        }
      }
    })
    .catch((err) => {
      console.log(err)
    })
  return [regList, markList, countryList]
}
