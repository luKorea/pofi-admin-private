/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-31 10:55:11
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/device/imei/hooks/use-page-list.ts
 */
import { ref, computed, watchEffect, nextTick } from 'vue'
import { mapSelectListTitle } from '@/utils'
import {
  resourceTypeList,
  resourceConditionList,
  resourceValueList,
  resourceFileList,
  resourceTypeListCenter,
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
import { usePageLanguage } from '@/hooks/use-page-language'

export const resourceCenterList = ref<any>()
export const countryList = ref<any>()
export const seriesList = ref<any>()
export const goodsList = ref<any>()
export const otherList = ref<any>()
export const classifyList = ref<any>()
export const prpeList = ref<any>()
// let list: any[] = []
// getCommonSelectList('resourceCenterType').then((res) => {
//   if (res.result === 0) {
//     list = res.data.map((item: any) => {
//       return {
//         value: item.type,
//         title: item.dec
//       }
//     })
//   }
// })
export function usePageList() {
  const getOther = () => {
    getCommonSelectList('prpeType').then((res) => {
      if (res.result === 0) {
        prpeList.value = res.data
      } else errorTip(res.msg)
    })
    getCommonSelectList('classifyType').then((res) => {
      if (res.result === 0) {
        classifyList.value = res.data
      } else errorTip(res.msg)
    })
    getCommonSelectList('otherKeyType').then((res) => {
      if (res.result === 0) {
        otherList.value = res.data
      } else errorTip(res.msg)
    })
  }
  const getCity = () => {
    getCommonSelectList('country').then((res) => {
      if (res.result === 0) {
        countryList.value = [
          {
            title: '??????',
            value: -1
          },
          ...res.data.rows.map((item: any) => ({
            title: item.name,
            value: item.id
          }))
        ]
      } else errorTip(res.msg)
    })
  }
  const getResource = () => {
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
  }
  const getSeries = () => {
    getCommonSelectList('seriesType').then((res) => {
      if (res.result === 0) {
        seriesList.value = res.data
      } else errorTip(res.msg)
    })
  }
  const getGoods = () => {
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
  }
  Promise.allSettled([
    getOther(),
    getCity(),
    getGoods(),
    getResource(),
    getSeries()
  ])
}

usePageList()
// ?????????????????????????????????????????????????????????????????????
export function useMapDifferentModal() {
  const modalType = ref<any>([
    { type: 'property', title: '????????????' },
    { type: 'resource', title: '????????????' },
    { type: 'u3d', title: 'U3D??????' },
    { type: 'relevance', title: '????????????' },
    { type: 'timer', title: '????????????' }
  ])

  return [modalType]
}
// ???????????????????????????
export function useMapPropertyData() {
  const propertyModalConfig = computed(() => {
    modalConfig.formItems.map((item: any) => {
      if (item.field === 'moType') item.options = resourceTypeListCenter
      if (item.field === 'unityType')
        item!.options = unityModalList.filter((i: any) => i.value !== undefined)
      if (item.field === 'device') item!.options = deviceLevelList
      if (item.field === 'resourceType')
        item!.options = resourceCenterList.value
      if (item.field === 'resourceFileType') item!.options = resourceFileList
      if (item.field === 'keyFunc') item!.options = resourceFunction
      // if (item.field === 'spList') item!.options = resourceFeature
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

// ????????????????????????
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
  // ???????????????
  const processRef = ref<any>()
  // ????????????
  const timerRef = ref<any>()
  const openProcessDialog = () => {
    if (processRef.value) {
      processRef.value.pageProcessRef.dialogVisible = true
    }
  }
  // ?????????????????????
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
// ????????????
export function useCountrySelect(editType: string) {
  const otherInfo = ref<any>({
    specialIcon: [], // ????????????
    vipInt: [] // ??????????????????
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
  // ???????????????????????????????????????????????????????????????????????????????????????
  watchEffect(() => {
    otherInfo.value = {
      ...otherInfo.value
    }
    if (areaIds.value.length === 0 && countryList.value) {
      const region: any[] = []
      countryList.value
        .filter((i: any) => i.value !== -1)
        .forEach((item: any) => {
          region.push(item.value)
        })
      otherInfo.value = {
        ...otherInfo.value,
        areaIds: region.toString()
      }
    }
    if (otherInfo.value.areaIds) {
      areaIds.value = otherInfo.value.areaIds.split(',').map((i: any) => +i)
    }
  })
  return [otherInfo, areaIds, handleChangeCountry]
}

// ???????????????????????????
export function useSetLanguage() {
  const editorRef = ref<any>()
  const requiredField = ref<any>([
    'name',
    'intro',
    'summary',
    'cover',
    'labelA',
    'b0' // ??????????????????
    // 'gift'
  ])
  const [
    languageList,
    languageId,
    resetLanguageList,
    languageBtnList,
    mapIconState,
    mapItemIcon
  ] = usePageLanguage(
    {
      name: '', //???????????? ??????
      intro: '', //???????????? ??????
      summary: '', //???????????? ??????
      info: '', //???????????? ??????
      labelA: '', //???????????? ??????
      labelB: '', //??????????????????
      showLabel: '', //d0??????
      precision: '', //????????????
      side: '', //????????????
      // ????????????
      gift: '', //??????a0-gif(??????)
      giftList: [],
      cover: '', //????????? ??????
      coverList: [],
      // ????????????
      b0List: [], //b0???(list) ??????
      b0: [],
      c0List: [], //c0???(list),
      c0: [],
      d0List: [], //d0???(list)
      d0: []
    },
    'lid'
  )
  // eslint-disable-next-line vue/return-in-computed-property
  const languageItem = computed(() => {
    if (languageList.value.length > 0) {
      return languageList.value.find(
        (item: any) => item.lid === languageId.value
      )
    } else resetLanguageList()
  })
  watchEffect(() => {
    mapIconState(languageList.value, requiredField.value)
    if (languageItem.value) {
      mapItemIcon(requiredField.value, languageItem.value)
    }
  })
  // ???????????????
  const handleChangeLanguage = async (id: any) => {
    languageId.value = id
    await nextTick()
    editorRef.value.setEditorValue()
  }
  return {
    editorRef,
    languageList,
    languageId,
    resetLanguageList,
    languageBtnList,
    languageItem,
    handleChangeLanguage,
    requiredField,
    mapIconState
  } as any
}
