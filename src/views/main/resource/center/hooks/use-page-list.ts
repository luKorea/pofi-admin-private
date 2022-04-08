/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-08 14:27:02
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/device/imei/hooks/use-page-list.ts
 */
import { ref, computed } from 'vue'
import { mapSelectListTitle } from '@/utils'
import {
  resourceTypeList,
  resourceConditionList,
  resourceValueList,
  unityModalList
} from '@/utils/select-list/map-resource-list'
import { searchFormConfig } from '../config/search.config'
// 初始化高级检索值
export function useMapFormConfigData() {
  const searchFormConfigData = computed(() => {
    searchFormConfig.formItems.map((item: any) => {
      if (item.field === 'moType') item.options = resourceTypeList
      if (item.field === 'open') item.options = resourceConditionList
      if (item.field === 'state') item.options = resourceValueList
      if (item.field === 'unityType')
        item!.options = unityModalList.filter((i: any) => i.value !== undefined)
    })
    return searchFormConfig
  })
  const unityModalFilterList = unityModalList.filter(
    (i: any) => i.value !== 7 && i.value !== 8 && i.value !== undefined
  )
  return [
    searchFormConfigData,
    resourceTypeList,
    resourceConditionList,
    resourceValueList,
    unityModalFilterList,
    unityModalList.filter((i: any) => i.value !== undefined)
  ]
}
export function usePageFunction() {
  // 上传流程图
  const processRef = ref<any>()
  const openProcessDialog = () => {
    if (processRef.value) {
      processRef.value.pageProcessRef.dialogVisible = true
    }
  }
  // 格式化下拉数据
  const mapTitle = (value: number, list: any[]) => {
    return mapSelectListTitle(value, list)
  }
  return [processRef, openProcessDialog, mapTitle]
}

export function useStoreName() {
  const storeTypeInfo = ref({
    actionName: 'resourceCenterModule/getPageListAction',
    actionListName: 'resourceCenterModule/pageListData',
    actionCountName: 'resourceCenterModule/pageListCount',
    deleteAction: 'resourceCenterModule/deletePageDataAction'
  })
  const operationName = ref({
    editName: 'resourceCenterModule/editPageDataAction',
    createName: 'resourceCenterModule/createPageDataAction'
  })
  return [storeTypeInfo, operationName]
}
