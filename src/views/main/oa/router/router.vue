<template>
  <div class="oa-router">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="router"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
      @selectAllBtnClick="test"
    >
      <template #isRouter="scope">
        <span>{{ scope.row.props ? '是' : '否' }}</span>
      </template>
      <template #isKeep="scope">
        <span>{{ scope.row.cache ? '是' : '否' }}</span>
      </template>
      <template #isShow="scope">
        <span>{{ scope.row.show ? '是' : '否' }}</span>
      </template>
      <template #isAuth="scope">
        <span>{{ scope.row.access ? '是' : '否' }}</span>
      </template>
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="router"
      :modalConfig="modalConfigRef"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import { warnTip } from '@/utils/tip-info'

export default defineComponent({
  name: 'oaRouter',
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    // pageModal相关的hook逻辑
    const newCallback = (item: any) => {
      console.log(item)
    }
    const editCallback = () => {
      // const passwordItem = modalConfig.formItems.find(
      //   (item) => item.field === 'password'
      // )
      // passwordItem!.isHidden = true
    }

    // 2.动态添加部门和角色列表
    const store = useStore()
    console.log(store)
    const modalConfigRef = computed(() => {
      const routerItem = modalConfig.formItems.find(
        (item) => item.field === 'id'
      )
      routerItem!.options = store.state.login.routerList.map((item: any) => {
        return { title: item.title, value: item.id }
      })
      // const roleItem = modalConfig.formItems.find(
      //   (item) => item.field === 'roleId'
      // )
      // roleItem!.options = store.state.entireRole.map((item) => {
      //   return { title: item.name, value: item.id }
      // })
      return modalConfig
    })

    // 3.调用hook获取公共变量和函数
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newCallback, editCallback)

    const test = (data: any) => {
      if (data.value.length === 0) warnTip('至少选中一条数据')
    }

    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      modalConfigRef,
      handleNewData,
      handleEditData,
      pageModalRef,
      defaultInfo,
      test
    }
  }
})
</script>

<style scoped></style>
