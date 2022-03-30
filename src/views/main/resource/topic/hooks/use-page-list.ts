/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-23 11:54:33
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/language/hooks/use-page-list.ts
 */
import { errorTip } from '@/utils/tip-info'
import { ref, computed, nextTick } from 'vue'
import { getCommonSelectList } from '@/service/common'
import { usePageLanguage } from '@/hooks/use-page-language'
import { mapObjectIsNull, _debounce } from '@/utils'
import { warnTip } from '@/utils/tip-info'

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
  const [languageList, languageId, resetLanguageList, languageBtnList] =
    usePageLanguage(
      {
        name: '',
        subTitle: '',
        url: [],
        cover: '',
        desc: ''
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
  // 改变多语言
  const handleChangeLanguage = async (id: any) => {
    languageId.value = id
    await nextTick()
    editorRef.value.setEditorValue()
    // if (mapObjectIsNull(['name', 'subTitle', 'desc'], languageItem.value)) {
    //   languageId.value = id
    //   await nextTick()
    //   editorRef.value.setEditorValue()
    // } else warnTip('请确保多语言配置中带*号的字段已经填写')
  }

  return [
    editorRef,
    languageList,
    languageId,
    resetLanguageList,
    languageBtnList,
    languageItem,
    handleChangeLanguage
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
      if (res.state) {
        countryList.value.push(...res.data.rows)
      } else errorTip(res.msg)
    })
  }
  const getAuthorList = _debounce(
    (author: string) => {
      loading.value = true
      getCommonSelectList('authorType', { author: author }, false)
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
  const getResourceList = _debounce(
    (keyword: string) => {
      loading.value = true
      getCommonSelectList('resourceType', { keyword: keyword, lid: 1 }, false)
        .then((res) => {
          if (res.state) {
            resourceList.value = res.data
          } else errorTip(res.msg)
        })
        .finally(() => (loading.value = false))
    },
    300,
    true
  )
  getCountryList()
  getAuthorList()
  getResourceList()
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
