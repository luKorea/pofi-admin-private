/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-22 10:24:50
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/config/hooks/use-page-list.ts
 */
import { errorTip } from '@/utils/tip-info'
import { ref, watch } from 'vue'
import { getCountrySelectList, getBaseConfigGroupList } from '@/service/common'

export function usePageList() {
  const countryList = ref<any>([
    {
      name: '全部',
      id: -999
    }
  ])
  const groupList = ref<any>([])
  const getCountryList = () => {
    getCountrySelectList().then((res) => {
      if (res.state) {
        countryList.value.push(...res.data.rows)
      } else errorTip(res.msg)
    })
  }
  const getGroupList = () => {
    getBaseConfigGroupList().then((res) => {
      if (res.state) {
        groupList.value = res.data
      } else errorTip(res.msg)
    })
  }
  getCountryList()
  getGroupList()
  return [countryList, groupList]
}

export function useStoreName() {
  const storeTypeInfo = ref({
    actionName: 'baseConfigModule/getPageListAction',
    actionListName: 'baseConfigModule/pageListData',
    actionCountName: 'baseConfigModule/pageListCount'
  })
  const operationName = ref({
    editName: 'baseConfigModule/editPageDataAction',
    createName: 'baseConfigModule/createPageDataAction'
  })

  return [storeTypeInfo, operationName]
}

export function useOther() {
  const countryID = ref(-999)
  const editorValue = ref('')
  const otherInfo = ref({})
  watch(
    () => editorValue.value,
    () => {
      otherInfo.value = {
        value: editorValue.value
      }
    }
  )
  return [countryID, editorValue, otherInfo]
}
