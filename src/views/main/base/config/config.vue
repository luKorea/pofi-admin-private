<!--
 * @Author: korealu
 * @Date: 2022-02-10 10:17:58
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-14 15:16:51
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/config/config.vue
-->
<template>
  <div class="hg-flex">
    <page-country
      ref="countryRef"
      :countryList="countryList"
      @selectCountryItem="selectCountryClick"
    ></page-country>
    <div style="width: 100%">
      <page-search
        v-if="isAdmin"
        :searchFormConfig="searchConfigReset"
        @resetBtnClick="handleResetBtnClick"
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
  name: 'baseConfig',
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
    const countryRef = ref()
    const [countryID, editorValue, otherInfo] = useOther()
    const [storeTypeInfo, operationName] = useStoreName()
    const [countryList, groupList, isAdmin] = usePageList()
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    const newClick = () => {
      editorValue.value = ''
    }
    const editClick = (item: any) => {
      editorValue.value = item.value
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
    // 表单
    const modalConfigRef = computed(() => {
      // 超级管理员拥有分类分组选项，普通用户没有，后续增加
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
      countryRef,
      editorRules,
      storeTypeInfo,
      countryList,
      groupList,
      isAdmin,
      selectCountryClick,
      pageContentRef,
      searchConfigReset,
      handleResetClick,
      handleResetBtnClick,
      handleQueryClick,
      handleQueryBtnClick,
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
