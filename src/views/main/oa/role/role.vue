<!--
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-12 16:20:35
 * @Description: 完成
 * @FilePath: /pofi-admin/src/views/main/oa/role/role.vue
-->
<template>
  <div class="role">
    <!-- <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    /> -->
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="roles"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
      :storeTypeInfo="storeTypeInfo"
    >
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="roles"
      :modalConfig="modalConfig"
      :operationName="operationName"
      :otherInfo="otherInfo"
    >
      <el-row v-if="editShowTree">
        <el-col :span="24">
          <div class="item-flex">
            <span class="item-title">权限分配</span>
            <el-input
              v-model="filterTree"
              style="margin-bottom: 6px"
              placeholder="请输入名称进行搜索"
            />
            <el-tree
              style="width: 100%"
              ref="elTreeRef"
              :data="treeData"
              show-checkbox
              node-key="id"
              :props="{ children: 'children', label: 'title', isLeaf: 'leaf' }"
              @check="handleCheckChange"
              :filter-node-method="handleFilterNode"
            >
            </el-tree>
          </div>
        </el-col>
      </el-row>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import {
  usePermissionTree,
  useStoreName,
  useTreeOptions
} from './hook/user-page-list'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import { menuMapLeafKeys } from '@/utils/map-menus'

export default defineComponent({
  name: 'role',
  setup() {
    const { selectPermissionList, selectRouterList } = usePermissionTree()
    const [storeTypeInfo, operationName] = useStoreName()
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const {
      treeData,
      filterTree,
      editShowTree,
      elTreeRef,
      handleFilterNode,
      handleCheckChange,
      otherInfo
    } = useTreeOptions()
    const newData = () => {
      editShowTree.value = false
      otherInfo.value = {}
    }
    const editData = (item: any) => {
      otherInfo.value = {
        id: item.id
      }
      editShowTree.value = true
      const leafKeys = menuMapLeafKeys(item.pids)
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newData, editData)
    return {
      storeTypeInfo,
      operationName,
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      handleNewData,
      handleEditData,
      pageModalRef,
      defaultInfo,
      modalConfig,
      otherInfo,
      editShowTree,
      elTreeRef,
      treeData,
      selectPermissionList,
      selectRouterList,
      handleCheckChange,
      handleFilterNode,
      filterTree
    }
  }
})
</script>

<style scoped></style>
