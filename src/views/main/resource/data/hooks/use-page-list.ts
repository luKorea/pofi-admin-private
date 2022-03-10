/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-10 10:04:15
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/resource/data/hooks/use-page-list.ts
 */
import { ref, watch, computed } from 'vue'
import PageContent from '@/components/page-content'

import { usePageDialog } from '@/hooks/use-page-dialog'
import { useStore } from '@/store'

export function useOperationData() {
  // 模态框区域
  const selectList = ref<any>([
    {
      label: '全部',
      value: -999
    },
    {
      label: '系统',
      value: 1
    },
    {
      label: '管理人员',
      value: 2
    },
    {
      label: '用户',
      value: 3
    }
  ])
  const pageInfo = ref({ currentPage: 1, pageSize: 10 })
  const optType = ref<any>(-999)
  const POFIID = ref<any>()
  const Uid = ref<any>()
  const pageOperationRef = ref<InstanceType<typeof PageContent>>()
  const [pageDialogRef, handleShowDialog] = usePageDialog()
  const handleOperationClick = (item: any) => {
    POFIID.value = item.nickId
    Uid.value = item.uid
    optType.value = -999
    handleShowDialog()
    getData({
      uid: item.uid,
      optType: optType.value
    })
  }
  watch(
    () => optType.value,
    () => {
      getData({
        uid: Uid.value,
        optType: optType.value
      })
    }
  )
  const store = useStore()
  const getData = (queryInfo: any) => {
    store.dispatch('payModule/getPageListAction', {
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
    selectList,
    optType,
    POFIID,
    pageInfo,
    dataList,
    dataCount
  ]
}

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
