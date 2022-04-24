/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-24 12:02:08
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/tradeRecord/hooks/use-page-list.ts
 */
import { ref, computed, watchEffect } from 'vue'
import { usePageLanguage } from '@/hooks/use-page-language'

export function useStoreName() {
  const storeTypeInfo = ref({
    actionName: 'goodsItemModule/getPageListAction',
    actionListName: 'goodsItemModule/pageListData',
    actionCountName: 'goodsItemModule/pageListCount',
    deleteAction: 'goodsItemModule/deletePageDataAction',
    sortAction: 'goodsItemModule/sortPageDataAction'
  })
  const operationName = ref({
    editName: 'goodsItemModule/editPageDataAction',
    createName: 'goodsItemModule/createPageDataAction'
  })
  return [storeTypeInfo, operationName]
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
      desc: '',
      discount: '', //促销价
      promotionNum: 0, //促销数量
      promotionSwitch: '', // 促销开关
      promotionStartTime: '', //促销开始时间
      promotionEndTime: '', //促销结束时间
      show: 0 //状态
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
