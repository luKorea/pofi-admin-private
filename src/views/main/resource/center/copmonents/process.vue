<template>
  <div>
    <page-dialog ref="pageProcessRef" title="上传流程图" showWidth="30%">
      <el-timeline>
        <template v-for="item in list" :key="item.id">
          <el-timeline-item
            :timestamp="item.step"
            :color="item.color"
            placement="top"
            class="hg-text-left"
          >
            <el-card>
              <h4>{{ item.content }}</h4>
            </el-card>
          </el-timeline-item>
        </template>
      </el-timeline>
    </page-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const pageProcessRef = ref<any>()
    const list = ref<any>([
      {
        id: 1,
        step: '步骤一',
        content: '填写类型属性',
        color: '#ABDCFF'
      },
      {
        id: 2,
        step: '步骤二',
        content: '填写资源资料（多语言）',
        color: '#FEB692'
      },
      { id: 3, step: '步骤三', content: '上传U3D文件', color: '#90F7EC' },
      { id: 4, step: '步骤四', content: '填写相关关联', color: '#FFD26F' },
      { id: 5, step: '步骤五', content: '修改时间状态', color: '#0bbd87' }
    ])
    return {
      pageProcessRef,
      list
    }
  }
})
</script>

<style scoped></style>
