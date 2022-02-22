/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-22 10:24:54
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/device/condition/hooks/use-page-list.ts
 */
import { errorTip } from '@/utils/tip-info'
import { ref } from 'vue'
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
