/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-04 15:47:29
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/language/hooks/use-page-list.ts
 */
import { errorTip } from '@/utils/tip-info'
import { ref, computed, watchEffect, nextTick } from 'vue'
import { getCommonSelectList } from '@/service/common'
import { usePageLanguage } from '@/hooks/use-page-language'
import { searchFormConfig } from '../config/search.config'
import { modalConfig } from '../config/modal.config'
import { painterTopicList } from '@/utils/select-list/map-resource-list'

// 国家下拉
export function useCountrySelect() {
  const [, , otherFieldList] = useMapField()
  const otherInfo = ref<any>({
    coverList: []
  })
  const areaIds = ref<any>([])
  const handleChangeCountry = (item: any[]) => {
    const all: any[] = []
    const check = item.find((i: any) => i === -1)
    if (check === -1) {
      otherFieldList.value.countryList
        .filter((i: any) => i.id !== -1)
        .forEach((item: any) => {
          all.push(item.id)
        })
      otherInfo.value = {
        ...otherInfo.value,
        areaIds: all
      }
      areaIds.value = all
    } else {
      otherInfo.value = {
        ...otherInfo.value,
        areaIds: item
      }
    }
  }
  // 判断用户是否有选择地区，没有的话将下拉数据循环并发送到后台
  watchEffect(() => {
    if (areaIds.value.length === 0) {
      const region: any[] = []
      otherFieldList.value.countryList
        .filter((i: any) => i.id !== -1)
        .forEach((item: any) => {
          region.push(item.id)
        })
      otherInfo.value = {
        ...otherInfo.value,
        areaIds: region
      }
    }
  })
  return [otherInfo, areaIds, handleChangeCountry]
}

export function useMapField() {
  const otherFieldList = ref<any>({
    countryList: [],
    allPainterList: [],
    painterTopicList: []
  })
  getCommonSelectList('country').then((res) => {
    if (res.state) {
      otherFieldList.value.countryList.push(
        {
          name: '全部',
          id: -1
        },
        ...res.data.rows
      )
    } else errorTip(res.msg)
  })
  getCommonSelectList('allPainterAuthor').then((res) => {
    if (!res.result) {
      otherFieldList.value.allPainterList = res.data.map((item: any) => {
        return {
          title: item.name,
          value: item.paid
        }
      })
    }
  })
  getCommonSelectList('painterTopicList', {
    type: 1,
    currentPage: 1,
    pageSize: 100000
  }).then((res) => {
    if (!res.result && res?.data?.rows?.length > 0) {
      otherFieldList.value.painterTopicList = res.data.rows.map((item: any) => {
        return {
          title: item.name,
          value: item.poid,
          ...item
        }
      })
    }
  })
  const searchFormConfigRef = computed(() => {
    const type = searchFormConfig.formItems.find((i) => i.field === 'type')
    type!.options = painterTopicList
    const paid = searchFormConfig.formItems.find((i) => i.field === 'paid')
    paid!.options = otherFieldList.value.allPainterList
    return searchFormConfig
  })
  const modalConfigRef = computed(() => {
    const type = modalConfig.formItems.find((i) => i.field === 'type')
    type!.options = painterTopicList
    return modalConfig
  })

  return [searchFormConfigRef, modalConfigRef, otherFieldList, painterTopicList]
}

export function useSetLanguage() {
  const requiredField = ref<any>(['title'])
  const editorRef = ref<any>()
  const [
    languageList,
    languageId,
    resetLanguageList,
    languageBtnList,
    mapIconState,
    mapItemIcon
  ] = usePageLanguage(
    {
      title: '',
      subtitle: '',
      about: ''
    },
    'lid'
  )
  const languageItem = computed(() => {
    return languageList.value.find((item: any) => item.lid === languageId.value)
  })
  watchEffect(() => {
    if (languageItem.value) {
      mapItemIcon(requiredField.value, languageItem.value)
    }
  })
  // 改变多语言
  const handleChangeLanguage = async (id: any) => {
    languageId.value = id
    await nextTick()
    editorRef.value.setEditorValue()
  }

  return [
    editorRef,
    languageList,
    languageId,
    resetLanguageList,
    languageBtnList,
    languageItem,
    handleChangeLanguage,
    requiredField,
    mapIconState
  ]
}

export function useStoreName() {
  const storeTypeInfo = ref({
    actionName: 'painterTopicModule/getPageListAction',
    actionListName: 'painterTopicModule/pageListData',
    actionCountName: 'painterTopicModule/pageListCount',
    deleteAction: 'painterTopicModule/deletePageDataAction',
    sortAction: 'painterTopicModule/sortPageDataAction'
  })
  const operationName = ref({
    editName: 'painterTopicModule/editPageDataAction',
    createName: 'painterTopicModule/createPageDataAction'
  })
  return [storeTypeInfo, operationName]
}

export function useImageUpload() {
  // 上传操作
  const imgLimit = ref(1)
  const imgList = ref<any>([])
  const imgList1 = ref<any>([])
  return [imgLimit, imgList, imgList1]
}
