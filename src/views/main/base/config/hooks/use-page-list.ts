/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-14 15:11:20
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/config/hooks/use-page-list.ts
 */
import { errorTip } from '@/utils/tip-info'
import { ref, watch } from 'vue'
import { getCountrySelectList, getBaseConfigGroupList } from '@/service/common'
import { checkUserIsAdmin } from '@/service/main/base/config'

export function usePageList() {
  const countryList = ref<any>([
    {
      name: '全部',
      id: -999
    }
  ])
  // 判断用户是否是超级管理员，如果是展示高级检索
  const isAdmin = ref<boolean>(false)
  const groupList = ref<any>([])
  const checkUser = () => {
    checkUserIsAdmin().then((res) => {
      res.data ? (isAdmin.value = true) : (isAdmin.value = false)
    })
  }
  checkUser()
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
  return [countryList, groupList, isAdmin]
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
