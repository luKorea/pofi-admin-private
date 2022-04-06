/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-06 15:11:47
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/language/hooks/use-page-list.ts
 */
import { errorTip } from '@/utils/tip-info'
import { ref, computed, nextTick, watchEffect } from 'vue'
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
  const editorRef = ref<any>()
  const requiredField = ref<any>(['name', 'desc', 'subTitle'])
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
      subTitle: '',
      desc: '',
      url: [],
      icon: ''
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
  const keyTypeList = ref<any>([])
  const getKeyTypeList = () => {
    getCommonSelectList('keywords').then((res) => {
      if (res.state) {
        keyTypeList.value.push(...res.data)
      } else errorTip(res.msg)
    })
  }
  const countryList = ref<any>([])
  const getCountryList = () => {
    getCommonSelectList('country').then((res) => {
      if (res.state) {
        countryList.value.push(
          {
            name: '全选',
            id: -1
          },
          ...res.data.rows
        )
      } else errorTip(res.msg)
    })
  }
  getCountryList()
  getKeyTypeList()
  return [keyTypeList, countryList]
}

export function useStoreName() {
  const storeTypeInfo = ref({
    actionName: 'resourceSeriesModule/getPageListAction',
    actionListName: 'resourceSeriesModule/pageListData',
    actionCountName: 'resourceSeriesModule/pageListCount',
    deleteAction: 'resourceSeriesModule/deletePageDataAction'
  })
  const operationName = ref({
    editName: 'resourceSeriesModule/editPageDataAction',
    createName: 'resourceSeriesModule/createPageDataAction'
  })
  return [storeTypeInfo, operationName]
}

export function useImageUpload() {
  // 上传操作
  const imgLimit = ref(1)
  const imgList = ref<any>([])
  return [imgLimit, imgList]
}
