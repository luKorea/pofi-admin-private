<template>
  <div class="page-content">
    <hy-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
      @drawTable="drawTable"
      @selectionChange="handleSelectionChange"
      :handleDraw="permissionList.isDrawTable"
    >
      <!-- 1.header中的插槽 -->
      <template #headerHandler>
        <el-button
          v-if="permissionList.isSelectAll"
          type="primary"
          size="mini"
          @click="handleSelectAllClick"
        >
          批量操作
        </el-button>
        <el-button
          v-if="permissionList.isExport"
          icon="el-icon-edit"
          size="mini"
          type="warning"
          @click="handleExportClick"
        >
          导出
        </el-button>
        <el-button
          v-if="permissionList.isCreate"
          type="primary"
          size="mini"
          @click="handleNewClick"
        >
          新建数据
        </el-button>
        <el-button
          size="mini"
          icon="el-icon-refresh"
          @click="getPageData"
        ></el-button>
      </template>

      <!-- 2.列中的插槽 -->
      <template #status="scope">
        <el-button
          plain
          size="mini"
          :type="scope.row.enable ? 'success' : 'danger'"
        >
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <!-- 操作插槽 -->
      <template #handler="scope">
        <el-button
          v-if="permissionList.isDistribution"
          size="mini"
          type="text"
          @click="handleDistributionClick(scope.row)"
        >
          分配
        </el-button>
        <el-divider
          direction="vertical"
          v-if="permissionList.isDistribution"
        ></el-divider>
        <el-button
          v-if="permissionList.isOperation"
          size="mini"
          type="text"
          @click="handleOperationClick(scope.row)"
        >
          操作日志
        </el-button>
        <el-divider
          direction="vertical"
          v-if="permissionList.isOperation"
        ></el-divider>
        <el-button
          v-if="permissionList.isRowAdd"
          size="mini"
          type="text"
          @click="handleAddRowClick(scope.row)"
        >
          新增
        </el-button>
        <el-divider
          direction="vertical"
          v-if="permissionList.isRowAdd"
        ></el-divider>
        <el-button
          v-if="permissionList.isUpdate"
          size="mini"
          type="text"
          @click="handleEditClick(scope.row)"
        >
          编辑
        </el-button>
        <el-divider
          direction="vertical"
          v-if="permissionList.isUpdate"
        ></el-divider>
        <el-button
          v-if="permissionList.isDelete"
          size="mini"
          type="text"
          style="color: #f56c6c"
          @click="handleDeleteClick(scope.row)"
          >删除</el-button
        >
      </template>

      <!-- 在page-content中动态插入剩余的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </hy-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watchEffect } from 'vue'
import { useStore } from '@/store'
// import { usePermission } from '@/hooks/use-permission'

import HyTable from '@/base-ui/table'
import { PermissionType } from '@/types/permission'

export default defineComponent({
  name: 'PageContent',
  components: {
    HyTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      required: true
    },
    // 公共化处理，传入不同的action名字，请求不用页面数据
    storeTypeInfo: {
      type: Object,
      default: () => ({
        actionName: 'system/getPageListAction',
        actionListName: 'system/pageListData',
        actionCountName: 'system/pageListCount'
      })
    }
  },
  emits: [
    'drawBtnClick',
    'newBtnClick',
    'editBtnClick',
    'removeBtnClick',
    'selectAllBtnClick',
    'distributionBtnClick',
    'operationBtnClick',
    'exportBtnClick',
    'rowBtnClick'
  ],
  setup(props, { emit }) {
    const store = useStore()
    const userSelectData = ref([])
    // 0.获取操作的权限
    const permission = props.contentTableConfig?.permission as PermissionType
    const permissionList = ref({
      isCreate: permission.add ?? false,
      isUpdate: permission.update ?? false,
      isDelete: permission.delete ?? false,
      isQuery: permission.query ?? true,
      isOperation: permission.operation ?? false,
      isDistribution: permission.distribution ?? false,
      isExport: permission.export ?? false,
      isSelectAll: permission.selectAll ?? false,
      isDrawTable: permission.drawTable ?? false,
      isRowAdd: permission.rowAdd ?? false
    })
    // const isCreate = usePermission(props.pageName, 'create')
    // const isUpdate = usePermission(props.pageName, 'update')
    // const isDelete = usePermission(props.pageName, 'delete')
    // const isQuery = usePermission(props.pageName, 'query')

    // 1.双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    // watch(pageInfo, () => getPageData())
    // 2.发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (!permissionList.value.isQuery) return
      store.dispatch(props.storeTypeInfo?.actionName, {
        pageName: props.pageName,
        queryInfo: {
          // currentPage: pageInfo.value.currentPage * pageInfo.value.pageSize, //使用偏移量
          currentPage: pageInfo.value.currentPage,
          pageSize: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    watchEffect(() => getPageData())
    // getPageData()

    // 3.从vuex中获取数据
    const dataList = computed(() => {
      return store.getters[props?.storeTypeInfo?.actionListName](props.pageName)
    })
    const dataCount = computed(() => {
      return store.getters[props?.storeTypeInfo?.actionCountName](
        props.pageName
      )
    })

    // 4.获取其他的动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'status') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )

    // 5.删除/编辑/新建/多选/分配/操作日志/拖拽/批量操作/导出按钮
    // const handleDeleteClick = (item: any) => {
    //   // console.log(item)
    //   // store.dispatch('system/deletePageDataAction', {
    //   //   pageName: props.pageName,
    //   //   id: item.id
    //   // })
    //   emit('removeBtnClick', item)
    // }
    // TODO 处理用户拖动表格后更新数据
    const drawTable = (propsIndex: any) => {
      emit('drawBtnClick', propsIndex)
      // 以下事件交到外界处理，暂时不移动
      console.log(propsIndex)
      const cloneTableData = JSON.stringify(dataList.value)
      const data = JSON.parse(cloneTableData)
      const currentRow = data.splice(propsIndex.oldIndex, 1)[0]
      data.splice(propsIndex.newIndex, 0, currentRow) // 新数组重新排序, 改变值无需用到
      currentRow['sortIndex'] = propsIndex.newIndex + 1 // 根据用户拖动到的下标改变该行的位置并发送给后台
      console.log(
        currentRow,
        '当前行',
        propsIndex.newIndex,
        '当前行移动到的位置'
      )
    }
    const handleExportClick = () => emit('exportBtnClick')
    const handleSelectAllClick = () => emit('selectAllBtnClick', userSelectData)
    const handleDeleteClick = (item: any) => emit('removeBtnClick', item)
    const handleNewClick = () => emit('newBtnClick')
    const handleAddRowClick = (item: any) => emit('newBtnClick', item)
    const handleEditClick = (item: any) => emit('editBtnClick', item)
    // 这里只需要将用户选中的值传递出去就行
    const handleSelectionChange = (item: any) => (userSelectData.value = item)
    const handleDistributionClick = (item: any) =>
      emit('distributionBtnClick', item)
    const handleOperationClick = (item: any) => emit('operationBtnClick', item)
    return {
      dataList,
      dataCount,
      pageInfo,
      otherPropSlots,
      permissionList,
      userSelectData,
      getPageData,
      drawTable,
      handleDeleteClick,
      handleNewClick,
      handleEditClick,
      handleSelectionChange,
      handleDistributionClick,
      handleOperationClick,
      handleSelectAllClick,
      handleExportClick,
      handleAddRowClick
    }
  }
})
</script>

<style scoped lang="less">
.page-content {
  padding: 20px;
  // border-top: 20px solid #f0f2f5;
}
</style>
