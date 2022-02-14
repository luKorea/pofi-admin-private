<template>
  <div class="page-content">
    <hy-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
      @drawTable="drawTable"
      @selectionChange="handleSelectionChange"
      :handleDraw="permission?.drawTable"
    >
      <!-- 1.header中的插槽 -->
      <template #headerHandler>
        <el-button
          v-if="isCreate"
          type="primary"
          size="medium"
          @click="handleNewClick"
        >
          新建用户
        </el-button>
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
        <div class="hg-flex hg-justify-center">
          <slot name="other" v-if="isOther"></slot>
          <el-button
            v-if="isUpdate"
            icon="el-icon-edit"
            size="mini"
            type="text"
            @click="handleEditClick(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            v-if="isDelete"
            icon="el-icon-delete"
            size="mini"
            type="text"
            style="color: #f56c6c"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
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

export default defineComponent({
  components: {
    HyTable
  },
  props: {
    permission: {
      type: Object,
      default: () => ({})
    },
    contentTableConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  emits: [
    'drawBtnClick',
    'newBtnClick',
    'editBtnClick',
    'removeBtnClick',
    'selectBtnClick'
  ],
  setup(props, { emit }) {
    const store = useStore()
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

    // 0.获取操作的权限
    const isCreate = props.permission?.add as any
    const isUpdate = props.permission?.update as any
    const isDelete = props.permission?.delete as any
    const isQuery = true
    const isOther = props.permission?.other as any
    // const isCreate = usePermission(props.pageName, 'create')
    // const isUpdate = usePermission(props.pageName, 'update')
    // const isDelete = usePermission(props.pageName, 'delete')
    // const isQuery = usePermission(props.pageName, 'query')

    // 1.双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageData())

    // 2.发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          currentPage:
            (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          pageSize: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    // 3.从vuex中获取数据
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )

    // 4.获取其他的动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'status') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        if (item.slotName === 'image') return false
        if (item.slotName === 'video') return false
        return true
      }
    )

    // 5.删除/编辑/新建/多选操作
    // const handleDeleteClick = (item: any) => {
    //   // console.log(item)
    //   // store.dispatch('system/deletePageDataAction', {
    //   //   pageName: props.pageName,
    //   //   id: item.id
    //   // })
    //   emit('removeBtnClick', item)
    // }
    const handleDeleteClick = (item: any) => emit('removeBtnClick', item)
    const handleNewClick = () => emit('newBtnClick')
    const handleEditClick = (item: any) => emit('editBtnClick', item)
    const handleSelectionChange = (data: any) => emit('selectBtnClick', data)
    return {
      drawTable,
      dataList,
      getPageData,
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      isOther,
      handleDeleteClick,
      handleNewClick,
      handleEditClick,
      handleSelectionChange
    }
  }
})
</script>

<style scoped lang="less">
.page-content {
  padding: 20px;
  border-top: 20px solid #f0f2f5;
}
</style>
