<template>
  <el-card class="box-card" :shadow="shadow">
    <template #header>
      <div class="card-header">
        <span class="title">{{ title }}</span>
        <slot name="handler"></slot>
      </div>
    </template>
    <div class="item">
      <slot></slot>
    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  components: {},

  props: {
    title: {
      type: String,
      default: 'Title'
    },
    shadow: {
      type: String,
      default: 'always'
    }
  },

  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.box-card {
  &:deep(.el-card__header) {
    padding: 10px 20px !important;
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  .title {
    font-size: 14px;
    color: #b6b0b0;
  }
}

.item {
  margin-bottom: 10px;
  // border: 1px solid red;
}
.footer {
  display: flex;
  justify-content: space-between;
}
</style>
