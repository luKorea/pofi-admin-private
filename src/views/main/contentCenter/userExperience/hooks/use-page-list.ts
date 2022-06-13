/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-06-13 13:53:56
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/tradeRecord/hooks/use-page-list.ts
 */
import { errorTip } from '@/utils/tip-info'
import { ref } from 'vue'
import { getCommonSelectList } from '@/service/common'

export function usePageList() {
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
  return [countryList]
}

export function useStoreName() {
  const storeTypeInfo = ref({
    actionName: 'userExperienceModule/getPageListAction',
    actionListName: 'userExperienceModule/pageListData',
    actionCountName: 'userExperienceModule/pageListCount',
    deleteAction: 'userExperienceModule/deletePageDataAction',
    sortAction: 'userExperienceModule/sortPageDataAction'
  })
  const operationName = ref({
    editName: 'userExperienceModule/editPageDataAction',
    createName: 'userExperienceModule/createPageDataAction'
  })
  return [storeTypeInfo, operationName]
}

export const u3dList = ref<any>()
