<template>
  <div>用户审核</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStoreName } from './hook/use-page-list'
import { useStore } from '@/store'

export default defineComponent({
  setup() {
    const [storeTypeInfo, operationName] = useStoreName()
    const store = useStore()
    const getData = () => {
      store.dispatch('auditUserModifyModule/getPageListAction', {
        pageName: 'userModifys'
      })
    }
    getData()
    const dataList = computed(() => {
      return store.getters['auditUserModifyModule/pageListData']('userModifys')
    })
    const dataCount = computed(() => {
      return store.getters['auditUserModifyModule/pageListCount']('userModifys')
    })
    return {
      storeTypeInfo,
      operationName,
      dataList,
      dataCount
    }
  }
})
</script>

<style scoped></style>
