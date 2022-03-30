/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-28 09:52:33
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/tradeRecord/hooks/use-page-list.ts
 */
import { ref } from 'vue'
import { getCommonSelectList } from '@/service/common'
import { errorTip } from '@/utils/tip-info'
import { userMessageTypeList } from '@/utils/select-list/map-resource-list'

export function useGetSelect() {
  const selectList = ref<any>({
    countryList: [],
    tagList: [],
    userList: [],
    statusList: [],
    languageList: [],
    typeList: []
  })
  const getList = () => {
    getCommonSelectList('feedbackSelect').then((res) => {
      if (res.result === 0) {
        const result = res.data
        selectList.value.statusList = userMessageTypeList
        selectList.value.countryList = result.regions.map((item: any) => ({
          title: item.v,
          value: item.k
        }))
        selectList.value.userList = result.opts.map((item: any) => ({
          title: item.nickname,
          value: item.id
        }))
        selectList.value.tagList = result.tags.map((item: any) => ({
          title: item.dec,
          value: item.type
        }))
        selectList.value.typeList = result.fts.map((item: any) => ({
          title: item.title,
          value: item.id
        }))
        selectList.value.languageList = result.languages.map((item: any) => ({
          title: item.v,
          value: item.k
        }))
      } else errorTip(res.msg)
    })
  }
  getList()
  return [selectList]
}

export function useStoreName() {
  const storeTypeInfo = ref({
    actionName: 'feedbackModule/getPageListAction',
    actionListName: 'feedbackModule/pageListData',
    actionCountName: 'feedbackModule/pageListCount',
    deleteAction: 'feedbackModule/deletePageDataAction'
  })
  const operationName = ref({
    editName: 'feedbackModule/editPageDataAction',
    createName: 'feedbackModule/createPageDataAction'
  })
  return [storeTypeInfo, operationName]
}
