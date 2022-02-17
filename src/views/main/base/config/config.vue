<!--
 * @Author: korealu
 * @Date: 2022-02-10 10:17:58
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-17 15:00:06
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/config/config.vue
-->
<template>
  <div class="hg-flex">
    <page-country
      :countryList="countryList"
      @selectCountryItem="selectCountryClick"
    ></page-country>
    <div style="width: 100%">
      <page-search
        :searchFormConfig="searchConfigReset"
        @resetBtnClick="handleResetClick"
        @queryBtnClick="handleQueryBtnClick"
      />
      <page-content
        ref="pageContentRef"
        :contentTableConfig="contentTableConfig"
        :storeTypeInfo="storeTypeInfo"
        pageName="records"
        @newBtnClick="handleNewData"
        @editBtnClick="handleEditData"
      >
        <template #isState="scope">
          <span>{{ scope.row.state ? '启用' : '禁用' }}</span>
        </template>
        <template #isShow="scope">
          <span>{{ scope.row.state ? '显示' : '隐藏' }}</span>
        </template>
      </page-content>
    </div>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="records"
      :modalConfig="modalConfigRef"
      :operationName="operationName"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import PageCountry from '@/components/page-country'

import { usePageList } from './hooks/use-page-list'
import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

import { searchFormConfig } from './page-config/search.config'
import { contentTableConfig } from './page-config/content.config'
import { modalConfig } from './page-config/modal.config'

export default defineComponent({
  name: 'config',
  components: {
    PageCountry
  },
  setup() {
    const storeTypeInfo = ref({
      actionName: 'baseConfigModule/getPageListAction',
      actionListName: 'baseConfigModule/pageListData',
      actionCountName: 'baseConfigModule/pageListCount'
    })
    const operationName = ref({
      editName: 'baseConfigModule/editPageDataAction',
      createName: 'baseConfigModule/createPageDataAction'
    })
    const countryID = ref(-999)
    const [countryList, groupList] = usePageList()
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()

    // 搜索处理
    const searchConfigReset = computed(() => {
      const groupItem = searchFormConfig.formItems.find(
        (item: any) => item.field === 'group'
      )
      groupItem!.options = groupList.value.map((item: any) => ({
        title: item.dec,
        value: item.group
      }))
      return searchFormConfig
    })
    const selectCountryClick = (item: any) => {
      countryID.value = item.id
      handleQueryClick({
        rid: item.id
      })
    }
    const handleQueryBtnClick = (queryInfo: any) => {
      handleQueryClick({
        ...queryInfo,
        rid: countryID.value
      })
    }
    // 表单
    const modalConfigRef = computed(() => {
      const countryItem = modalConfig.formItems.find(
        (item: any) => item.field === 'areaIds'
      )
      countryItem!.options = countryList.value.map((item: any) => ({
        title: item.name,
        value: item.id
      }))
      return modalConfig
    })
    return {
      storeTypeInfo,
      countryList,
      groupList,
      selectCountryClick,
      pageContentRef,
      searchConfigReset,
      handleResetClick,
      handleQueryBtnClick,
      handleQueryClick,
      contentTableConfig,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      modalConfigRef,
      operationName
    }
  }
})
</script>
