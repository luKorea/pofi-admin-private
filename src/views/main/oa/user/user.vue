<template>
  <div class="user">
    <!-- 测试 style module的使用 -->
    <!-- <span :class="$style.red">测试style样式</span> -->
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
      @selectAllBtnClick="test"
    >
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="users"
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
  name: 'users',
  setup() {
    const [pageContentRef, handleResetClick, , handleQueryFrontClick] =
      usePageSearch()
    // TODO 前端搜索后续再改
    const handleQueryClick = (queryInfo: any) => {
      const data = handleQueryFrontClick(
        pageContentRef.value?.dataList,
        queryInfo,
        'id'
      )
      console.log(data, '查询后的数据')
    }
    // pageModal相关的hook逻辑
    const modalConfigRef = computed(() => {
      // const departmentItem = modalConfig.formItems.find(
      //   (item) => item.field === 'departmentId'
      // )
      // departmentItem!.options = store.state.entireDepartment.map((item) => {
      //   return { title: item.name, value: item.id }
      // })
      // const roleItem = modalConfig.formItems.find(
      //   (item) => item.field === 'roleId'
      // )
      // roleItem!.options = store.state.entireRole.map((item) => {
      //   return { title: item.name, value: item.id }
      // })
      return modalConfig
    })
    // 1.处理密码的逻辑
    const newCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'pwd'
      )
      passwordItem!.isHidden = false
    }
    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'pwd'
      )
      passwordItem!.isHidden = true
    }

    // 2.动态添加部门和角色列表
    const store = useStore()
    console.log(store)

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

<style scoped module>
.red {
  color: red;
}
</style>
