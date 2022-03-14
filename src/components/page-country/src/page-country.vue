<!--
 * @Author: korealu
 * @Date: 2022-02-16 17:28:04
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-14 15:02:46
 * @Description: file content
 * @FilePath: /pofi-admin/src/components/page-country/src/page-country.vue
-->
<template>
  <div class="page-country">
    <template v-if="countryList && countryList.length > 0">
      <el-card style="height: 600px; overflow: hidden; overflow-y: scroll">
        <div class="wrap">
          <template v-for="(item, index) in countryList" :key="item.id">
            <el-tooltip :content="item.name" placement="right-start">
              <div
                class="item"
                :class="index === currentIndex && 'active'"
                @click="selectItem(item, index)"
              >
                {{ item.name }}
              </div>
            </el-tooltip>
          </template>
        </div>
      </el-card>
    </template>
    <template v-else>
      <div>暂无数据</div>
    </template>
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
