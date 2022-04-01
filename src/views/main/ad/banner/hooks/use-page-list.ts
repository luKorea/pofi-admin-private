/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-15 09:56:08
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/head/hooks/use-page-list.ts
 */
import { errorTip } from '@/utils/tip-info'
import { ref, computed, watchEffect, nextTick } from 'vue'
import { getCommonSelectList } from '@/service/common'
import { searchFormConfig } from '../config/search.config'
import { modalConfig } from '../config/modal.config'
import { libraryList } from '@/utils/select-list/map-resource-list'
import { usePageLanguage } from '@/hooks/use-page-language'
import { mapSelectListTitle } from '@/utils'

export function useSetLanguage() {
  const editorRef = ref<any>()
  const [languageList, languageId, resetLanguageList, languageBtnList] =
    usePageLanguage({
      value: '',
      title: '',
      subTitle: '',
      img: [],
      icon: ''
    })
  const languageItem = computed(() => {
    return languageList.value.find(
      (item: any) => item.languageId === languageId.value
    )
  })
  // 改变多语言
  const handleChangeLanguage = async (id: any) => {
    languageId.value = id
    await nextTick()
    editorRef.value.setEditorValue()
    // if (mapObjectIsNull(['value'], languageItem.value)) {
    //   languageId.value = id
    //   await nextTick()
    //   editorRef.value.setEditorValue()
    // } else warnTip('请确保多语言配置中带*号的字段已经填写')
  }

  return [
    editorRef,
    languageList,
    languageId,
    resetLanguageList,
    languageBtnList,
    languageItem,
    handleChangeLanguage
  ]
}

// 国家下拉
export function useCountrySelect() {
  const [countryList] = usePageList()
  const otherInfo = ref<any>()
  const areaIds = ref<any>([])
  const handleChangeCountry = (item: any) => {
    otherInfo.value = {
      ...otherInfo.value,
      areaIds: item.toString()
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
// 映射表单数据
export function useMapFormData() {
  // 筛选
  const searchFormConfigRef = computed(() => {
    const libraryItem = searchFormConfig.formItems.find(
      (item: any) => item.field === 'library'
    )
    libraryItem!.options = libraryList
    return searchFormConfig
  })
  // 表单
  const modalConfigRef = computed(() => {
    const libraryItem = modalConfig.formItems.find(
      (item: any) => item.field === 'library'
    )
    libraryItem!.options = libraryList
    return modalConfig
  })
  const mapTitle = (type: any) => {
    return mapSelectListTitle(type, libraryList)
  }
  return {
    searchFormConfigRef,
    modalConfigRef,
    modalConfig,
    mapTitle
  }
}

export function usePageList() {
  const countryList = ref<any>([])
  const jumpList = ref<any>([])
  // 指南。系列，问题,VIP类型
  const otherList = ref<any>({
    guideList: [],
    seriesList: [],
    questionList: [],
    vipList: [
      {
        value: 0,
        title: 'Free'
      },
      {
        value: 1,
        title: 'Pro'
      },
      {
        value: 2,
        title: 'Plus'
      }
    ]
  })
  const getOtherList = () => {
    getCommonSelectList('jumpOtherType').then((res) => {
      if (res.state) {
        const data = res.data
        otherList.value!.guideList = data!.guideList
        otherList.value!.seriesList = data!.seriesList
        otherList.value!.questionList = data!.qaList
      } else errorTip(res.msg)
    })
  }
  const getCountryList = () => {
    getCommonSelectList('country').then((res) => {
      if (res.state) {
        countryList.value.push(...res.data.rows)
      } else errorTip(res.msg)
    })
  }
  const getJumpList = () => {
    getCommonSelectList('jumpType').then((res) => {
      if (res.state) {
        let result = res.data as any[]
        result = result.filter((item: any) => item.type !== -999)
        jumpList.value = result
      } else errorTip(res.msg)
    })
  }
  getCountryList()
  getJumpList()
  getOtherList()
  return [countryList, jumpList, otherList]
}

export function useStoreName() {
  const storeTypeInfo = ref({
    actionName: 'advertisementBannerModule/getPageListAction',
    actionListName: 'advertisementBannerModule/pageListData',
    actionCountName: 'advertisementBannerModule/pageListCount',
    deleteAction: 'advertisementBannerModule/deletePageDataAction',
    sortAction: 'advertisementBannerModule/sortPageDataAction'
  })
  const operationName = ref({
    editName: 'advertisementBannerModule/editPageDataAction',
    createName: 'advertisementBannerModule/createPageDataAction'
  })
  return [storeTypeInfo, operationName]
}

export function useImageUpload() {
  // 上传操作
  const imgLimit = ref(1)
  const imgList = ref<any>([])
  const effectImgList = ref<any>([])
  return [imgLimit, imgList, effectImgList]
}
