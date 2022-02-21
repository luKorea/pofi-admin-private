/*
 * @Author: korealu
 * @Date: 2022-02-08 09:29:11
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-21 11:16:54
 * @Description: file content
 * @FilePath: /pofi-admin/src/global/register-element.ts
 */
import { App } from 'vue'
import 'element-plus/lib/theme-chalk/base.css'
import {
  ElIcon,
  ElTooltip,
  ElCard,
  ElDivider,
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
  ElUpload,
  ElRadioGroup
} from 'element-plus'

const components = [
  ElIcon,
  ElTooltip,
  ElCard,
  ElDivider,
  ElScrollbar,
  ElTag,
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadioGroup,
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
