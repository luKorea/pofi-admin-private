/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-23 11:29:38
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/language/hooks/use-page-list.ts
 */
import { errorTip, warnTip } from '@/utils/tip-info'
import { ref, computed, nextTick } from 'vue'
import { getCommonSelectList } from '@/service/common'
import { usePageLanguage } from '@/hooks/use-page-language'
import { mapObjectIsNull } from '@/utils'

export function useSetLanguage() {
  const editorRef = ref<any>()
  const [languageList, languageId, resetLanguageList, languageBtnList] =
    usePageLanguage(
      {
        name: '',
        desc: ''
      },
      'lid'
    )
  const languageItem = computed(() => {
    return languageList.value.find((item: any) => item.lid === languageId.value)
  })
  console.log(languageItem.value, 'la')
  // 改变多语言
  const handleChangeLanguage = async (id: any) => {
    if (mapObjectIsNull(['name'], languageItem.value)) {
      languageId.value = id
      await nextTick()
      editorRef.value.setEditorValue()
    } else warnTip('请确保多语言配置中带*号的字段已经填写')
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
