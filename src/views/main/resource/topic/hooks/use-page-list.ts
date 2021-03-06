/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-21 10:15:15
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/language/hooks/use-page-list.ts
 */
import { errorTip } from '@/utils/tip-info'
import { ref, computed, watchEffect } from 'vue'
import { getCommonSelectList } from '@/service/common'
import { usePageLanguage } from '@/hooks/use-page-language'
import { _debounce } from '@/utils'

export function useEditTableData() {
  const listData = ref<any>([])
  const newTableData = (field: any) => {
    listData.value.push(field)
  }
  const deleteTableData = (id: any) => {
    const index = listData.value.findIndex((res: any) => res.id === id)
    listData.value.splice(index, 1)
  }

  return [listData, newTableData, deleteTableData]
}

export function useSetLanguage() {
  const editorRef = ref<any>()
  const requiredField = ref<any>(['name', 'subTitle', 'desc'])
  const [
    languageList,
    languageId,
    resetLanguageList,
    languageBtnList,
    mapIconState,
    mapItemIcon
  ] = usePageLanguage(
    {
      name: '',
      subTitle: '',
      url: [],
      cover: '',
      desc: '',
      childListStr: []
    },
    'lid'
  )
  // eslint-disable-next-line vue/return-in-computed-property
  const languageItem = computed(() => {
    if (languageList.value.length > 0) {
      return languageList.value.find(
        (item: any) => item.lid === languageId.value
      )
    } else resetLanguageList()
  })
  watchEffect(() => {
    if (languageItem.value) {
      mapItemIcon(requiredField.value, languageItem.value)
    }
  })
  return [
    editorRef,
    languageList,
    languageId,
    resetLanguageList,
    languageBtnList,
    languageItem,
    requiredField,
    mapIconState
  ]
}

export function usePageList() {
  // 国家地区
  const countryList = ref<any>([])
  // 作者
  const authorList = ref<any>([])
  // 资源
  const resourceList = ref<any>([])
  const loading = ref<boolean>(false)
  const getCountryList = () => {
    getCommonSelectList('country').then((res) => {
      if (res.result === 0) {
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
  const getAuthorList = _debounce(
    (author: string) => {
      loading.value = true
      getCommonSelectList('authorType1', { author: author }, false)
        .then((res) => {
          if (res.state) {
            authorList.value = res.data
          } else errorTip(res.msg)
        })
        .finally(() => (loading.value = false))
    },
    300,
    true
  )
  const getResourceList = (keyword: string, lid: any) => {
    loading.value = true
    getCommonSelectList('resourceType', { keyword: keyword, lid: lid }, false)
      .then((res) => {
        if (res.state) {
          resourceList.value = res.data
        } else errorTip(res.msg)
      })
      .finally(() => (loading.value = false))
  }
  getCountryList()
  getAuthorList()
  return [
    countryList,
    authorList,
    getAuthorList,
    resourceList,
    getResourceList,
    loading
  ]
}

export function useStoreName() {
  const storeTypeInfo = ref({
    actionName: 'resourceTopicModule/getPageListAction',
    actionListName: 'resourceTopicModule/pageListData',
    actionCountName: 'resourceTopicModule/pageListCount',
    deleteAction: 'resourceTopicModule/deletePageDataAction',
    sortAction: 'resourceTopicModule/sortPageDataAction'
  })
  const operationName = ref({
    editName: 'resourceTopicModule/editPageDataAction',
    createName: 'resourceTopicModule/createPageDataAction'
  })
  return [storeTypeInfo, operationName]
}

export function useImageUpload() {
  // 上传操作
  const imgLimit = ref(1)
  const imgList = ref<any>([])
  return [imgLimit, imgList]
}
