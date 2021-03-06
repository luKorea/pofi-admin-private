/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-10 14:16:35
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
  // const requiredField = ref<any>(['tagName'])
  const requiredField = ref<any>([])
  const [
    languageList,
    languageId,
    resetLanguageList,
    languageBtnList,
    mapIconState,
    mapItemIcon
  ] = usePageLanguage(
    {
      tagName: '',
      tagStartTime: undefined, //促销价
      tagEndTime: undefined
    },
    'lid'
  )
  // {
  //   tagName: '',
  //   promotionSale: 0, //促销价
  //   promotionNum: 0, //促销数量
  //   promotionSwitch: 0, // 促销开关
  //   promotionStartTime: '', //促销开始时间
  //   promotionEndTime: '' //促销结束时间
  // },
  const languageItem = computed(() => {
    return languageList.value.find((item: any) => item.lid === languageId.value)
  })
  // watchEffect(() => {
  //   if (languageItem.value) {
  //     mapItemIcon(requiredField.value, languageItem.value)
  //   }
  // })
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
