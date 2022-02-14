<!--
 * @Author: korealu
 * @Date: 2022-02-10 10:25:57
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-14 14:46:20
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
          <span
            :class="scope.row.state ? 'hg-text-blue-400' : 'hg-text-red-400'"
            >{{ scope.row.state ? '启用' : '禁用' }}</span
          >
        </template>
        <template #handler="scope">
          <div class="hg-flex hg-justify-center">
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
      :modalConfig="modalConfigRef"
      drawerTitle="限制条件"
      @addClick="saveData"
      @editClick="updateData"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
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
    const [
      dataList,
      dataCount,
      countryList,
      pageInfo,
      saveData,
      updateData,
      deleteData
    ] = useGetConditionList()
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()

    // 获取地区下拉数据并动态设置到表单中
    const modalConfigRef = computed(() => {
      const country = modalConfig.formItems.find(
        (item: any) => item.field === 'regionName'
      )
      country!.options = countryList.value.map((item: any) => ({
        title: item.name,
        value: item.id
      }))
      return modalConfig
    })
    return {
      contentTableConfig,
      dataList,
      dataCount,
      pageInfo,
      saveData,
      updateData,
      deleteData,
      modalConfigRef,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData
    }
  }
})
</script>

<style scoped></style>
