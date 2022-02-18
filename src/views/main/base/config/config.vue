<!--
 * @Author: korealu
 * @Date: 2022-02-10 10:17:58
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-18 18:17:09
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
      :otherInfo="otherInfo"
    >
      <div class="item-flex">
        <span class="item-title">内容</span>
        <hy-editor v-model:value="editorValue" fileTypeName="base/"></hy-editor>
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import PageCountry from '@/components/page-country'
import HyEditor from '@/base-ui/editor'

import { usePageList, useStoreName, useOther } from './hooks/use-page-list'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

import { searchFormConfig } from './page-config/search.config'
import { contentTableConfig } from './page-config/content.config'
import { modalConfig } from './page-config/modal.config'

export default defineComponent({
  name: 'config',
  components: {
    PageCountry,
    HyEditor
  },
  setup() {
    const editorRules = ref([
      {
        require: true,
        message: '请输入内容',
        trigger: 'blur'
      }
    ])
    const [countryID, editorValue, otherInfo] = useOther()
    const [storeTypeInfo, operationName] = useStoreName()
    const [countryList, groupList] = usePageList()
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    const newClick = () => {
      editorValue.value = ''
    }
    const editClick = (item: any) => {
      editorValue.value = item.value
      console.log(editorValue.value)
    }

    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newClick, editClick)
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
      editorRules,
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
      operationName,
      editorValue,
      otherInfo
    }
  }
})
</script>
