<!--
 * @Author: korealu
 * @Date: 2022-02-10 10:25:57
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-14 10:21:50
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/device/condition/condition.vue
-->
<template>
  <div class="condition">
    <div class="table-style">
      <hy-table
        :listData="dataList"
        :listCount="dataCount"
        v-bind="contentTableConfig"
        v-model:page="pageInfo"
        title="限制条件列表"
      >
        <!-- 1.header中的插槽 -->
        <template #headerHandler>
          <el-button type="primary" size="medium" @click="handleNewData">
            新建
          </el-button>
        </template>

        <!-- 2.列中的插槽 -->
        <template #limitNum="scope">
          <span>所有设备满{{ scope.row.limitNum }}台</span>
        </template>
        <template #status="scope">
          <el-button
            plain
            size="mini"
            :type="scope.row.state ? 'success' : 'danger'"
          >
            {{ scope.row.state ? '启用' : '禁用' }}
          </el-button>
        </template>
        <template #createAt="scope">
          <span>{{ $filters.formatTime(scope.row.createTime) }}</span>
        </template>
        <template #handler="scope">
          <div class="handle-btns">
            <slot name="other" v-if="isOther"></slot>
            <el-button
              icon="el-icon-edit"
              size="mini"
              type="text"
              @click="handleEditData(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              icon="el-icon-delete"
              size="mini"
              type="text"
              style="color: #f56c6c"
              @click="deleteData(scope.row)"
              >删除</el-button
            >
          </div>
        </template>
      </hy-table>
    </div>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="users"
      :modalConfig="modalConfig"
      drawerTitle="限制条件"
      @addClick="saveData"
      @editClick="updateData"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HyTable from '@/base-ui/table'
import PageModal from '@/components/page-modal'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
import { useGetConditionList } from './hooks/user-condition-list'
import { usePageModal } from '@/hooks/use-page-modal'
export default defineComponent({
  name: 'condition',
  components: {
    HyTable,
    PageModal
  },
  setup() {
    const [dataList, dataCount, pageInfo, saveData, updateData, deleteData] =
      useGetConditionList()
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()
    return {
      contentTableConfig,
      dataList,
      dataCount,
      pageInfo,
      saveData,
      updateData,
      deleteData,
      modalConfig,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData
    }
  }
})
</script>

<style scoped></style>
