import { errorTip } from '@/utils/tip-info'
import { ref, computed } from 'vue'
import { getCommonSelectList } from '@/service/common'
import { usePageSearch } from '@/hooks/use-page-search'

export function useCountryList() {
  const countryList = ref<any>([])
  const getCountryList = () => {
    getCommonSelectList('country').then((res) => {
      if (res.state) {
        countryList.value.push(...res.data.rows)
      } else errorTip(res.msg)
    })
  }
  getCountryList()
  return [countryList]
}

export function useMapCountry() {
  const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
  const [countryList] = useCountryList()
  const handleCountryList = computed(() => {
    const list = [
      {
        name: '全部',
        id: -999
      },
      ...countryList.value
    ]
    return list
  })
  // 侧边国家
  const countryID = ref<any>(-999)
  const countryRef = ref()
  const copyQueryInfo = ref({})
  const selectCountryClick = (item: any) => {
    countryID.value = item.id
    handleQueryClick({
      ...copyQueryInfo.value,
      rid: countryID.value
    })
  }
  const handleQueryBtnClick = (queryInfo: any) => {
    copyQueryInfo.value = queryInfo
    handleQueryClick({
      ...queryInfo,
      rid: countryID.value
    })
  }
  // 刷新时重新选择第一条数据
  const handleResetBtnClick = () => {
    countryRef.value.currentIndex = 0
    countryID.value = '-999'
    handleResetClick()
  }
  return {
    pageContentRef,
    handleCountryList,
    countryRef,
    selectCountryClick,
    handleQueryBtnClick,
    handleResetBtnClick
  }
}