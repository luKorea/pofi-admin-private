/* eslint-disable vue/valid-v-slot */
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
      ref="tableRef"
      :showHeader="showHeader"
      :showSearch="showSearch"
    >
      <!-- 用户其他操作 -->
      <template #otherHandler>
        <slot name="otherHandler"></slot>
      </template>
      <!-- 1.header中的插槽 -->
      <template #headerHandler>
        <el-button
          v-if="permissionList.isCreate"
          type="primary"
          size="mini"
          @click="handleNewClick"
        >
          新建数据
        </el-button>
        <el-button
          v-if="permissionList.isColumnAdd"
          type="primary"
          size="mini"
          @click="handleNewColumnClick"
        >
          新建表格数据
        </el-button>
        <el-button
          size="mini"
          icon="el-icon-refresh"
          @click="handleRefreshClick"
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
        <span>{{ $filters.formatTime(scope.row.modTime) }}</span>
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
        <!-- <el-divider
          direction="vertical"
          v-if="permissionList.isOperation"
        ></el-divider> -->
        <el-button
          v-if="permissionList.isOperation"
          size="mini"
          type="text"
          style="color: rgb(180, 141, 222)"
          @click="handleOperationClick(scope.row)"
        >
          操作日志
        </el-button>
        <el-button
          v-if="permissionList.isRowAdd"
          size="mini"
          type="text"
          @click="handleAddRowClick(scope.row)"
        >
          新增
        </el-button>
        <!-- <el-divider
          direction="vertical"
          v-if="permissionList.isRowAdd"
        ></el-divider> -->
        <!-- <el-button
          v-if="permissionList.isRowAdd"
          size="mini"
          type="text"
          @click="handleAddRowClick(scope.row)"
        >
          新增
        </el-button>
        <el-divider
          direction="vertical"
          v-if="permissionList.isUpdate"
        ></el-divider> -->
        <el-button
          v-if="permissionList.isUpdate"
          size="mini"
          type="text"
          @click="handleEditClick(scope.row)"
        >
          编辑
        </el-button>
        <!-- <el-divider
          direction="vertical"
          v-if="permissionList.isDelete"
        ></el-divider> -->
        <el-button
          v-if="permissionList.isDelete"
          size="mini"
          type="text"
          style="color: #f56c6c"
          @click="handleDeleteClick(scope.row)"
          >删除</el-button
        >
        <el-button
          v-if="permissionList.isColumnDelete"
          size="mini"
          type="text"
          style="color: #f56c6c"
          @click="handleDeleteColumnClick(scope.row)"
          >删除</el-button
        >
        <!-- 扩展其他操作 -->
        <slot name="otherTableHandler" :row="scope.row"></slot>
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
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'
// import { usePermission } from '@/hooks/use-permission'

import HyTable from '@/base-ui/table'
import { PermissionType } from '@/types/permission'
import { infoTipBox, successTip, errorTip } from '@/utils/tip-info'

export default defineComponent({
  name: 'PageContent',
  components: {
    HyTable
  },
  props: {
    showHeader: {
      type: Boolean,
      default: true
    },
    showSearch: {
      type: Boolean,
      default: false
    },
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
        actionCountName: 'system/pageListCount',
        deleteAction: 'system/deletePageDataAction',
        sortAction: 'system/sortPageDataAction'
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
    const tableRef = ref()
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
      isRowAdd: permission.rowAdd ?? false,
      isColumnAdd: permission.columnAdd ?? false,
      isColumnEdit: permission.columnEdit ?? false,
      isColumnDelete: permission.columnDelete ?? false
    })
    // const isCreate = usePermission(props.pageName, 'create')
    // const isUpdate = usePermission(props.pageName, 'update')
    // const isDelete = usePermission(props.pageName, 'delete')
    // const isQuery = usePermission(props.pageName, 'query')

    // 1.双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    const backQueryInfo = ref<any>({})
    watch(pageInfo, () => {
      getPageData(backQueryInfo.value)
    })
    const handleRefreshClick = () => {
      // pageInfo.value = { currentPage: 1, pageSize: 10 }
      getPageData(backQueryInfo.value)
    }
    // 2.发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      console.log(queryInfo, '用户传递的参数')
      backQueryInfo.value = queryInfo
      if (!permissionList.value.isQuery) return
      store.dispatch(props.storeTypeInfo?.actionName, {
        pageName: props.pageName,
        queryInfo: {
          // currentPage: pageInfo.value.currentPage * pageInfo.value.pageSize, //使用偏移量
          currentPage: pageInfo.value.currentPage,
          pageSize: pageInfo.value.pageSize,
          ...backQueryInfo.value
        }
      })
    }
    // watchEffect(() => getPageData())
    getPageData()
    let dataList = computed(() => {
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
    let index = 0
    const handleNewColumnClick = () => {
      const object = {
        id: '',
        name: '',
        limitNum: '',
        createTime: '',
        index: index++
      }
      dataList.value.push(object)
    }
    const handleDeleteColumnClick = (item: any) => {
      const index = dataList.value.findIndex(
        (res: any) => res.index === item.index
      )
      dataList.value.splice(index, 1)
    }
    const handleDeleteClick = (item: any) => {
      infoTipBox({
        message: '您确定删除吗',
        title: '删除数据'
      })
        .then(() => {
          console.log(item)
          store.dispatch(props.storeTypeInfo.deleteAction, {
            pageName: props.pageName,
            queryInfo: item
          })
        })
        .catch(() => console.log('用户取消操作'))
    }
    // TODO 处理用户拖动表格后更新数据, 后续更改为通过用户传递action处理
    const drawTable = (data: any) => {
      // emit('drawBtnClick', data)
      const idList = data.map((item: any) => item.id)
      store
        .dispatch(props.storeTypeInfo.sortAction, {
          pageName: props.pageName,
          sortData: {
            idList: JSON.stringify(idList)
          }
        })
        .then((res: any) => {
          successTip(res)
        })
        .catch((err: any) => errorTip(err))
    }
    const handleExportClick = () => emit('exportBtnClick')
    const handleSelectAllClick = () => emit('selectAllBtnClick', userSelectData)
    // const handleDeleteClick = (item: any) => emit('removeBtnClick', item)
    const handleNewClick = () => emit('newBtnClick')
    const handleAddRowClick = (item: any) => emit('newBtnClick', item)
    const handleEditClick = (item: any) => emit('editBtnClick', item)
    // 这里只需要将用户选中的值传递出去就行
    const handleSelectionChange = (item: any) => emit('selectAllBtnClick', item)
    const handleDistributionClick = (item: any) =>
      emit('distributionBtnClick', item)
    const handleOperationClick = (item: any) => emit('operationBtnClick', item)
    return {
      tableRef,
      dataList,
      dataCount,
      pageInfo,
      otherPropSlots,
      permissionList,
      userSelectData,
      backQueryInfo,
      getPageData,
      drawTable,
      handleDeleteClick,
      handleNewClick,
      handleEditClick,
      handleRefreshClick,
      handleSelectionChange,
      handleDistributionClick,
      handleOperationClick,
      handleSelectAllClick,
      handleExportClick,
      handleAddRowClick,
      handleNewColumnClick,
      handleDeleteColumnClick
    }
  }
})
</script>

<style scoped lang="less">
.page-content {
  // padding: 20px;
  // border-top: 20px solid #f0f2f5;
}
</style>
