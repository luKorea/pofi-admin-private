/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-06 14:45:53
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/language/hooks/use-page-list.ts
 */
import { errorTip } from '@/utils/tip-info'
import { ref, computed, watchEffect } from 'vue'
import { getCommonSelectList } from '@/service/common'
import { usePageLanguage } from '@/hooks/use-page-language'
import { getSelectTitle } from '@/service/main/resource/classify'
export function useMapSelectTitle(id: any) {
  const name = ref<string>('')
  getSelectTitle(id).then((res) => {
    console.log(res)
  })
  return [name]
}

export function useSetLanguage() {
  const requiredField = ref<any>(['title', 'desc'])
  const [
    languageList,
    languageId,
    resetLanguageList,
    languageBtnList,
    mapIconState,
    mapItemIcon
  ] = usePageLanguage(
    {
      title: undefined,
      desc: undefined,
      tips: undefined,
      proTag: undefined,
      plusTag: undefined,
      url: undefined,
      icon: []
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
    if (languageItem.value) {
      mapItemIcon(requiredField.value, languageItem.value)
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
    mapIconState,
    requiredField
  ]
}

export function usePageList() {
  const typeList = ref<any>([])
  getCommonSelectList('functionType').then((res) => {
    if (res.state) {
      typeList.value = res.data
    } else errorTip(res.msg)
  })
  return [typeList]
}

export function useStoreName() {
  const storeTypeInfo = ref({
    actionName: 'helpFunctionModule/getPageListAction',
    actionListName: 'helpFunctionModule/pageListData',
    actionCountName: 'helpFunctionModule/pageListCount',
    deleteAction: 'helpFunctionModule/deletePageDataAction',
    sortAction: 'helpFunctionModule/sortPageDataAction'
  })
  const operationName = ref({
    editName: 'helpFunctionModule/editPageDataAction',
    createName: 'helpFunctionModule/createPageDataAction'
  })
  return [storeTypeInfo, operationName]
}

export function useImageUpload() {
  // 上传操作
  const imgLimit = ref(1)
  const imgList = ref<any>([])
  return [imgLimit, imgList]
}
