/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-17 13:54:13
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/pay/hooks/use-page-list.ts
 */
import { ref, watch, computed } from 'vue'
import PageContent from '@/components/page-content'

import { usePageDialog } from '@/hooks/use-page-dialog'
import { useStore } from '@/store'
import { getCommonSelectList } from '@/service/common'

// 动态设置下拉列表的值
export function useMapSelectValue() {
  const regList = ref<any>([])
  const markList = ref<any>([])
  const jobList = ref<any>([])
  const drawList = ref<any>([])
  const countryList = ref<any>([])
  Promise.allSettled([
    getCommonSelectList('reg'),
    getCommonSelectList('mark'),
    getCommonSelectList('job'),
    getCommonSelectList('draw'),
    getCommonSelectList('country')
  ])
    .then((result) => {
      for (let i = 0; i < result.length; i++) {
        if (result[i].status === 'fulfilled') {
          regList.value = (result[0] as any)?.value?.data
          markList.value = (result[1] as any)?.value?.data
          jobList.value = (result[2] as any)?.value?.data
          drawList.value = (result[3] as any)?.value?.data
          countryList.value = (result[4] as any)?.value?.data?.rows
        }
      }
    })
    .catch((err) => {
      console.log(err)
    })
  return [regList, markList, countryList, jobList, drawList]
}
// 上传操作
export function useImageUpload() {
  const imgLimit = ref(1)
  const imgList = ref<any>([])
  return [imgLimit, imgList]
}

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
  watch(pageInfo, () => {
    getData({
      uid: Uid.value,
      optType: optType.value
    })
  })
  const store = useStore()
  const getData = (queryInfo: any) => {
    store.dispatch('userOperationModule/getPageListAction', {
      pageName: 'log',
      queryInfo: {
        currentPage: pageInfo.value.currentPage,
        pageSize: pageInfo.value.pageSize,
        ...queryInfo
      }
    })
  }
  const dataList = computed(() => {
    return store.getters['userOperationModule/pageListData']('log')
  })
  const dataCount = computed(() => {
    return store.getters['userOperationModule/pageListCount']('log')
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

export function useStoreName() {
  const storeTypeInfo = ref({
    actionName: 'userOperationModule/getPageListAction',
    actionListName: 'userOperationModule/pageListData',
    actionCountName: 'userOperationModule/pageListCount',
    deleteAction: 'userOperationModule/deletePageDataAction'
  })
  const operationName = ref({
    editName: 'userOperationModule/editPageDataAction',
    createName: 'userOperationModule/createPageDataAction'
  })
  return [storeTypeInfo, operationName]
}
