/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-16 14:41:10
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/pay/hooks/use-page-list.ts
 */
import { ref, watch, computed } from 'vue'
import PageContent from '@/components/page-content'

import { usePageDialog } from '@/hooks/use-page-dialog'
import { useStore } from '@/store'
import { getCommonSelectList } from '@/service/common'
import { searchFormConfig } from '../config/search.config'
import { modalConfig } from '../config/modal.config'
import {
  memberStateList,
  realNameList,
  accountTypeList
} from '@/utils/select-list/map-resource-list'

export function useMapSearchFormConfigData() {
  const [userTypeList, countryList, regList] = useGetUserType()
  const searchFormConfigRef = computed(() => {
    const pro = searchFormConfig.formItems.find(
      (item) => item.field === 'proState'
    )
    pro!.options = memberStateList
    const plus = searchFormConfig.formItems.find(
      (item: any) => item.field === 'plusState'
    )
    plus!.options = memberStateList
    const real = searchFormConfig.formItems.find(
      (item: any) => item.field === 'real'
    )
    real!.options = realNameList
    const markId = searchFormConfig.formItems.find(
      (item: any) => item.field === 'markId'
    )
    markId!.options = userTypeList.value.map((item: any) => {
      return {
        title: item.dec,
        value: item.type
      }
    })
    const areasId = searchFormConfig.formItems.find(
      (item: any) => item.field === 'areasId'
    )
    areasId!.options = countryList.value.map((item: any) => ({
      title: item.name,
      value: item.id
    }))
    const accountStatus = searchFormConfig.formItems.find(
      (item: any) => item.field === 'accountStatus'
    )
    accountStatus!.options = accountTypeList
    const register = searchFormConfig.formItems.find(
      (item: any) => item.field === 'register'
    )
    register!.options = regList.value.map((item: any) => ({
      title: item.dec,
      value: item.type
    }))
    return searchFormConfig
  })
  const modalConfigRef = computed(() => {
    return modalConfig
  })
  return {
    searchFormConfigRef,
    modalConfigRef
  }
}

// 获取用户特殊标记
export function useGetUserType() {
  const userTypeList = ref<any>([])
  const countryList = ref<any>([])
  const regList = ref<any>([])
  const getType = () => {
    getCommonSelectList('mark').then((res: any) => {
      if (res.result === 0) {
        userTypeList.value = res.data
      }
    })
  }
  const getCountry = () => {
    getCommonSelectList('country').then((res: any) => {
      if (res.result === 0) {
        countryList.value.push(...res.data.rows)
      }
    })
  }
  getCommonSelectList('reg').then((res: any) => {
    if (res.result === 0) {
      regList.value = res.data
    }
  })
  getType()
  getCountry()
  return [userTypeList, countryList, regList]
}

// 编辑VIP
export function useVIPData() {
  const vipPageInfo = ref({ currentPage: 1, pageSize: 10 })
  const nickId = ref()
  const vipUseId = ref<any>()
  const handleVIPClick = (item: any, pageVip: any) => {
    if (pageVip) {
      pageVip.pageVipRef.dialogVisible = true
    }
    nickId.value = item.nickId
    vipUseId.value = item.uid
    sessionStorage.setItem('tempNickId', item.nickId)
    getData({
      nickId: item.nickId
    })
  }
  const store = useStore()
  const getData = (queryInfo: any) => {
    store.dispatch('purseModule/getPageListAction', {
      pageName: 'vip',
      queryInfo: {
        currentPage: vipPageInfo.value.currentPage,
        pageSize: vipPageInfo.value.pageSize,
        ...queryInfo
      }
    })
  }
  watch(vipPageInfo, () =>
    getData({
      nickId: nickId.value
    })
  )
  const vipList = computed(() => {
    return store.getters['purseModule/pageListData']('vip')
  })
  const vipCount = computed(() => {
    return store.getters['purseModule/pageListCount']('vip')
  })
  return [handleVIPClick, vipPageInfo, vipList, vipCount, nickId, vipUseId]
}

// 操作日志
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
  const UID = ref<any>()
  watch(pageInfo, () =>
    getData({
      uid: UID.value,
      optType: optType.value
    })
  )
  const pageOperationRef = ref<InstanceType<typeof PageContent>>()
  const [pageDialogRef, handleShowDialog] = usePageDialog()
  const handleOperationClick = (item: any) => {
    POFIID.value = item.nickId
    UID.value = item.uid
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
        uid: UID.value,
        optType: optType.value
      })
    }
  )
  const store = useStore()
  const getData = (queryInfo: any) => {
    store.dispatch('purseModule/getPageListAction', {
      pageName: 'log',
      queryInfo: {
        currentPage: pageInfo.value.currentPage,
        pageSize: pageInfo.value.pageSize,
        ...queryInfo
      }
    })
  }
  const dataList = computed(() => {
    return store.getters['purseModule/pageListData']('log')
  })
  const dataCount = computed(() => {
    return store.getters['purseModule/pageListCount']('log')
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
    dataCount,
    UID
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
    actionName: 'purseModule/getPageListAction',
    actionListName: 'purseModule/pageListData',
    actionCountName: 'purseModule/pageListCount',
    deleteAction: 'purseModule/deletePageDataAction'
  })
  const operationName = ref({
    editName: 'purseModule/editPageDataAction',
    createName: 'purseModule/createPageDataAction'
  })
  return [storeTypeInfo, operationName]
}
