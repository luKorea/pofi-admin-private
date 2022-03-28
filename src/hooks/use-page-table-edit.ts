import { ref } from 'vue'
export function useEditTableData() {
  const listData = ref<any>([])
  const newTableData = (field: any) => {
    listData.value.push(field)
  }
  const deleteTableData = (editId: any) => {
    const index = listData.value.findIndex((res: any) => res.editId === editId)
    listData.value.splice(index, 1)
  }

  return [listData, newTableData, deleteTableData]
}
