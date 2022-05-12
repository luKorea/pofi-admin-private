<!--
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-12 14:27:17
 * @Description: 增删改功能完成，缺少分页搜索功能
 * @FilePath: /pofi-admin/src/views/main/oa/user/user.vue
-->
<template>
  <div class="user">
    <!-- 测试 style module的使用 -->
    <!-- <span :class="$style.red">测试style样式</span> -->
    <!-- <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    /> -->
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      @newBtnClick="handleNewData"
      @distributionBtnClick="handleEditData"
      :storeTypeInfo="storeTypeInfo"
    >
      <template #createTime="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #lineTime="scope">
        <span>{{ $filters.formatTime(scope.row.onlineTime) }}</span>
      </template>
      <template #state="scope">
        <el-button
          @click="handleChangeValid(scope.row.id, scope.row.valid)"
          size="mini"
          :type="scope.row.valid ? 'success' : 'danger'"
          >{{ scope.row.valid ? '有效' : '无效' }}</el-button
        >
      </template>
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="users"
      :modalConfig="modalConfig"
      :operationName="operationName"
      :otherInfo="otherInfo"
    >
      <template v-if="isShowPermissionCheck">
        <el-row>
          <el-col :span="24">
            <div class="item-flex">
              <span class="item-title">权限分配</span>
              <el-checkbox
                border
                style="margin-bottom: 10px"
                v-model="checkAll"
                :indeterminate="isIndeterminate"
                @change="handleCheckAllChange"
                >全部</el-checkbox
              >
              <el-checkbox-group
                v-model="checkList"
                @change="handleCheckedRolesChange"
              >
                <el-checkbox
                  border
                  v-for="role in roleList"
                  :key="role"
                  :label="role.id"
                >
                  {{ role.name }}
                  <span style="font-size: 8px; color: #ccc"
                    >({{ role.type }})</span
                  >
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </el-col>
        </el-row>
      </template>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { useStoreName, useRoleList } from './hook/user-page-list'
import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

import { updateUserValid } from '@/service/main/system/user'
import { errorTip, infoTipBox, successTip } from '@/utils/tip-info'

export default defineComponent({
  name: 'users',
  setup() {
    const [storeTypeInfo, operationName] = useStoreName()
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const changeFormItemStatus = (flag: boolean) => {
      const pwdItem = modalConfig.formItems.find(
        (item: any) => item.field === 'pwd'
      )
      pwdItem!.isHidden = flag
      modalConfig.formItems.forEach(
        (item: any) => (item.otherOptions.disabled = flag)
      )
    }
    const addData = () => {
      isShowPermissionCheck.value = false
      changeFormItemStatus(false)
      otherInfo.value = {}
    }
    // 分配用户权限
    const isShowPermissionCheck = ref<boolean>(false)
    // 多选框部分
    const isIndeterminate = ref<boolean>(true)
    const otherInfo = ref<any>({})
    const checkAll = ref()
    const checkList = ref()
    const [roleList] = useRoleList()
    const roleId = computed(() => {
      return roleList.value.map((item: any) => {
        return item.id
      })
    })
    const handleCheckAllChange = (val: boolean) => {
      checkList.value = val ? roleId.value : []
      isIndeterminate.value = false
    }
    const handleCheckedRolesChange = (value: string[]) => {
      const checkedCount = value.length
      checkAll.value = checkedCount === roleId.value.length
      isIndeterminate.value =
        checkedCount > 0 && checkedCount < roleId.value.length
      otherInfo.value = {
        ...otherInfo.value,
        rids: JSON.stringify(checkList.value)
      }
    }
    console.log(roleList, 'roleList')
    const editData = (item: any) => {
      changeFormItemStatus(true)
      otherInfo.value = {
        ...item,
        modTime: undefined,
        createTime: undefined,
        onlineTime: undefined
      }
      checkList.value = JSON.parse(item.rids)
      isShowPermissionCheck.value = true
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(addData, editData)
    // 修改用户状态
    const handleChangeValid = (id: any, valid: any) => {
      infoTipBox({
        title: '设置用户账号状态',
        message: `确定将该用户状态设置成${valid ? '无效' : '有效'}吗？`
      }).then(() => {
        updateUserValid({
          id: id,
          valid: valid ? 0 : 1
        }).then((res: any) => {
          if (res.result === 0) {
            successTip(res.msg)
            handleResetClick()
          } else errorTip(res.msg)
        })
      })
    }
    return {
      storeTypeInfo,
      operationName,
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      modalConfig,
      handleNewData,
      handleEditData,
      pageModalRef,
      defaultInfo,
      handleChangeValid,
      isShowPermissionCheck,
      isIndeterminate,
      handleCheckAllChange,
      handleCheckedRolesChange,
      checkAll,
      checkList,
      roleList,
      roleId,
      otherInfo
    }
  }
})
</script>

<style scoped module>
.red {
  color: red;
}
</style>
