/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-23 15:31:46
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/language/hooks/use-page-list.ts
 */
import { errorTip } from '@/utils/tip-info'
import { ref, computed } from 'vue'
import { getCommonSelectList } from '@/service/common'
import { usePageLanguage } from '@/hooks/use-page-language'
import { getSelectTitle } from '@/service/main/resource/classify'
import { mapObjectIsNull } from '@/utils'
import { warnTip } from '@/utils/tip-info'
export function useMapSelectTitle(id: any) {
  const name = ref<string>('')
  getSelectTitle(id).then((res) => {
    console.log(res)
  })
  return [name]
}

export function useSetLanguage() {
  const [languageList, languageId, resetLanguageList, languageBtnList] =
    usePageLanguage(
      {
        title: '',
        desc: '',
        tips: '',
        proTag: '',
        plusTag: '',
        url: '',
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
  // 改变多语言
  const handleChangeLanguage = (id: any) => {
    if (mapObjectIsNull(['name', 'subTitle', 'desc'], languageItem.value)) {
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
