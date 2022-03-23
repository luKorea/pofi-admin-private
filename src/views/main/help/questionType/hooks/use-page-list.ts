/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-23 11:54:33
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/language/hooks/use-page-list.ts
 */
import { errorTip } from '@/utils/tip-info'
import { ref, computed } from 'vue'
import { getCommonSelectList } from '@/service/common'
import { usePageLanguage } from '@/hooks/use-page-language'
import { mapObjectIsNull } from '@/utils'
import { warnTip } from '@/utils/tip-info'
export function useSetLanguage() {
  const [languageList, languageId, resetLanguageList, languageBtnList] =
    usePageLanguage(
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
  const functionTypeList = ref<any>([])
  // 国家地区
  const countryList = ref<any>([])
  const getFunctionTypeList = () => {
    getCommonSelectList('functionType').then((res) => {
      if (res.state) {
        functionTypeList.value = res.data
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
  getFunctionTypeList()
  getCountryList()
  return [functionTypeList, countryList]
}

export function useStoreName() {
  const storeTypeInfo = ref({
    actionName: 'helpQuestionTypeModule/getPageListAction',
    actionListName: 'helpQuestionTypeModule/pageListData',
    actionCountName: 'helpQuestionTypeModule/pageListCount',
    deleteAction: 'helpQuestionTypeModule/deletePageDataAction',
    sortAction: 'helpQuestionTypeModule/sortPageDataAction'
  })
  const operationName = ref({
    editName: 'helpQuestionTypeModule/editPageDataAction',
    createName: 'helpQuestionTypeModule/createPageDataAction'
  })
  return [storeTypeInfo, operationName]
}

export function useImageUpload() {
  // 上传操作
  const imgLimit = ref(1)
  const imgList = ref<any>([])
  return [imgLimit, imgList]
}
