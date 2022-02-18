/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-18 18:04:53
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/help/companion/hooks/use-page-list.ts
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
        console.log(res.data.rows)
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
    actionName: 'companionModule/getPageListAction',
    actionListName: 'companionModule/pageListData',
    actionCountName: 'companionModule/pageListCount'
  })
  const operationName = ref({
    editName: 'companionModule/editPageDataAction',
    createName: 'companionModule/createPageDataAction'
  })

  return [storeTypeInfo, operationName]
}

export function useImageUpload() {
  // 上传操作
  const imgLimit = ref(1)
  const imgList = ref([])
  return [imgLimit, imgList]
}

export function useVideoUpload() {
  // 上传操作
  const videoLimit = ref(1)
  const videoList = ref([])
  return [videoLimit, videoList]
}
