/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-14 14:29:44
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/language/hooks/use-page-list.ts
 */
import { errorTip } from '@/utils/tip-info'
import { ref } from 'vue'
import { getCountrySelectList } from '@/service/common'

export function usePageList() {
  const countryList = ref<any>([])
  const getCountryList = () => {
    getCountrySelectList().then((res) => {
      if (res.state) {
        countryList.value.push(...res.data.rows)
      } else errorTip(res.msg)
    })
  }
  getCountryList()
  return [countryList]
}

export function useStoreName() {
  const storeTypeInfo = ref({
    actionName: 'baseLanguageModule/getPageListAction',
    actionListName: 'baseLanguageModule/pageListData',
    actionCountName: 'baseLanguageModule/pageListCount',
    deleteAction: 'baseLanguageModule/deletePageDataAction',
    sortAction: 'baseLanguageModule/sortPageDataAction'
  })
  const operationName = ref({
    editName: 'baseLanguageModule/editPageDataAction',
    createName: 'baseLanguageModule/createPageDataAction'
  })
  return [storeTypeInfo, operationName]
}

export function useImageUpload() {
  // 上传操作
  const imgLimit = ref(1)
  const imgList = ref<any>([])
  return [imgLimit, imgList]
}
