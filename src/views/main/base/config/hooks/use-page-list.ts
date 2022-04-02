/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-18 16:04:40
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/config/hooks/use-page-list.ts
 */
import { errorTip, warnTip } from '@/utils/tip-info'
import { ref, computed, nextTick } from 'vue'
import { getCommonSelectList } from '@/service/common'
import { usePageLanguage } from '@/hooks/use-page-language'
import { mapObjectIsNull } from '@/utils'

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
  const editorRef = ref<any>()
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
  const handleChangeLanguage = async (id: any) => {
    languageId.value = id
    await nextTick()
    editorRef.value.setEditorValue()
    // if (mapObjectIsNull(['value'], languageItem.value)) {
    //   languageId.value = id
    //   await nextTick()
    //   editorRef.value.setEditorValue()
    // } else warnTip('请确保多语言配置中带*号的字段已经填写')
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
