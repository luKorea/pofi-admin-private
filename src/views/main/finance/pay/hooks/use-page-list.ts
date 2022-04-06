/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-06 17:03:11
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/pay/hooks/use-page-list.ts
 */
import { ref, watch, computed } from 'vue'
import PageContent from '@/components/page-content'

import { usePageDialog } from '@/hooks/use-page-dialog'
import { useStore } from '@/store'
import { modalConfig } from '../config/modal.config'
import { searchFormConfig } from '../config/search.config'
import { mapSelectListTitle } from '@/utils'
import {
  orderTypeList,
  payTypeList,
  realNameList,
  accountTypeList
} from '@/utils/select-list/map-resource-list'
import { getCommonSelectList } from '@/service/common'
export function useMapFormConfigData() {
  const [userTypeList, countryList, regList] = useGetUserType()
  const searchFormConfigRef = computed(() => {
    // const real = searchFormConfig.formItems.find(
    //   (item: any) => item.field === 'real'
    // )
    // real!.options = realNameList
    const markId = searchFormConfig.formItems.find(
      (item: any) => item.field === 'markId'
    )
    markId!.options = userTypeList.value.map((item: any) => {
      return {
        title: item.dec,
        value: item.type
      }
    })
    // const areasId = searchFormConfig.formItems.find(
    //   (item: any) => item.field === 'areasId'
    // )
    // areasId!.options = countryList.value.map((item: any) => ({
    //   title: item.name,
    //   value: item.id
    // }))
    // const accountStatus = searchFormConfig.formItems.find(
    //   (item: any) => item.field === 'accountStatus'
    // )
    // accountStatus!.options = accountTypeList
    // const register = searchFormConfig.formItems.find(
    //   (item: any) => item.field === 'register'
    // )
    // register!.options = regList.value.map((item: any) => ({
    //   title: item.dec,
    //   value: item.type
    // }))
    const order = searchFormConfig.formItems.find(
      (item: any) => item.field === 'state'
    )
    order!.options = orderTypeList
    const way = searchFormConfig.formItems.find(
      (item: any) => item.field === 'way'
    )
    way!.options = payTypeList
    return searchFormConfig
  })
  const modalConfigRef = computed(() => {
    const order = modalConfig.formItems.find(
      (item: any) => item.field === 'state'
    )
    order!.options = orderTypeList
    modalConfig.formItems.map((item: any) => {
      item.otherOptions = {}
      item.otherOptions['disabled'] = false
      if (item.field === 'remark' || item.field === 'state') {
        item.otherOptions['disabled'] = false
      } else item.otherOptions['disabled'] = true
    })
    return modalConfig
  })
  const mapOrderState = (type: any) => {
    return mapSelectListTitle(type, orderTypeList)
  }
  const mapPay = (type: any) => {
    return mapSelectListTitle(type, payTypeList)
  }
  return {
    searchFormConfigRef,
    modalConfigRef,
    modalConfig,
    mapOrderState,
    mapPay
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
    return store.getters['payModule/pageListData']('log')
  })
  const dataCount = computed(() => {
    return store.getters['payModule/pageListCount']('log')
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
