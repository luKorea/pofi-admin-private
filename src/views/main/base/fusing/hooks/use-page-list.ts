/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-14 16:32:39
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/fusing/hooks/use-page-list.ts
 */
import { errorTip } from '@/utils/tip-info'
import { ref, watch } from 'vue'
import { getCountrySelectList } from '@/service/common'

export function usePageList() {
  const countryList = ref<any>([
    {
      name: '全部',
      id: -999
    }
  ])
  const getCountryList = () => {
    getCountrySelectList().then((res) => {
      if (res.result === 0) {
        countryList.value.push(...res.data.rows)
      } else errorTip(res.msg)
    })
  }
  getCountryList()
  return [countryList]
}

export function useStoreName() {
  const storeTypeInfo = ref({
    actionName: 'baseFusingModule/getPageListAction',
    actionListName: 'baseFusingModule/pageListData',
    actionCountName: 'baseFusingModule/pageListCount'
  })
  const operationName = ref({
    editName: 'baseFusingModule/editPageDataAction',
    createName: 'baseFusingModule/createPageDataAction'
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
