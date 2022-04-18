/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-18 17:11:09
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/language/hooks/use-page-list.ts
 */
import { errorTip } from '@/utils/tip-info'
import { ref, computed, nextTick, watchEffect } from 'vue'
import { getCommonSelectList } from '@/service/common'
import { usePageLanguage } from '@/hooks/use-page-language'

export function mapFormConfigData() {
  const contentList = ref<any>([]) // 样式类型
  const categoryList = ref<any>([]) // 所属分类
  getCommonSelectList('styleType').then((res) => {
    if (res.result === 0) {
      contentList.value = res.data.map((item: any) => {
        return {
          title: item.dec,
          value: item.type
        }
      })
    }
  })
  const getCategoryList = () => {
    getCommonSelectList('categoryType').then((res) => {
      if (res.result === 0) {
        categoryList.value = res.data.map((item: any) => {
          return {
            title: item.name,
            value: item.id,
            ...item
          }
        })
      } else errorTip(res.msg)
    })
  }
  getCategoryList()
  return [contentList, categoryList]
}

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
  watchEffect(() => {
    if (languageItem.value) {
      mapItemIcon(requiredField.value, languageItem.value)
    }
  })
  // 改变多语言
  const handleChangeLanguage = async (id: any) => {
    languageId.value = id
    await nextTick()
    editorRef.value.setEditorValue()
  }

  return [
    editorRef,
    languageList,
    languageId,
    resetLanguageList,
    languageBtnList,
    languageItem,
    handleChangeLanguage,
    requiredField,
    mapIconState
  ]
}

export function usePageList() {
  // 国家地区
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
    actionName: 'resourceHomeModule/getPageListAction',
    actionListName: 'resourceHomeModule/pageListData',
    actionCountName: 'resourceHomeModule/pageListCount',
    deleteAction: 'resourceHomeModule/deletePageDataAction',
    sortAction: 'resourceHomeModule/sortPageDataAction'
  })
  const operationName = ref({
    editName: 'resourceHomeModule/editPageDataAction',
    createName: 'resourceHomeModule/createPageDataAction'
  })
  return [storeTypeInfo, operationName]
}

export function useImageUpload() {
  // 上传操作
  const imgLimit = ref(1)
  const imgList = ref<any>([])
  return [imgLimit, imgList]
}
