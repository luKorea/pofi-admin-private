/*
 * @Author: korealu
 * @Date: 2022-02-08 09:29:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-24 14:37:42
 * @Description: file content
 * @FilePath: /pofi-admin/src/global/register-element.ts
 */
import { App } from 'vue'
import XEUtils from 'xe-utils'
import zhCN from 'vxe-table/lib/locale/lang/zh-CN'

import {
  // 核心
  VXETable,
  // 表格功能
  Header,
  Footer,
  Icon,
  Filter,
  Edit,
  Menu,
  Export,
  Keyboard,
  Validator,

  // 可选组件
  Column,
  Colgroup,
  Grid,
  Tooltip,
  Toolbar,
  Pager,
  Form,
  FormItem,
  FormGather,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  RadioButton,
  Switch,
  Input,
  Select,
  Optgroup,
  Option,
  Textarea,
  Button,
  Modal,
  List,
  Pulldown,

  // 表格
  Table
} from 'vxe-table'
// 按需加载的方式默认是不带国际化的，自定义国际化需要自行解析占位符 '{0}'，例如：
VXETable.setup({
  i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args)
})

const components = [
  Table,
  Header,
  Column,
  Colgroup,
  Grid,
  Tooltip,
  Toolbar,
  Pager,
  Form,
  FormItem,
  FormGather,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  RadioButton,
  Switch,
  Input,
  Select,
  Optgroup,
  Option,
  Textarea,
  Button,
  Modal,
  List,
  Pulldown,
  Footer,
  Icon,
  Filter,
  Edit,
  Menu,
  Export,
  Keyboard,
  Validator
]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
