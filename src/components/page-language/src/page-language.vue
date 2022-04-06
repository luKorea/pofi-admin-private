<template>
  <!-- 暂时只做选择封装，后续有时间再做表单封装 -->
  <el-divider
    >{{ title }} (
    <span style="font-size: 12px; color: #ccc"
      >请确保带<span style="color: #f56c6c">*</span>号的字段填写完整</span
    >
    )
  </el-divider>
  <el-row>
    <el-col :span="3">
      <div class="item-flex">
        <el-card>
          <span class="item-title">多语言选择</span>
          <div class="wrap">
            <template v-for="item in languageBtnList" :key="item.id">
              <div
                class="item"
                :class="item.id === languageId && 'active'"
                @click="handleChangeLanguage(item.id)"
              >
                <!-- 后续完善 -->
                <i
                  :class="item.icon"
                  :style="{
                    color:
                      item.icon === 'el-icon-warning'
                        ? 'rgb(245, 108, 108)'
                        : 'rgb(103, 194, 58)'
                  }"
                ></i>
                {{ item.name }}
              </div>
            </template>
          </div>
        </el-card>
      </div>
    </el-col>
    <el-col :span="20">
      <slot name="formItem"></slot>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'PageLanguage',
  props: {
    title: {
      type: String,
      default: '多语言配置'
    },
    languageBtnList: {
      type: Array,
      default: () => []
    },
    languageId: {
      type: [String, Number]
    },
    languageList: {
      type: Array,
      default: () => []
    },
    editorFileName: {
      type: String,
      default: 'base/'
    }
  },
  emits: ['changeLanguage'],
  setup(props, { emit }) {
    const handleChangeLanguage = (item: any) => {
      emit('changeLanguage', item)
    }
    return {
      // languageItem,
      handleChangeLanguage
    }
  }
})
</script>

<style scoped lang="less">
.wrap {
  width: 120px;
  display: flex;
  flex-direction: column;
  .item {
    display: flex;
    align-items: center;
    height: 40px;
    line-height: 40px;
    width: 100%;
    cursor: pointer;
    i {
      margin: 0 10px 0 6px;
    }
    &:hover {
      color: #409eff;
    }
  }
  .active {
    background: #eaeaec;
    border-radius: 4px;
    color: #409eff;
  }
}
</style>
