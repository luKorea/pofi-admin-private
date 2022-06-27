/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-06-27 11:54:29
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/language/hooks/use-page-list.ts
 */
import { errorTip } from '@/utils/tip-info'
import { ref, computed, watchEffect, nextTick } from 'vue'
import { getCommonSelectList } from '@/service/common'
import { usePageLanguage } from '@/hooks/use-page-language'
import { searchFormConfig } from '../config/search.config'
import { modalConfig } from '../config/modal.config'

// 国家下拉
export function useCountrySelect() {
  const [, , otherFieldList] = useMapField()
  const otherInfo = ref<any>()
  const areaIds = ref<any>([])
  const handleChangeCountry = (item: any[]) => {
    const all: any[] = []
    const check = item.find((i: any) => i === -1)
    if (check === -1) {
      otherFieldList.value.countryList
        .filter((i: any) => i.id !== -1)
        .forEach((item: any) => {
          all.push(item.id)
        })
      otherInfo.value = {
        ...otherInfo.value,
        areaIds: all
      }
      areaIds.value = all
    } else {
      otherInfo.value = {
        ...otherInfo.value,
        areaIds: item
      }
    }
  }
  // 判断用户是否有选择地区，没有的话将下拉数据循环并发送到后台
  watchEffect(() => {
    if (areaIds.value.length === 0) {
      const region: any[] = []
      otherFieldList.value.countryList
        .filter((i: any) => i.id !== -1)
        .forEach((item: any) => {
          region.push(item.id)
        })
      otherInfo.value = {
        ...otherInfo.value,
        areaIds: region
      }
    }
  })
  return [otherInfo, areaIds, handleChangeCountry]
}

export function useMapField() {
  const otherFieldList = ref<any>({
    urlList: [],
    painterCountryList: [],
    countryList: [],
    jobList: []
  })
  getCommonSelectList('userCountry').then((res) => {
    if (!res.result) {
      otherFieldList.value.painterCountryList = res.data?.regions.map(
        (item: any) => {
          return {
            title: item.v,
            value: item.k
          }
        }
      )
    }
  })
  getCommonSelectList('country').then((res) => {
    if (res.state) {
      otherFieldList.value.countryList.push(
        {
          name: '全部',
          id: -1
        },
        ...res.data.rows
      )
    } else errorTip(res.msg)
  })
  getCommonSelectList('jobList').then((res) => {
    if (!res.result) {
      otherFieldList.value.jobList = res.data.map((item: any) => {
        return {
          title: item.name,
          value: item.id
        }
      })
    }
  })
  getCommonSelectList('allLink').then((res) => {
    if (!res.result) {
      otherFieldList.value.urlList = res.data.map((item: any) => {
        return {
          title: item.desc,
          value: item.type,
          ...item
        }
      })
    }
  })
  getCommonSelectList('otherKeyType').then((res: any) => {
    if (!res.result) {
      otherFieldList.value.labelList = res?.data.faceList.map((item: any) => {
        return {
          value: item.id,
          title: item.name
        }
      })
    }
  })
  const searchFormConfigRef = computed(() => {
    const platform = searchFormConfig.formItems.find(
      (i) => i.field === 'platform'
    )
    platform!.options = otherFieldList.value.urlList
    const region = searchFormConfig.formItems.find((i) => i.field === 'region')
    region!.options = otherFieldList.value.painterCountryList
    return searchFormConfig
  })
  const modalConfigRef = computed(() => {
    const region = modalConfig.formItems.find((i) => i.field === 'region')
    region!.options = otherFieldList.value.painterCountryList
    const job = modalConfig.formItems.find((i) => i.field === 'job')
    job!.options = otherFieldList.value.jobList
    const keywordList = modalConfig.formItems.find(
      (i) => i.field === 'keywordList'
    )
    keywordList!.options = otherFieldList.value.labelList
    return modalConfig
  })

  return [searchFormConfigRef, modalConfigRef, otherFieldList]
}

export function useSetLanguage() {
  const requiredField = ref<any>(['name', 'digest', 'about'])
  const editorRef = ref<any>()
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
      digest: '',
      about: ''
    },
    'lid'
  )
  const languageItem = computed(() => {
    return languageList.value.find((item: any) => item.lid === languageId.value)
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
  const keyTypeList = ref<any>([])
  const getKeyTypeList = () => {
    getCommonSelectList('keywords').then((res) => {
      if (res.state) {
        keyTypeList.value.push(...res.data)
      } else errorTip(res.msg)
    })
  }
  getKeyTypeList()
  return [keyTypeList]
}

export function useStoreName() {
  const storeTypeInfo = ref({
    actionName: 'painterLibraryModule/getPageListAction',
    actionListName: 'painterLibraryModule/pageListData',
    actionCountName: 'painterLibraryModule/pageListCount',
    deleteAction: 'painterLibraryModule/deletePageDataAction',
    sortAction: 'painterLibraryModule/sortPageDataAction'
  })
  const operationName = ref({
    editName: 'painterLibraryModule/editPageDataAction',
    createName: 'painterLibraryModule/createPageDataAction'
  })
  return [storeTypeInfo, operationName]
}

export function useImageUpload() {
  // 上传操作
  const imgLimit = ref(1)
  const imgList = ref<any>([])
  const imgList1 = ref<any>([])
  return [imgLimit, imgList, imgList1]
}
