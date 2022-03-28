<template>
  <div class="item-flex">
    <span class="item-title">地区</span>
    <el-select
      placeholder="请选择国家地区，不选默认全部"
      style="width: 100%"
      clearable
      v-model="areaIds"
      multiple
      collapse-tags
      @change="handleChangeCountry($event)"
    >
      <el-option
        v-for="option in countryList"
        :key="option.id"
        :value="option.id"
        :label="option.name"
        >{{ option.name }}</el-option
      >
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  countryList: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits({
  changeCountry: null
})

function handleChangeCountry(item: any) {
  emit('changeCountry', item)
}
</script>

<style scoped></style>
