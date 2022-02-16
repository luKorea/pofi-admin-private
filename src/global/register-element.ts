/*
 * @Author: korealu
 * @Date: 2022-02-08 09:29:11
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-16 10:15:46
 * @Description: file content
 * @FilePath: /pofi-admin/src/global/register-element.ts
 */
import { App } from 'vue'
import 'element-plus/lib/theme-chalk/base.css'
import {
  ElScrollbar,
  ElTag,
  ElAside,
  ElAvatar,
  ElButton,
  ElCheckbox,
  ElContainer,
  ElDatePicker,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElForm,
  ElFormItem,
  ElHeader,
  ElInput,
  ElLink,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElOption,
  ElRadio,
  ElRow,
  ElCol,
  ElSelect,
  ElSubmenu,
  ElTabPane,
  ElTabs,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElImage,
  ElDialog,
  ElTree,
  ElDrawer,
  ElInputNumber,
  ElCheckboxButton,
  ElPopconfirm,
  ElUpload
} from 'element-plus'

const components = [
  ElScrollbar,
  ElTag,
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
  ElTabs,
  ElTabPane,
  ElCheckbox,
  ElCheckboxButton,
  ElLink,
  ElContainer,
  ElHeader,
  ElMain,
  ElAside,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubmenu,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElCol,
  ElRow,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElImage,
  ElDialog,
  ElTree,
  ElDrawer,
  ElInputNumber,
  ElCheckbox,
  ElCheckboxButton,
  ElPopconfirm,
  ElUpload
]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
