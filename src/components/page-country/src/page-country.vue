<!--
 * @Author: korealu
 * @Date: 2022-02-16 17:28:04
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-04 16:03:09
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
        <!-- <div class="search-country">
          <el-input
            v-model="searchName"
            placeholder="高级检索"
            suffix-icon="el-icon-search"
            clearable
            size="mini"
          ></el-input>
        </div> -->
        <div style="color: rgb(182, 176, 176); font-size: 14px">国家地区</div>
        <el-divider style="margin: 10px 0"></el-divider>
        <template v-if="filterCountry && filterCountry.length > 0">
          <template v-for="(item, index) in filterCountry" :key="item.id">
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
          <div style="color: #b6b0b0; font-size: 14px">暂无数据</div>
        </template>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { _debounce } from '@/utils'
export default defineComponent({
  name: 'PageCountry',
  props: {
    countryList: {
      type: Array,
      require: true
    }
  },
  emits: ['selectCountryItem'],
  setup(props, { emit }) {
    const currentIndex = ref(0)
    const searchName = ref<string>()
    const filterCountry = computed(() =>
      (props.countryList as any[]).filter(
        (data) =>
          !searchName.value ||
          data.name.toLowerCase().includes(searchName.value.toLowerCase())
      )
    )
    const selectItem = _debounce((item: any, index: string) => {
      // if (currentIndex.value === +index) return
      currentIndex.value = +index
      emit('selectCountryItem', item)
    }, 200)
    return {
      searchName,
      filterCountry,
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
