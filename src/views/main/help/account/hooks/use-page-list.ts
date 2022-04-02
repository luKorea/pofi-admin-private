/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-15 09:56:08
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/head/hooks/use-page-list.ts
 */
import { errorTip } from '@/utils/tip-info'
import { ref } from 'vue'
import { getCommonSelectList } from '@/service/common'

export function usePageList() {
  const countryList = ref<any>([])
  const jumpList = ref<any>([])
  // 指南。系列，问题,VIP类型
  const otherList = ref<any>({
    guideList: [],
    seriesList: [],
    questionList: [],
    vipList: [
      {
        value: 0,
        title: 'Free'
      },
      {
        value: 1,
        title: 'Pro'
      },
      {
        value: 2,
        title: 'Plus'
      }
    ]
  })
  const getOtherList = () => {
    getCommonSelectList('jumpOtherType').then((res) => {
      if (res.state) {
        const data = res.data
        otherList.value!.guideList = data!.guideList
        otherList.value!.seriesList = data!.seriesList
        otherList.value!.questionList = data!.qaList
      } else errorTip(res.msg)
    })
  }
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
  const getJumpList = () => {
    getCommonSelectList('jumpType').then((res) => {
      if (res.state) {
        let result = res.data as any[]
        result = result.filter((item: any) => item.type !== -999)
        jumpList.value = result
      } else errorTip(res.msg)
    })
  }
  getCountryList()
  getJumpList()
  getOtherList()
  return [countryList, jumpList, otherList]
}

export function useStoreName() {
  const storeTypeInfo = ref({
    actionName: 'helpAccountModule/getPageListAction',
    actionListName: 'helpAccountModule/pageListData',
    actionCountName: 'helpAccountModule/pageListCount',
    deleteAction: 'helpAccountModule/deletePageDataAction',
    sortAction: 'helpAccountModule/sortPageDataAction'
  })
  const operationName = ref({
    editName: 'helpAccountModule/editPageDataAction',
    createName: 'helpAccountModule/createPageDataAction'
  })
  return [storeTypeInfo, operationName]
}

export function useImageUpload() {
  // 上传操作
  const imgLimit = ref(1)
  const imgList = ref<any>([])
  const effectImgList = ref<any>([])
  return [imgLimit, imgList, effectImgList]
}
