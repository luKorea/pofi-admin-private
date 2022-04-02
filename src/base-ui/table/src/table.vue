<template>
  <div class="hy-table table-container" ref="HyTableRef">
    <el-card>
      <template #header v-if="showHeader">
        <div class="header">
          <slot name="header">
            <div class="flex-title">
              <div class="title">
                {{ title }}
              </div>
            </div>
            <div class="handler">
              <el-input
                v-if="showSearch"
                size="mini"
                v-model="search"
                placeholder="请输入内容"
                suffix-icon="el-icon-search"
                style="margin-right: 10px"
                clearable
              ></el-input>
              <slot name="otherHandler"></slot>
              <slot name="headerHandler"></slot>
            </div>
          </slot>
        </div>
      </template>
      <el-table
        :data="filterTableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-bind="childrenProps"
        empty-text="暂时没有其他数据"
        ref="tableRef"
        class="animate__animated animate__fadeIn"
      >
        <el-table-column
          v-if="handleDraw"
          label="拖拽排序"
          align="center"
          width="100"
        >
          <template #default>
            <i class="el-icon-menu"></i>
          </template>
        </el-table-column>
        <el-table-column
          v-if="showSelectColumn"
          type="selection"
          align="center"
          width="60"
        ></el-table-column>
        <el-table-column
          v-if="showIndexColumn"
          type="index"
          label="序号"
          align="center"
          width="80"
        ></el-table-column>
        <template v-for="propItem in propList" :key="propItem.prop">
          <el-table-column
            v-bind="propItem"
            :align="propItem.align ? propItem.align : 'center'"
            show-overflow-tooltip
          >
            <template #default="scope">
              <!-- 动态插槽，动态作用域插槽 -->
              <slot :name="propItem.slotName" :row="scope.row">
                <template v-if="!propItem.editInfo">
                  {{ scope.row[propItem.prop] }}
                </template>
                <template v-else>
                  <template v-if="propItem.editInfo.type === 'input'">
                    <el-input
                      v-model="scope.row[propItem.prop]"
                      :placeholder="propItem.editInfo.placeholder"
                      :disabled="propItem.editInfo.disabled"
                      clearable
                    ></el-input>
                  </template>
                  <template v-if="propItem.editInfo.type === 'textarea'">
                    <el-input
                      type="textarea"
                      clearable
                      v-bind="propItem.editInfo.otherOptions"
                      v-model="scope.row[propItem.prop]"
                      :placeholder="propItem.editInfo.placeholder"
                      :disabled="propItem.editInfo.disabled"
                    ></el-input>
                  </template>
                  <template
                    v-else-if="
                      propItem.editInfo.type === 'datepicker' ||
                      propItem.editInfo.type === 'datetimerange' ||
                      propItem.editInfo.type === 'date' ||
                      propItem.editInfo.type === 'datetime'
                    "
                  >
                    <el-date-picker
                      style="width: 100%"
                      :type="propItem.editInfo.type"
                      v-bind="propItem.editInfo.otherOptions"
                      v-model="scope.row[propItem.prop]"
                    ></el-date-picker>
                  </template>
                  <template v-else-if="propItem.editInfo.type === 'upload'">
                    <hyUpload
                      :limit="1"
                      :showWidth="80"
                      :showHeight="80"
                      v-model:value="scope.row[propItem.prop]"
                      :fileTypeName="propItem.editInfo.fileTypeName"
                    ></hyUpload>
                  </template>
                  <template v-else-if="propItem.editInfo.type === 'handler'">
                    <slot name="handler" :row="scope.row"></slot>
                  </template>
                  <template v-else-if="propItem.editInfo.type === 'other'">
                    <slot name="other" :row="scope.row"></slot>
                  </template>
                </template>
              </slot>
            </template>
          </el-table-column>
        </template>
      </el-table>
      <div class="footer" v-if="showFooter">
        <slot name="footer">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            :page-sizes="[10, 20, 40, 60, 80, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="listCount"
          >
          </el-pagination>
        </slot>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  computed,
  watchEffect,
  watch
} from 'vue'
import SortTable from 'sortablejs'
import { ElTable } from 'element-plus'
import hyUpload from '@/base-ui/upload'

export default defineComponent({
  components: {
    hyUpload
  },
  props: {
    showHeader: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: '400px'
    },
    listData: {
      type: Array,
      required: true
    },
    listCount: {
      type: Number,
      default: 0
    },
    propList: {
      type: Array,
      required: true
    },
    // 是否显示序号
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    // 是否显示多选
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    // 分页数据
    page: {
      type: Object,
      default: () => ({ currentPage: 1, pageSize: 10 })
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    // 展示底部分页器
    showFooter: {
      type: Boolean,
      default: true
    },
    // 控制表格是否可以拖动
    handleDraw: {
      type: Boolean,
      default: false
    },
    editTableDraw: {
      type: Boolean,
      default: false
    },
    showSearch: {
      type: Boolean,
      default: false
    }
  },
  emits: ['selectionChange', 'update:page', 'drawTable'],
  setup(props, { emit }) {
    const HyTableRef = ref()
    const tableRef = ref<InstanceType<typeof ElTable>>()
    const search = ref('')
    const expandRow = ref<any>([])
    // 目前只做树形搜索
    const filterTableData = computed(() => {
      if (search.value !== '') {
        setExpandRow(props.listData)
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        expandRow.value = expandRow.value.join(',').split(',')
        return handleTreeData(props.listData, search.value)
      } else {
        return props.listData
      }
    })
    //  树形表格过滤
    const handleTreeData = (treeData: any, searchValue: any): any => {
      if (!treeData || treeData.length === 0) {
        return []
      }
      const array = []
      for (let i = 0; i < treeData.length; i += 1) {
        let match: any = false
        for (let pro in treeData[i]) {
          if (typeof treeData[i][pro] == 'string') {
            match |= treeData[i][pro].includes(searchValue)
            if (match) break
          }
        }
        if (
          handleTreeData(treeData[i].children, searchValue).length > 0 ||
          match
        ) {
          array.push({
            ...treeData[i],
            children: handleTreeData(treeData[i].children, searchValue)
          })
        }
      }
      return array
    }
    // 将过滤好的树形数据展开
    const setExpandRow = (handleTreeData: any) => {
      if (handleTreeData.length) {
        for (let i of handleTreeData) {
          expandRow.value.push(i.id)
          if (i.children.length) {
            setExpandRow(i.children)
          }
        }
      }
    }
    onMounted(() => {
      if (props.handleDraw) {
        handleSortTable()
      }
    })
    // TODO 表格拖动
    const handleSortTable = () => {
      const element = document.getElementsByTagName('tbody')
      const tableSort = ref<HTMLElement | null>()
      if (props.editTableDraw) {
        tableSort.value = element[1]
      } else {
        tableSort.value = element[0]
      }
      console.log(tableSort.value, 'table')
      new SortTable(tableSort.value, {
        animation: 500,
        onEnd(evt: any) {
          let data = [...props.listData]
          data.splice(evt.newIndex, 0, data.splice(evt.oldIndex, 1)[0])
          const newArray = data.slice(0)
          emit('drawTable', newArray)
        }
      })
    }
    // 多选操作
    const handleSelectionChange = (value: any) => emit('selectionChange', value)
    // 分页操作
    const handleCurrentChange = (currentPage: number) =>
      emit('update:page', { ...props.page, currentPage })
    const handleSizeChange = (pageSize: number) =>
      emit('update:page', { ...props.page, pageSize })
    return {
      expandRow,
      HyTableRef,
      filterTableData,
      search,
      handleSelectionChange,
      handleCurrentChange,
      handleSizeChange,
      tableRef
    }
  }
})
</script>

<style scoped lang="less">
.table-container {
  &:deep(.el-card__header) {
    padding: 10px 20px !important;
  }
}
</style>

<style>
.el-popper.is-dark {
  max-width: 220px !important;
  line-height: 20px;
}
.expanded {
  color: #f56c6c;
  font-weight: 800;
}
</style>
