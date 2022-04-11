/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-11 17:30:01
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/device/imei/hooks/use-page-list.ts
 */
import { ref, computed, watchEffect } from 'vue'
import { mapSelectListTitle } from '@/utils'
import {
  resourceTypeList,
  resourceConditionList,
  resourceValueList,
  resourceFileList,
  unityModalList,
  deviceLevelList,
  resourceFunction,
  resourceFeature,
  functionExclusiveUseConditionsList
} from '@/utils/select-list/map-resource-list'
import { searchFormConfig } from '../config/search.config'
import { modalConfig } from '../config/modal.config'
import { getCommonSelectList } from '@/service/common'
import { errorTip } from '@/utils/tip-info'

// 区分新增，编辑模态框展示，编辑时显示不同模态框
export function useMapDifferentModal() {
  const modalType = ref<any>([
    { type: 'property', title: '类型属性' },
    { type: 'resource', title: '资源资料' },
    { type: 'u3d', title: 'U3D文件' },
    { type: 'relevance', title: '相关关联' },
    { type: 'timer', title: '时间状态' }
  ])

  return [modalType]
}
// 初始化类型属性数据
export function useMapPropertyData() {
  const { resourceCenterList, countryList, seriesList } = usePageList()
  console.log(seriesList.value)
  const propertyModalConfig = computed(() => {
    modalConfig.formItems.map((item: any) => {
      if (item.field === 'moType') item.options = resourceTypeList
      if (item.field === 'u3dType')
        item!.options = unityModalList.filter((i: any) => i.value !== undefined)
      if (item.field === 'device') item!.options = deviceLevelList
      if (item.field === 'resourceType')
        item!.options = resourceCenterList.value
      if (item.field === 'resourceFileType') item!.options = resourceFileList
      if (item.field === 'funcList') item!.options = resourceFunction
      if (item.field === 'spList') item!.options = resourceFeature
      if (item.field === 'open') item!.options = resourceConditionList
      if (item.field === 'areaIds') item!.options = countryList.value
      if (item.field === 'msId') item!.options = seriesList.value
    })
    return modalConfig
  })

  return {
    propertyModalConfig,
    resourceFeature,
    functionExclusiveUseConditionsList,
    countryList
  }
}

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
  // 时间状态
  const timerRef = ref<any>()
  const openProcessDialog = () => {
    if (processRef.value) {
      processRef.value.pageProcessRef.dialogVisible = true
    }
  }
  // 格式化下拉数据
  const mapTitle = (value: number, list: any[]) => {
    return mapSelectListTitle(value, list)
  }
  return [processRef, openProcessDialog, mapTitle, timerRef]
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

// 下拉数据
export function usePageList() {
  const resourceCenterList = ref<any>()
  const countryList = ref<any>([
    {
      title: '全部',
      value: -1
    }
  ])
  const seriesList = ref<any>()
  const goodsList = ref<any>()
  getCommonSelectList('resourceCenterType').then((res) => {
    if (res.result === 0) {
      resourceCenterList.value = res.data.map((item: any) => {
        return {
          title: item.dec,
          value: item.type
        }
      })
    } else errorTip(res.msg)
  })
  getCommonSelectList('country').then((res) => {
    if (res.result === 0) {
      countryList.value.push(
        ...res.data.rows.map((item: any) => ({
          title: item.name,
          value: item.id
        }))
      )
    } else errorTip(res.msg)
  })

  getCommonSelectList('seriesType').then((res) => {
    if (res.result === 0) {
      seriesList.value = res.data
    } else errorTip(res.msg)
  })
  getCommonSelectList('goodsType').then((res) => {
    if (res.result === 0) {
      goodsList.value = res.data.map((item: any) => {
        return {
          title: item.name,
          value: item.snId
        }
      })
    } else errorTip(res.msg)
  })
  return {
    resourceCenterList,
    countryList,
    seriesList,
    goodsList
  }
}

// 国家下拉
export function useCountrySelect() {
  const { countryList } = usePageList()
  const otherInfo = ref<any>({
    spList: [], // 资源特色
    vipList: [] // 功能专属使用
  })
  const areaIds = ref<any>([])
  const handleChangeCountry = (item: any[]) => {
    const all: any[] = []
    const check = item.find((i: any) => i === -1)
    if (check === -1) {
      countryList.value
        .filter((i: any) => i.value !== -1)
        .forEach((item: any) => {
          all.push(item.value)
        })
      otherInfo.value = {
        ...otherInfo.value,
        areaIds: all.toString()
      }
      areaIds.value = all
    } else {
      otherInfo.value = {
        ...otherInfo.value,
        areaIds: item.toString()
      }
    }
  }
  // 判断用户是否有选择地区，没有的话将下拉数据循环并发送到后台
  watchEffect(() => {
    if (areaIds.value.length === 0) {
      const region: any[] = []
      countryList.value.forEach((item: any) => {
        region.push(item.id)
      })
      otherInfo.value = {
        ...otherInfo.value,
        areaIds: region.toString()
      }
    }
  })
  return [otherInfo, areaIds, handleChangeCountry]
}
