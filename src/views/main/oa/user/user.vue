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
      @removeBtnClick="handleRemoveData"
      @operationBtnClick="handleShowDialog"
      @selectAllBtnClick="test"
      :storeTypeInfo="storeTypeInfo"
    >
      <template #createTime="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #lineTime="scope">
        <span>{{ $filters.formatTime(scope.row.onlineTime) }}</span>
      </template>
      <template #state="scope">
        <el-button size="mini" :type="scope.row.valid ? 'success' : 'danger'">{{
          scope.row.valid ? '有效' : '无效'
        }}</el-button>
      </template>
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="users"
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
import { usePageDialog } from '@/hooks/use-page-dialog'
import { infoTipBox, warnTip } from '@/utils/tip-info'

export default defineComponent({
  name: 'users',
  setup() {
    const [storeTypeInfo, operationName] = useStoreName()
    const [pageContentRef, handleResetClick, , handleQueryFrontClick] =
      usePageSearch()
    const [pageDialogRef, handleShowDialog] = usePageDialog()
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

    const handleRemoveData = (item: any) => {
      infoTipBox({
        message: '您确定删除吗',
        title: '删除数据'
      }).then(() => {
        console.log(item)
        store.dispatch('system/deletePageDataAction', {
          pageName: 'users',
          id: item.id
        })
      })
    }

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
      handleRemoveData,
      pageModalRef,
      defaultInfo,
      test,
      pageDialogRef,
      handleShowDialog
    }
  }
})
</script>

<style scoped module>
.red {
  color: red;
}
</style>
