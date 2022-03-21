/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-18 16:04:40
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/config/hooks/use-page-list.ts
 */
import { errorTip } from '@/utils/tip-info'
import { ref, computed } from 'vue'
import { getCommonSelectList } from '@/service/common'
import { usePageLanguage } from '@/hooks/use-page-language'

export function usePageList() {
  // 国家地区
  const countryList = ref<any>([])
  // 分组
  const groupList = ref<any>([])
  // 分类
  const classificationList = ref<any>([])
  const getCountryList = () => {
    getCommonSelectList('country').then((res) => {
      if (res.state) {
        countryList.value.push(...res.data.rows)
      } else errorTip(res.msg)
    })
  }
  const getGroupList = () => {
    getCommonSelectList('group').then((res) => {
      if (res.state) {
        groupList.value = res.data
      } else errorTip(res.msg)
    })
  }
  const getClassificationList = () => {
    getCommonSelectList('classification').then((res) => {
      if (res.state) {
        classificationList.value = res.data
      } else errorTip(res.msg)
    })
  }
  getCountryList()
  getGroupList()
  getClassificationList()
  return [countryList, groupList, classificationList]
}

export function useStoreName() {
  const storeTypeInfo = ref({
    actionName: 'baseConfigModule/getPageListAction',
    actionListName: 'baseConfigModule/pageListData',
    actionCountName: 'baseConfigModule/pageListCount',
    deleteAction: 'baseConfigModule/deletePageDataAction'
  })
  const operationName = ref({
    editName: 'baseConfigModule/editPageDataAction',
    createName: 'baseConfigModule/createPageDataAction'
  })

  return [storeTypeInfo, operationName]
}

export function useOther() {
  const countryID = ref(-999)
  const otherInfo = ref({})
  return [countryID, otherInfo]
}

export function useSetLanguage() {
  const [languageList, languageId, resetLanguageList, languageBtnList] =
    usePageLanguage({
      value: '',
      title: '',
      subTitle: ''
    })
  const languageItem = computed(() => {
    return languageList.value.find(
      (item: any) => item.languageId === languageId.value
    )
  })
  // 改变多语言
  const handleChangeLanguage = (id: any) => (languageId.value = id)

  return [
    languageList,
    languageId,
    resetLanguageList,
    languageBtnList,
    languageItem,
    handleChangeLanguage
  ]
}
