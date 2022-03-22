/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-14 14:29:44
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/language/hooks/use-page-list.ts
 */
import { errorTip, warnTip } from '@/utils/tip-info'
import { ref, computed } from 'vue'
import { getCommonSelectList } from '@/service/common'
import { usePageLanguage } from '@/hooks/use-page-language'
import { mapObjectIsNull } from '@/utils'

export function useSetLanguage() {
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
  const handleChangeLanguage = (id: any) => {
    if (mapObjectIsNull(['name'], languageItem.value)) {
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
  const keyTypeList = ref<any>([])
  const getKeyTypeList = () => {
    getCommonSelectList('keywords').then((res) => {
      if (res.state) {
        keyTypeList.value.push(...res.data)
      } else errorTip(res.msg)
    })
  }
  getKeyTypeList()
  return [keyTypeList]
}

export function useStoreName() {
  const storeTypeInfo = ref({
    actionName: 'resourceKeywordModule/getPageListAction',
    actionListName: 'resourceKeywordModule/pageListData',
    actionCountName: 'resourceKeywordModule/pageListCount',
    deleteAction: 'resourceKeywordModule/deletePageDataAction'
  })
  const operationName = ref({
    editName: 'resourceKeywordModule/editPageDataAction',
    createName: 'resourceKeywordModule/createPageDataAction'
  })
  return [storeTypeInfo, operationName]
}

export function useImageUpload() {
  // 上传操作
  const imgLimit = ref(1)
  const imgList = ref<any>([])
  return [imgLimit, imgList]
}
