/*
 * @Author: korealu
 * @Date: 2022-02-14 15:50:22
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-16 13:44:26
 * @Description: file content
 * @FilePath: /pofi-admin/src/types/permission.ts
 */
export interface PermissionType {
  add?: boolean // 新增
  rowAdd?: boolean // 行增加
  update?: boolean // 编辑
  delete?: boolean // 删除
  query?: boolean // 查询
  drawTable?: boolean // 表格拖拽
  selectAll?: boolean // 批量操作
  operation?: boolean // 操作日志
  distribution?: boolean // 分配按钮
  export?: boolean // 导出
}
