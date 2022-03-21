<template>
  <!-- 新增，删除完成 -->
  <div class="oa-router">
    <!-- <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    /> -->
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="router"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
      @selectAllBtnClick="test"
      :storeTypeInfo="storeTypeInfo"
      :showSearch="true"
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
      :operationName="operationName"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { useStoreName } from './hook/user-page-list'
import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import { warnTip } from '@/utils/tip-info'

export default defineComponent({
  name: 'oaRouter',
  setup() {
    const [storeTypeInfo, operationName] = useStoreName()
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    // pageModal相关的hook逻辑
    const newCallback = (item: any) => {
      console.log(item)
    }
    const editCallback = (item: any) => {
      console.log(item)
      // console.log(item, '编辑的数据')
      // if (item.parent === 0) {
      //   item.parent = item.id
      // }
    }

    // 2.动态添加部门和角色列表
    const store = useStore()
    console.log(store)
    const modalConfigRef = computed(() => {
      const routerItem = modalConfig.formItems.find(
        (item) => item.field === 'parent'
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
      storeTypeInfo,
      operationName,
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
