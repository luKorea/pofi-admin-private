/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-17 14:57:25
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/resource/data/hooks/use-page-list.ts
 */
import { ref, computed } from 'vue'
import PageContent from '@/components/page-content'

import { usePageDialog } from '@/hooks/use-page-dialog'
import { useStore } from '@/store'
import { searchFormConfig } from '../config/search.config'
import { getCommonSelectList } from '@/service/common/index'
import {
  resourceConditionList,
  resourceValueList
} from '@/utils/select-list/map-resource-list'
// 初始化高级检索值
export const resourceTypeList = ref<any>([])
getCommonSelectList('resourceCenterType').then((res: any) => {
  if (res.result === 0) {
    resourceTypeList.value = res.data.map((item: any) => {
      return {
        value: item.type,
        title: item.dec
      }
    })
  }
})
export function useMapSearchFormConfigData() {
  const searchFormConfigData = computed(() => {
    searchFormConfig.formItems.map((item: any) => {
      if (item.field === 'moType') item.options = resourceTypeList.value
      if (item.field === 'open') item.options = resourceConditionList
      if (item.field === 'state') item.options = resourceValueList
    })
    return searchFormConfig
  })
  return [searchFormConfigData, resourceConditionList, resourceValueList]
}

export function useOperationData() {
  const pageInfo = ref({ currentPage: 1, pageSize: 10 })
  const pageOperationRef = ref<InstanceType<typeof PageContent>>()
  const [pageDialogRef, handleShowDialog] = usePageDialog()
  const handleOperationClick = (item: any) => {
    handleShowDialog()
    getData({
      moId: item.moId
    })
  }
  const store = useStore()
  const getData = (queryInfo: any) => {
    store.dispatch('resourceDataModule/getPageListAction', {
      pageName: 'log',
      queryInfo: {
        currentPage: pageInfo.value.currentPage,
        pageSize: pageInfo.value.pageSize,
        ...queryInfo
      }
    })
  }
  const dataList = computed(() => {
    return store.getters['resourceDataModule/pageListData']('log')
  })
  const dataCount = computed(() => {
    return store.getters['resourceDataModule/pageListCount']('log')
  })
  return [
    pageDialogRef,
    pageOperationRef,
    handleOperationClick,
    pageInfo,
    dataList,
    dataCount
  ]
}

export function useStoreName() {
  const storeTypeInfo = ref({
    actionName: 'resourceDataModule/getPageListAction',
    actionListName: 'resourceDataModule/pageListData',
    actionCountName: 'resourceDataModule/pageListCount',
    deleteAction: 'resourceDataModule/deletePageDataAction'
  })
  const operationName = ref({
    editName: 'resourceDataModule/editPageDataAction',
    createName: 'resourceDataModule/createPageDataAction'
  })
  return [storeTypeInfo, operationName]
}
