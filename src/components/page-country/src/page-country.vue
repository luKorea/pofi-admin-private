<!--
 * @Author: korealu
 * @Date: 2022-02-16 17:28:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-18 10:48:11
 * @Description: file content
 * @FilePath: /pofi-admin/src/components/page-country/src/page-country.vue
-->
<template>
  <div class="page-country">
    <el-card
      style="
        position: fixed;
        height: calc(100vh - 80px - 50px);
        overflow: hidden;
        overflow-y: scroll;
      "
    >
      <div class="wrap">
        <div style="color: rgb(182, 176, 176); font-size: 14px">国家地区</div>
        <el-divider style="margin: 10px 0"></el-divider>
        <template v-if="countryList && countryList.length > 0">
          <template v-for="(item, index) in countryList" :key="item.id">
            <div
              class="item"
              :class="index === currentIndex && 'active'"
              @click="selectItem(item, index)"
            >
              {{ item.name }}
            </div>
            <!-- <el-tooltip :content="item.name" placement="right-start">

            </el-tooltip> -->
          </template>
        </template>
        <template v-else>
          <div>暂无数据</div>
        </template>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'PageCountry',
  props: {
    countryList: {
      type: Array,
      require: true
    }
  },
  emits: ['selectCountryItem'],
  setup(_, { emit }) {
    const currentIndex = ref(0)
    const selectItem = (item: any, index: string) => {
      if (currentIndex.value === +index) return
      currentIndex.value = +index
      emit('selectCountryItem', item)
    }
    return {
      currentIndex,
      selectItem
    }
  }
})
</script>

<style lang="less" scoped>
.page-country {
  margin-right: 20px;
  .wrap {
    width: 120px;
    display: flex;
    flex-direction: column;
    .item {
      height: 40px;
      line-height: 40px;
      width: 100%;
      cursor: pointer;
    }
    .item:hover {
      color: #409eff;
    }
    .active {
      background: #eaeaec;
      border-radius: 4px;
      color: #409eff;
    }
  }
}
</style>
