<!--
 * @Author: korealu
 * @Date: 2022-02-08 17:41:28
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-08 18:29:08
 * @Description: file content
 * @FilePath: /pofi-admin/src/components/nav-tags/src/nav-tags.vue
-->
<template>
  <div class="nav-tags">
    <el-tag class="tags" :key="tag.name" v-for="tag in tags">{{
      tag.name
    }}</el-tag>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
export default defineComponent({
  setup() {
    const store = useStore()
    let tags = computed(() => store.state.tagsList)
    return {
      tags
    }
  }
})
</script>

<style lang="less" scoped>
.nav-tags {
  width: 100%;
  height: 42px;
  line-height: 37px;
  padding: 0 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
  .tags {
    margin-right: 4px;
    cursor: pointer;
  }
}
</style>
