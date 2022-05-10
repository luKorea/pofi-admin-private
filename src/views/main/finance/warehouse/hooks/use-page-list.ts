/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-10 17:09:43
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/tradeRecord/hooks/use-page-list.ts
 */
import { ref, computed } from 'vue'
import { getCommonSelectList } from '@/service/common'
import { searchFormConfig } from '../config/search.config'
import {
  unityModalList,
  resourceGetWayList
} from '@/utils/select-list/map-resource-list'

export const regList = ref<any>([])
export const markList = ref<any>([])
export const countryList = ref<any>([])
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
}
useMapSelectValue()
export function useMapSearch() {
  const searchFormConfigRef = computed(() => {
    const markId = searchFormConfig.formItems.find(
      (item: any) => item.field === 'markId'
    )
    const snId = searchFormConfig.formItems.find(
      (item: any) => item.field === 'snId'
    )
    const srcType = searchFormConfig.formItems.find(
      (item: any) => item.field === 'srcType'
    )
    const areaId = searchFormConfig.formItems.find(
      (item: any) => item.field === 'areaId'
    )
    const have = searchFormConfig.formItems.find(
      (item: any) => item.field === 'have'
    )
    markId!.options = markList.value.map((item: any) => {
      return {
        title: item.dec,
        value: item.type
      }
    })
    snId!.options = unityModalList
    srcType!.options = regList.value.map((item: any) => {
      return {
        title: item.dec,
        value: item.type
      }
    })
    areaId!.options = countryList.value.map((i: any) => ({
      title: i.name,
      value: i.id
    }))
    have!.options = resourceGetWayList
    return searchFormConfig
  })
  return {
    searchFormConfigRef,
    searchFormConfig
  }
}
