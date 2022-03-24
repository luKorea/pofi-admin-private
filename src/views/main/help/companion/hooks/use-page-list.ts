/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-24 10:58:29
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/help/companion/hooks/use-page-list.ts
 */
import { ref, computed } from 'vue'
import { usePageLanguage } from '@/hooks/use-page-language'
import { mapObjectIsNull } from '@/utils'
import { warnTip } from '@/utils/tip-info'

export function useSetLanguage() {
  const [languageList, languageId, resetLanguageList, languageBtnList] =
    usePageLanguage(
      {
        title: '',
        bgUrl: '',
        bgList: [],
        fileUrl: '',
        fileList: []
      },
      'languageId'
    )
  const languageItem = computed(() => {
    return languageList.value.find(
      (item: any) => item.languageId === languageId.value
    )
  })
  console.log(languageItem.value, 'la')
  // 改变多语言
  const handleChangeLanguage = (id: any) => {
    if (mapObjectIsNull(['title'], languageItem.value)) {
      languageId.value = id
    } else warnTip('请确保多语言配置中带*号的字段已经填写')
  }

  return [
    languageList,
    languageId,
    resetLanguageList,
    languageBtnList,
    languageItem,
    handleChangeLanguage
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
