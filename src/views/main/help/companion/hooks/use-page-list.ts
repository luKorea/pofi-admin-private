/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-06 15:04:15
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/help/companion/hooks/use-page-list.ts
 */
import { ref, watchEffect, computed } from 'vue'
import { usePageLanguage } from '@/hooks/use-page-language'

export function useSetLanguage() {
  const requiredField = ref<any>(['title'])
  const infoId = ref<string>('languageId')
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
      bgUrl: '',
      bgList: [],
      fileUrl: '',
      fileList: []
    },
    infoId.value
  )
  // 用户默认选中的语言
  const languageItem = computed(() => {
    return languageList.value.find(
      (item: any) => item.languageId === languageId.value
    )
  })
  watchEffect(() => {
    if (languageItem.value) {
      mapItemIcon(requiredField.value, languageItem.value, infoId.value)
    }
  })
  // 改变多语言
  const handleChangeLanguage = (id: any) => {
    languageId.value = id
  }
  return [
    languageList,
    languageId,
    resetLanguageList,
    languageBtnList,
    languageItem,
    handleChangeLanguage,
    requiredField,
    infoId,
    mapIconState
  ]
}
export function useStoreName() {
  const storeTypeInfo = ref({
    actionName: 'helpCompanionModule/getPageListAction',
    actionListName: 'helpCompanionModule/pageListData',
    actionCountName: 'helpCompanionModule/pageListCount',
    deleteAction: 'helpCompanionModule/deletePageDataAction',
    sortAction: 'helpCompanionModule/sortPageDataAction'
  })
  const operationName = ref({
    editName: 'helpCompanionModule/editPageDataAction',
    createName: 'helpCompanionModule/createPageDataAction'
  })
  return [storeTypeInfo, operationName]
}

export function useImageUpload() {
  // 上传操作
  const imgLimit = ref(1)
  const imgList = ref<any>([])
  return [imgLimit, imgList]
}

export function useVideoUpload() {
  // 上传操作
  const videoLimit = ref(1)
  const videoList = ref<any>([])
  return [videoLimit, videoList]
}
