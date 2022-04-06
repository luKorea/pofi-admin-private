/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-06 14:59:32
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/language/hooks/use-page-list.ts
 */
import { errorTip } from '@/utils/tip-info'
import { ref, computed, nextTick, watchEffect } from 'vue'
import { getCommonSelectList } from '@/service/common'
import { usePageLanguage } from '@/hooks/use-page-language'

export function useSetLanguage() {
  const editorRef = ref<any>()
  const requiredField = ref<any>(['title', 'answer'])
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
      answer: ''
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

export function usePageList() {
  const questionTypeList = ref<any>([])
  const getQuestionTypeList = () => {
    getCommonSelectList('questionType').then((res) => {
      if (res.state) {
        questionTypeList.value = res.data
      } else errorTip(res.msg)
    })
  }
  getQuestionTypeList()
  return [questionTypeList]
}

export function useStoreName() {
  const storeTypeInfo = ref({
    actionName: 'helpQuestionModule/getPageListAction',
    actionListName: 'helpQuestionModule/pageListData',
    actionCountName: 'helpQuestionModule/pageListCount',
    deleteAction: 'helpQuestionModule/deletePageDataAction',
    sortAction: 'helpQuestionModule/sortPageDataAction'
  })
  const operationName = ref({
    editName: 'helpQuestionModule/editPageDataAction',
    createName: 'helpQuestionModule/createPageDataAction'
  })
  return [storeTypeInfo, operationName]
}

export function useImageUpload() {
  // 上传操作
  const imgLimit = ref(1)
  const imgList = ref<any>([])
  return [imgLimit, imgList]
}
