/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-06 15:13:39
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
  const requiredField = ref<any>(['name'])
  const [
    languageList,
    languageId,
    resetLanguageList,
    languageBtnList,
    mapIconState,
    mapItemIcon
  ] = usePageLanguage(
    {
      name: '',
      desc: ''
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
    mapIconState
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
    actionName: 'resourceClassifyModule/getPageListAction',
    actionListName: 'resourceClassifyModule/pageListData',
    actionCountName: 'resourceClassifyModule/pageListCount',
    deleteAction: 'resourceClassifyModule/deletePageDataAction'
  })
  const operationName = ref({
    editName: 'resourceClassifyModule/editPageDataAction',
    createName: 'resourceClassifyModule/createPageDataAction'
  })
  return [storeTypeInfo, operationName]
}

export function useImageUpload() {
  // 上传操作
  const imgLimit = ref(1)
  const imgList = ref<any>([])
  return [imgLimit, imgList]
}
