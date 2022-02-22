<!--
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-22 10:24:59
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
            <el-tree
              style="width: 100%"
              ref="elTreeRef"
              :data="treeData"
              show-checkbox
              node-key="id"
              :props="{ children: 'children', label: 'title', isLeaf: 'leaf' }"
              @check="handleCheckChange"
            >
            </el-tree>
          </div>
        </el-col>
        <!-- <el-col v-bind="modalConfig.colLayout">
          <div class="item-flex">
            <span class="item-title">其他权限分配</span>
            <el-tree
              style="width: 100%"
              v-if="editShowTree"
              ref="otherTreeRef"
              :data="selectPermissionList"
              show-checkbox
              node-key="id"
              :props="{ children: 'children', label: 'name', isLeaf: 'leaf' }"
              @check="handleCheckChange"
            >
            </el-tree>
          </div>
        </el-col> -->
      </el-row>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, computed } from 'vue'
import { ElTree } from 'element-plus'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePermissionTree, useStoreName } from './hook/user-page-list'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import { menuMapLeafKeys } from '@/utils/map-menus'

export default defineComponent({
  name: 'role',
  setup() {
    const { selectPermissionList, selectRouterList } = usePermissionTree()
    const [storeTypeInfo, operationName] = useStoreName()
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const treeData = computed(() => {
      const data = selectPermissionList.value.map((item: any) => {
        return { title: item.name, id: item.id }
      })
      return [...selectRouterList.value, ...data]
    })
    // 处理当前页面也有逻辑
    const otherInfo = ref<any>({
      pids: ''
    })
    const editShowTree = ref<boolean>(false)
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const otherTreeRef = ref<InstanceType<typeof ElTree>>()
    const newData = () => (editShowTree.value = false)
    const editData = (item: any) => {
      otherInfo.value = {
        id: item.id
      }
      editShowTree.value = true
      const leafKeys = menuMapLeafKeys(item.pids)
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
        // otherTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    // 获取用户选中的权限
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys // 目前这个参数没有作用
      const menuList = [...checkedKeys]
      otherInfo.value = {
        ...otherInfo.value,
        pids: JSON.stringify(menuList)
      }
    }
    // const handleCheckOtherChange = (data1: any, data2: any) => {
    //   const checkedKeys = data2.checkedKeys
    //   const halfCheckedKeys = data2.halfCheckedKeys // 目前这个参数没有作用
    //   const menuList = [...checkedKeys]
    //   otherInfo.value = {
    //     ...otherInfo.value,
    //     pids: JSON.stringify(menuList)
    //   }
    // }
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
      otherTreeRef,
      treeData,
      selectPermissionList,
      selectRouterList,
      handleCheckChange
      // handleCheckOtherChange
    }
  }
})
</script>

<style scoped></style>
