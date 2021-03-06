# 页面复杂度整理 
### master 这是主分支文件，主要代码分布于pc分支pe分支，这里只做前期开发功能, 后续功能都在其余分支上开发

|     模块名      |    子模块    | 复杂度（1容易 2一般 3难） |                  功能实现                   | 完成程度  |                    bug                    |
| :-------------: | :----------: | :-----------------------: | :-----------------------------------------: | :-------: | :---------------------------------------: |
|                 |   角色管理   |             2             |                                             |  success  |                                           |
| <u>系统管理</u> |   权限管理   |             1             |                                             |  success  |                                           |
|                 |   用户管理   |             2             |                                             |  success  |                                           |
|                 |   路由列表   |             2             |                                             |  success  |                                           |
| <u>意见反馈</u> |   问题列表   |             3             |                                             |  nothing  |                                           |
| <u>审核管理</u> | 用户资料审核 |             3             |                                             |   half    |                                           |
| <u>商品中心</u> |   充值套餐   |             2             |                                             |   half    | 新增数据无效，高级检索无数据total返回错误 |
|                 |   功能套餐   |             2             |                                             |   half    |                                           |
|                 |   套餐文案   |             3             |                  多语言 2                   |   half    |                                           |
|                 |   资源商品   |             3             |                  多语言 1                   |   half    |                                           |
|  <u>资料库</u>  | 资源数据统计 |             2             |                                             |   half    |                                           |
|                 | 资源管理中心 |             3             |        (使用Hytable定制化)  (多语言)        |  Nothing  |                                           |
|                 |   专题管理   |             3             |     (国家侧边)  (多语言)  (可编辑表格)      |  Success  |                                           |
|                 |   首页管理   |             3             |      (国家侧边)  (多语言) (可编辑表格)      |  nothing  |                                           |
|                 |   系列管理   |             3             |                  (多语言)                   |  success  |             显示当前选中节点              |
|                 |   分类管理   |             3             |                  (多语言)                   |  success  |             显示当前选中节点              |
|                 |  关键词管理  |             3             |                  (多语言)                   |  success  |                                           |
| <u>基础设置</u> |   附件管理   |             2             |                                             |  nothing  |                                           |
|                 |   跳转设置   |             2             |            (自定义modal 下拉框)             |   half    |                                           |
|                 |   默认头像   |             2             |                                             |  success  |                                           |
|                 |  多语言管理  |             1             |                                             |  success  |                                           |
|                 |   配置管理   |             3             |        区分是否可搜索, 编辑,国家侧边        |  success  |                                           |
|                 |   地区管理   |             2             |                                             |  success  |                                           |
|                 |   版本管理   |             3             | (国家侧边) (自定义modal下拉框) (可编辑表格) |  nothing  |                                           |
|                 | 模块功能管理 |             1             |                                             |  success  |                                           |
| <u>用户中心</u> |   用户管理   |             2             |                                             |   half    |                                           |
| <u>设备管理</u> |   预警文案   |             2             |                                             |  nothing  |                                           |
|  合并三级路由   |   限制条件   |             2             |                                             |  success  |                                           |
|                 | 用户设备清单 |             2             |                                             |  success  |                                           |
| <u>财务中心</u> |   用户钱包   |             3             |                                             |  Success  |                                           |
|                 |   订单管理   |             2             |                                             |  success  |                                           |
|                 |   内测记录   |             2             |                                             |  success  |                                           |
| <u>帮助中心</u> |   使用指南   |             2             |                                             | (Success) |                                           |
|                 | 功能说明分类 |             2             |                                             | (Success) |                                           |
|                 |   功能说明   |             2             |                                             | (Success) |                                           |
|                 | 问题类型管理 |             2             |                                             | (success) |                                           |
|                 |   问题管理   |             2             |                                             |  Success  |                                           |
|                 |   联系账号   |             2             |            (自定义modal 下拉框)             |  nothing  |                                           |
| <u>活动中心</u> |  充值页活动  |             2             |                                             |  Nothing  |                                           |
| <u>广告中心</u> |   栏目广告   |             3             |             (国家侧边) (多语言)             |  nothing  |                                           |

# 公用页面划分
  1. 侧边国家划分
  2. 富文本编辑器
  3. 表格
  4. 表单
  5. 视频播放器
  6. 图片上传
# 功能需求
  1. 表格排序 sortable
  2. 富文本编辑器 wangeditor
# 插件
  1. tailwindcss插件

     ```shell
     1. npm install -D tailwindcss@latest postcss@latest autoprefixer@latest (安装 Tailwind 以及其它依赖项)
     2. npx tailwindcss init -p (生成 tailwind.config.js 和 postcss.config.js 文件)
     ```

  2. animate.css 动画库

  3. vxe-table 可编辑表格

  4. VueDragger 可拖拽

  2. Sortable 排序
# 该系统大致按钮权限划分
  1. 新增
  2. 编辑
  3. 查询
  4. 删除
  5. 分配（权限角色分配）
  6. 个性化按钮 (根据HyTable编写，不走page-content)
  7. 操作日志
  8. 导出
  9. 批量操作
  10. 表格拖拽
# 数据请求规范
  1. 所有数据存储到store中，划分不同模块
  2. 每个模块具体大致格式如下
          1. state: {存储当前页所需数据}
        2. getter: {通过getter获取数据}
      1. action: {
            封装公用action, 根据用户传入不同的pageName，请求不用的api地址，所有API地址放到service/apiList.ts中，
          action: add/remove/update/query 操作}
          4. mutations: {将获取到的数据设置到state中}

# 页面划分
  1. assets 静态资源文件
  2. base-ui 多项目公用组件
  3. components 当前项目组件
  4. global 全局注册
  5. hooks 公用hooks
  6. router 路由
  7. service 接口请求
  8. types 公用类型
  9. utils 工具函数
  10. views 视图
        11. store vuex
              1. system/ system.ts type.ts

# 项目上线打包优化
  1. npm install uglifyjs-webpack-plugin --save-dev （去除打印以及注释）



bug
1. upload图片上传闪动 / success
2. oss获取token设定时间自动清除
3. 后续将排序功能增加到page-content中

<!-- 接口文档地址 -->
http://47.243.49.122:38001/doc.html#/default/cms%E9%BB%98%E8%AE%A4%E5%A4%B4%E5%83%8F/updateHeadUsingPOST

# 使用命令动态创建页面
coderwhy add3page [pageName] -d src/views/main/[dirName]
```ABAP
├── README.md
├── babel.config.js
├── commitlint.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── loading.gif
├── push.sh
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── css
│   │   │   ├── base.css
│   │   │   ├── base.less
│   │   │   ├── index.less
│   │   │   └── transition.less
│   │   └── img
│   │       ├── login-bg.jpeg
│   │       ├── login-bg.png
│   │       ├── login-bg.svg
│   │       └── logo.svg
│   ├── base-ui
│   │   ├── breadcrumb
│   │   │   ├── index.ts
│   │   │   ├── src
│   │   │   │   └── breadcrumb.vue
│   │   │   └── types
│   │   │       └── index.ts
│   │   ├── card
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── card.vue
│   │   ├── count-up
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── countup.vue
│   │   ├── descriptions
│   │   │   ├── index.ts
│   │   │   ├── src
│   │   │   │   └── descriptions.vue
│   │   │   └── types
│   │   │       └── types.ts
│   │   ├── echart
│   │   │   ├── data
│   │   │   │   └── china.json
│   │   │   ├── hooks
│   │   │   │   └── useEchart.ts
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── base-echart.vue
│   │   ├── editor
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       ├── editor.vue
│   │   │       └── editorOSS.vue
│   │   ├── form
│   │   │   ├── index.ts
│   │   │   ├── src
│   │   │   │   └── form.vue
│   │   │   └── types
│   │   │       └── index.ts
│   │   ├── image
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── image.vue
│   │   ├── preview-video
│   │   │   ├── hook
│   │   │   │   └── use-video-show.ts
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── preview-video.vue
│   │   ├── table
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       ├── table copy.vue
│   │   │       └── table.vue
│   │   ├── upload
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       ├── draggerUpload.vue
│   │   │       ├── ossUpload.vue
│   │   │       ├── upload.vue
│   │   │       ├── uploadFile.vue
│   │   │       └── uploadSetup.vue
│   │   └── video
│   │       ├── index.ts
│   │       └── src
│   │           └── video.vue
│   ├── components
│   │   ├── nav-header
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       ├── nav-header.vue
│   │   │       └── user-info.vue
│   │   ├── nav-menu
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       ├── nav-menu copy.vue
│   │   │       ├── nav-menu-item.vue
│   │   │       └── nav-menu.vue
│   │   ├── nav-tags
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── nav-tags.vue
│   │   ├── page-content
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── page-content.vue
│   │   ├── page-content-coulmn
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── page-content.vue
│   │   ├── page-country
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── page-country.vue
│   │   ├── page-dialog
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── page-dialog.vue
│   │   ├── page-language
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── page-language.vue
│   │   ├── page-link
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── page-link.vue
│   │   ├── page-modal
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       ├── page-modal copy.vue
│   │   │       └── page-modal.vue
│   │   ├── page-search
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── page-search.vue
│   │   └── page-select-country
│   │       ├── index.ts
│   │       └── src
│   │           └── page-select-country.vue
│   ├── global
│   │   ├── index.ts
│   │   ├── register-element.ts
│   │   ├── register-global-component.ts
│   │   ├── register-properties.ts
│   │   └── register-vxe-table.ts
│   ├── hooks
│   │   ├── index.ts
│   │   ├── use-expiration-time.ts
│   │   ├── use-oss-config.ts
│   │   ├── use-page-dialog.ts
│   │   ├── use-page-language.ts
│   │   ├── use-page-modal.ts
│   │   ├── use-page-search.ts
│   │   ├── use-page-side-country.ts
│   │   ├── use-page-table-edit.ts
│   │   └── use-permission.ts
│   ├── index.css
│   ├── main.ts
│   ├── router
│   │   ├── index.ts
│   │   ├── login
│   │   │   └── index.ts
│   │   └── main
│   │       ├── activity
│   │       │   └── activityCharge
│   │       │       └── activityCharge.ts
│   │       ├── ad
│   │       │   └── banner
│   │       │       └── banner.ts
│   │       ├── audit
│   │       │   └── userModify
│   │       │       └── userModify.ts
│   │       ├── base
│   │       │   ├── accessory
│   │       │   │   └── accessory.ts
│   │       │   ├── area
│   │       │   │   └── area.ts
│   │       │   ├── config
│   │       │   │   └── config.ts
│   │       │   ├── fusing
│   │       │   │   └── fusing.ts
│   │       │   ├── head
│   │       │   │   └── head.ts
│   │       │   ├── jump
│   │       │   │   └── jump.ts
│   │       │   ├── language
│   │       │   │   └── language.ts
│   │       │   ├── testConfig
│   │       │   │   └── testConfig.ts
│   │       │   └── version
│   │       │       └── version.ts
│   │       ├── configuration
│   │       │   └── dayPush
│   │       │       └── dayPush.ts
│   │       ├── contentCenter
│   │       │   ├── creativeInspiration
│   │       │   │   └── creativeInspiration.ts
│   │       │   ├── painterWiki
│   │       │   │   ├── painterLibrary
│   │       │   │   │   └── painterLibrary.ts
│   │       │   │   └── painterTopic
│   │       │   │       └── painterTopic.ts
│   │       │   └── userExperience
│   │       │       └── userExperience.ts
│   │       ├── device
│   │       │   ├── condition
│   │       │   │   └── condition.ts
│   │       │   ├── description
│   │       │   │   └── description.ts
│   │       │   └── imei
│   │       │       └── imein.ts
│   │       ├── feedback
│   │       │   └── feedback
│   │       │       └── feedback.ts
│   │       ├── finance
│   │       │   ├── pay
│   │       │   │   └── pay.ts
│   │       │   ├── purse
│   │       │   │   └── purse.ts
│   │       │   ├── tradeRecord
│   │       │   │   └── tradeRecord.ts
│   │       │   └── warehouse
│   │       │       └── warehouse.ts
│   │       ├── goods
│   │       │   ├── description
│   │       │   │   └── description.ts
│   │       │   ├── function
│   │       │   │   └── function.ts
│   │       │   ├── good
│   │       │   │   └── good.ts
│   │       │   └── recharge
│   │       │       └── recharge.ts
│   │       ├── help
│   │       │   ├── account
│   │       │   │   └── account.ts
│   │       │   ├── companion
│   │       │   │   └── companion.ts
│   │       │   ├── function
│   │       │   │   └── function.ts
│   │       │   ├── functionType
│   │       │   │   └── functionType.ts
│   │       │   ├── question
│   │       │   │   └── question.ts
│   │       │   └── questionType
│   │       │       └── questionType.ts
│   │       ├── oa
│   │       │   ├── permission
│   │       │   │   └── permission.ts
│   │       │   ├── role
│   │       │   │   └── role.ts
│   │       │   ├── router
│   │       │   │   └── router.ts
│   │       │   └── user
│   │       │       └── user.ts
│   │       ├── resource
│   │       │   ├── center
│   │       │   │   └── center.ts
│   │       │   ├── classify
│   │       │   │   └── classify.ts
│   │       │   ├── data
│   │       │   │   └── data.ts
│   │       │   ├── index
│   │       │   │   └── index.ts
│   │       │   ├── keyword
│   │       │   │   └── keyword.ts
│   │       │   ├── series
│   │       │   │   └── series.ts
│   │       │   └── topic
│   │       │       └── topic.ts
│   │       ├── studyCenter
│   │       │   ├── classManagement
│   │       │   │   └── classManagement.ts
│   │       │   ├── courseManagement
│   │       │   │   └── courseManagement.ts
│   │       │   └── entityManagement
│   │       │       └── entityManagement.ts
│   │       ├── user
│   │       │   └── user
│   │       │       └── user.ts
│   │       └── userCenter
│   │           ├── certificationTitle
│   │           │   ├── certificationApprovingSystem
│   │           │   │   └── certificationApprovingSystem.ts
│   │           │   ├── certificationClassify
│   │           │   │   └── certificationClassify.ts
│   │           │   ├── certificationName
│   │           │   │   └── certificationName.ts
│   │           │   └── issueTheSystem
│   │           │       └── issueTheSystem.ts
│   │           ├── gloriousAchievements
│   │           │   └── gloriousAchievements.ts
│   │           ├── levelManagement
│   │           │   └── levelManagement.ts
│   │           └── organization
│   │               └── organization.ts
│   ├── service
│   │   ├── apiList.ts
│   │   ├── axios_demo.ts
│   │   ├── common
│   │   │   └── index.ts
│   │   ├── common-api.ts
│   │   ├── index.ts
│   │   ├── login
│   │   │   ├── login.ts
│   │   │   └── type.ts
│   │   ├── main
│   │   │   ├── audit
│   │   │   │   └── userModify.ts
│   │   │   ├── base
│   │   │   │   ├── config.ts
│   │   │   │   ├── head.ts
│   │   │   │   └── imei.ts
│   │   │   ├── device
│   │   │   │   ├── condition.ts
│   │   │   │   └── imei.ts
│   │   │   ├── feedback
│   │   │   │   └── feedback.ts
│   │   │   ├── finance
│   │   │   │   ├── pay.ts
│   │   │   │   ├── purse.ts
│   │   │   │   └── tradeRecord.ts
│   │   │   ├── goods
│   │   │   │   ├── function.ts
│   │   │   │   └── recharge.ts
│   │   │   ├── help
│   │   │   │   └── account.ts
│   │   │   ├── resource
│   │   │   │   ├── center.ts
│   │   │   │   ├── classify.ts
│   │   │   │   └── keywords.ts
│   │   │   ├── system
│   │   │   │   ├── role.ts
│   │   │   │   └── user.ts
│   │   │   └── userOperation
│   │   │       └── userOperation.ts
│   │   ├── request
│   │   │   ├── config.ts
│   │   │   ├── index.ts
│   │   │   └── type.ts
│   │   ├── types.ts
│   │   └── upload
│   │       └── index.ts
│   ├── shims-vue.d.ts
│   ├── store
│   │   ├── index.ts
│   │   ├── login
│   │   │   ├── login.ts
│   │   │   └── types.ts
│   │   ├── main
│   │   │   ├── ad
│   │   │   │   └── banner
│   │   │   │       ├── banner.ts
│   │   │   │       └── types.ts
│   │   │   ├── audit
│   │   │   │   └── userModify
│   │   │   │       ├── types.ts
│   │   │   │       └── userModify.ts
│   │   │   ├── base
│   │   │   │   ├── area
│   │   │   │   │   ├── area.ts
│   │   │   │   │   └── types.ts
│   │   │   │   ├── config
│   │   │   │   │   ├── config.ts
│   │   │   │   │   └── types.ts
│   │   │   │   ├── fusing
│   │   │   │   │   ├── fusing.ts
│   │   │   │   │   └── types.ts
│   │   │   │   ├── head
│   │   │   │   │   ├── head.ts
│   │   │   │   │   └── types.ts
│   │   │   │   ├── jump
│   │   │   │   │   ├── jump.ts
│   │   │   │   │   └── types.ts
│   │   │   │   ├── language
│   │   │   │   │   ├── language.ts
│   │   │   │   │   └── types.ts
│   │   │   │   └── version
│   │   │   │       ├── types.ts
│   │   │   │       └── version.ts
│   │   │   ├── contentCenter
│   │   │   │   ├── creativeInspiration
│   │   │   │   │   ├── creativeInspiration.ts
│   │   │   │   │   └── types.ts
│   │   │   │   ├── painterWiki
│   │   │   │   │   ├── painterLibrary
│   │   │   │   │   │   ├── painterLibrary.ts
│   │   │   │   │   │   └── types.ts
│   │   │   │   │   └── painterTopic
│   │   │   │   │       ├── painterTopic.ts
│   │   │   │   │       └── types.ts
│   │   │   │   └── userExperience
│   │   │   │       ├── types.ts
│   │   │   │       └── userExperience.ts
│   │   │   ├── device
│   │   │   │   ├── condition
│   │   │   │   │   ├── condition.ts
│   │   │   │   │   └── types.ts
│   │   │   │   └── imei
│   │   │   │       ├── imei.ts
│   │   │   │       └── types.ts
│   │   │   ├── feedback
│   │   │   │   ├── feedback.ts
│   │   │   │   └── types.ts
│   │   │   ├── finance
│   │   │   │   ├── pay
│   │   │   │   │   ├── pay.ts
│   │   │   │   │   └── types.ts
│   │   │   │   ├── purse
│   │   │   │   │   ├── purse.ts
│   │   │   │   │   └── types.ts
│   │   │   │   ├── tradeRecord
│   │   │   │   │   ├── tradeRecord.ts
│   │   │   │   │   └── types.ts
│   │   │   │   └── warehouse
│   │   │   │       ├── types.ts
│   │   │   │       └── warehouse.ts
│   │   │   ├── goods
│   │   │   │   ├── description
│   │   │   │   │   ├── description.ts
│   │   │   │   │   └── types.ts
│   │   │   │   ├── function
│   │   │   │   │   ├── function.ts
│   │   │   │   │   └── types.ts
│   │   │   │   ├── good
│   │   │   │   │   ├── good.ts
│   │   │   │   │   └── types.ts
│   │   │   │   └── recharge
│   │   │   │       ├── recharge.ts
│   │   │   │       └── types.ts
│   │   │   ├── help
│   │   │   │   ├── account
│   │   │   │   │   ├── account.ts
│   │   │   │   │   └── types.ts
│   │   │   │   ├── companion
│   │   │   │   │   ├── companion.ts
│   │   │   │   │   └── types.ts
│   │   │   │   ├── function
│   │   │   │   │   ├── function.ts
│   │   │   │   │   └── types.ts
│   │   │   │   ├── functionType
│   │   │   │   │   ├── functionType.ts
│   │   │   │   │   └── types.ts
│   │   │   │   ├── question
│   │   │   │   │   ├── question.ts
│   │   │   │   │   └── types.ts
│   │   │   │   └── questionType
│   │   │   │       ├── questionType.ts
│   │   │   │       └── types.ts
│   │   │   ├── resource
│   │   │   │   ├── center
│   │   │   │   │   ├── center.ts
│   │   │   │   │   └── types.ts
│   │   │   │   ├── classify
│   │   │   │   │   ├── classify.ts
│   │   │   │   │   └── types.ts
│   │   │   │   ├── data
│   │   │   │   │   ├── data.ts
│   │   │   │   │   └── types.ts
│   │   │   │   ├── index
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── series
│   │   │   │   │   │   ├── series.ts
│   │   │   │   │   │   └── types.ts
│   │   │   │   │   └── types.ts
│   │   │   │   ├── keyword
│   │   │   │   │   ├── keyword.ts
│   │   │   │   │   └── types.ts
│   │   │   │   ├── series
│   │   │   │   │   ├── series.ts
│   │   │   │   │   └── types.ts
│   │   │   │   └── topic
│   │   │   │       ├── topic.ts
│   │   │   │       └── types.ts
│   │   │   ├── system
│   │   │   │   ├── permission
│   │   │   │   │   ├── permission.ts
│   │   │   │   │   └── types.ts
│   │   │   │   ├── role
│   │   │   │   │   ├── role.ts
│   │   │   │   │   └── types.ts
│   │   │   │   ├── router
│   │   │   │   │   ├── router.ts
│   │   │   │   │   └── types.ts
│   │   │   │   └── user
│   │   │   │       ├── types.ts
│   │   │   │       └── user.ts
│   │   │   └── userOperation
│   │   │       ├── types.ts
│   │   │       └── userOperation.ts
│   │   └── types.ts
│   ├── test.json
│   ├── types
│   │   ├── permission.ts
│   │   └── table-config.ts
│   ├── utils
│   │   ├── cache.ts
│   │   ├── date-format.ts
│   │   ├── deepClone.ts
│   │   ├── exportExcel.ts
│   │   ├── index.ts
│   │   ├── map-menus.ts
│   │   ├── select-list
│   │   │   └── map-resource-list.ts
│   │   ├── tip-info.ts
│   │   └── transition.ts
│   └── views
│       ├── login 登录
│       │   ├── config
│       │   │   └── account-config.ts
│       │   ├── cpns
│       │   │   ├── login-account.vue
│       │   │   ├── login-panel.vue
│       │   │   └── login-phone.vue
│       │   └── login.vue
│       ├── main 首页
│       │   ├── activity
│       │   │   └── activityCharge
│       │   │       └── activityCharge.vue
│       │   ├── ad 栏目广告
│       │   │   └── banner 轮播图管理
│       │   │       ├── banner.vue
│       │   │       ├── config
│       │   │       │   ├── content.config.ts
│       │   │       │   ├── modal.config.ts
│       │   │       │   └── search.config.ts
│       │   │       └── hooks
│       │   │           └── use-page-list.ts
│       │   ├── audit 审核管理
│       │   │   └── userModify 用户资料审核
│       │   │       ├── config
│       │   │       │   └── modal.config.ts
│       │   │       ├── hook
│       │   │       │   └── use-page-list.ts
│       │   │       └── userModify.vue
│       │   ├── base 基础设置
│       │   │   ├── accessory 附近管理
│       │   │   │   └── accessory.vue
│       │   │   ├── area 地区管理
│       │   │   │   ├── area.vue
│       │   │   │   ├── config
│       │   │   │   │   ├── content.config.ts
│       │   │   │   │   ├── modal.config.ts
│       │   │   │   │   └── search.config.ts
│       │   │   │   └── hooks
│       │   │   │       └── use-page-list.ts
│       │   │   ├── config 配置管理
│       │   │   │   ├── config
│       │   │   │   │   ├── content.config.ts
│       │   │   │   │   ├── modal.config.ts
│       │   │   │   │   └── search.config.ts
│       │   │   │   ├── config.vue
│       │   │   │   └── hooks
│       │   │   │       └── use-page-list.ts
│       │   │   ├── fusing 模块功能管理
│       │   │   │   ├── config
│       │   │   │   │   ├── content.config.ts
│       │   │   │   │   ├── modal.config.ts
│       │   │   │   │   └── search.config.ts
│       │   │   │   ├── fusing.vue
│       │   │   │   └── hooks
│       │   │   │       └── use-page-list.ts
│       │   │   ├── head 头像管理
│       │   │   │   ├── config
│       │   │   │   │   ├── content.config.ts
│       │   │   │   │   ├── modal.config.ts
│       │   │   │   │   └── search.config.ts
│       │   │   │   ├── head.vue
│       │   │   │   └── hooks
│       │   │   │       └── use-page-list.ts
│       │   │   ├── jump 跳转设置
│       │   │   │   ├── config
│       │   │   │   │   ├── content.config.ts
│       │   │   │   │   ├── modal.config.ts
│       │   │   │   │   └── search.config.ts
│       │   │   │   ├── hooks
│       │   │   │   │   └── use-page-list.ts
│       │   │   │   └── jump.vue
│       │   │   ├── language 多语言管理
│       │   │   │   ├── config
│       │   │   │   │   ├── content.config.ts
│       │   │   │   │   ├── modal.config.ts
│       │   │   │   │   └── search.config.ts
│       │   │   │   ├── hooks
│       │   │   │   │   └── use-page-list.ts
│       │   │   │   └── language.vue
│       │   │   ├── testConfig
│       │   │   │   └── testConfig.vue
│       │   │   └── version 版本管理
│       │   │       ├── config
│       │   │       │   ├── content.config.ts
│       │   │       │   ├── content.edit-config.ts
│       │   │       │   ├── modal.config.ts
│       │   │       │   └── search.config.ts
│       │   │       ├── hooks
│       │   │       │   └── use-page-list.ts
│       │   │       └── version.vue
│       │   ├── configuration
│       │   │   └── dayPush
│       │   │       └── dayPush.vue
│       │   ├── contentCenter 内容中心
│       │   │   ├── creativeInspiration 创作灵感
│       │   │   │   ├── config
│       │   │   │   │   ├── content.config.ts
│       │   │   │   │   ├── edit.modal.config.ts
│       │   │   │   │   ├── modal.config.ts
│       │   │   │   │   └── search.config.ts
│       │   │   │   ├── creativeInspiration.vue
│       │   │   │   └── hooks
│       │   │   │       └── use-page-list.ts
│       │   │   ├── painterWiki 画师维基
│       │   │   │   ├── painterLibrary 画师库
│       │   │   │   │   ├── config
│       │   │   │   │   │   ├── content.config.ts
│       │   │   │   │   │   ├── edit.modal.config.ts
│       │   │   │   │   │   ├── modal.config.ts
│       │   │   │   │   │   └── search.config.ts
│       │   │   │   │   ├── hooks
│       │   │   │   │   │   └── use-page-list.ts
│       │   │   │   │   └── painterLibrary.vue
│       │   │   │   └── painterTopic 画师专题
│       │   │   │       ├── config
│       │   │   │       │   ├── content.config.ts
│       │   │   │       │   ├── edit.modal.config.ts
│       │   │   │       │   ├── modal.config.ts
│       │   │   │       │   └── search.config.ts
│       │   │   │       ├── hooks
│       │   │   │       │   └── use-page-list.ts
│       │   │   │       └── painterTopic.vue
│       │   │   └── userExperience 用户心得
│       │   │       ├── config
│       │   │       │   ├── content.config.ts
│       │   │       │   ├── edit.modal.config.ts
│       │   │       │   ├── modal.config.ts
│       │   │       │   └── search.config.ts
│       │   │       ├── hooks
│       │   │       │   └── use-page-list.ts
│       │   │       └── userExperience.vue
│       │   ├── device 设备管理
│       │   │   ├── condition 限制条件
│       │   │   │   ├── condition.vue
│       │   │   │   ├── config
│       │   │   │   │   ├── content.config.ts
│       │   │   │   │   ├── modal.config.ts
│       │   │   │   │   └── search.config.ts
│       │   │   │   └── hooks
│       │   │   │       └── use-page-list.ts
│       │   │   ├── description 预警文案
│       │   │   │   └── description.vue
│       │   │   └── imei 用户设备清单
│       │   │       ├── config
│       │   │       │   ├── content.config.ts
│       │   │       │   ├── modal.config.ts
│       │   │       │   └── search.config.ts
│       │   │       ├── hooks
│       │   │       │   └── use-page-list.ts
│       │   │       └── imei.vue
│       │   ├── feedback 意见反馈
│       │   │   └── feedback 问题列表
│       │   │       ├── component
│       │   │       │   ├── user-history.vue
│       │   │       │   └── user-info.vue
│       │   │       ├── config
│       │   │       │   ├── content.config.ts
│       │   │       │   ├── modal.config.ts
│       │   │       │   └── search.config.ts
│       │   │       ├── feedback.vue
│       │   │       └── hooks
│       │   │           └── use-page-list.ts
│       │   ├── finance 财务中心
│       │   │   ├── pay 订单管理
│       │   │   │   ├── config
│       │   │   │   │   ├── content.config.ts
│       │   │   │   │   ├── modal.config.ts
│       │   │   │   │   ├── operation.config.ts
│       │   │   │   │   └── search.config.ts
│       │   │   │   ├── hooks
│       │   │   │   │   └── use-page-list.ts
│       │   │   │   └── pay.vue
│       │   │   ├── purse 用户钱包
│       │   │   │   ├── components
│       │   │   │   │   ├── config
│       │   │   │   │   │   ├── vip.config.ts
│       │   │   │   │   │   └── vipModal.config.ts
│       │   │   │   │   └── vip.vue
│       │   │   │   ├── config
│       │   │   │   │   ├── content.config.ts
│       │   │   │   │   ├── modal.config.ts
│       │   │   │   │   ├── operation.config.ts
│       │   │   │   │   └── search.config.ts
│       │   │   │   ├── hooks
│       │   │   │   │   └── use-page-list.ts
│       │   │   │   └── purse.vue
│       │   │   ├── tradeRecord 内购记录
│       │   │   │   ├── config
│       │   │   │   │   ├── content.config.ts
│       │   │   │   │   ├── modal.config.ts
│       │   │   │   │   └── search.config.ts
│       │   │   │   ├── hooks
│       │   │   │   │   └── use-page-list.ts
│       │   │   │   └── tradeRecord.vue
│       │   │   └── warehouse 用户设备清单
│       │   │       ├── config
│       │   │       │   ├── content.config.ts
│       │   │       │   ├── modal.config.ts
│       │   │       │   └── search.config.ts
│       │   │       ├── hooks
│       │   │       │   └── use-page-list.ts
│       │   │       └── warehouse.vue
│       │   ├── goods 商品中心
│       │   │   ├── description 套餐文案
│       │   │   │   ├── config
│       │   │   │   │   ├── content.config.ts
│       │   │   │   │   ├── modal.config.ts
│       │   │   │   │   └── search.config.ts
│       │   │   │   ├── description.vue
│       │   │   │   └── hooks
│       │   │   │       └── use-page-list.ts
│       │   │   ├── function 功能套餐
│       │   │   │   ├── config
│       │   │   │   │   ├── content.config.ts
│       │   │   │   │   ├── modal.config.ts
│       │   │   │   │   └── search.config.ts
│       │   │   │   ├── function.vue
│       │   │   │   └── hooks
│       │   │   │       └── use-page-list.ts
│       │   │   ├── good 资源商品
│       │   │   │   ├── components
│       │   │   │   │   └── language.vue
│       │   │   │   ├── config
│       │   │   │   │   ├── content.config.ts
│       │   │   │   │   ├── modal.config.ts
│       │   │   │   │   └── search.config.ts
│       │   │   │   ├── good.vue
│       │   │   │   └── hooks
│       │   │   │       └── use-page-list.ts
│       │   │   └── recharge 充值套餐
│       │   │       ├── config
│       │   │       │   ├── content.config.ts
│       │   │       │   ├── modal.config.ts
│       │   │       │   └── search.config.ts
│       │   │       ├── hooks
│       │   │       │   └── use-page-list.ts
│       │   │       └── recharge.vue
│       │   ├── help 帮助中心
│       │   │   ├── account 联系账号
│       │   │   │   ├── account.vue
│       │   │   │   ├── config
│       │   │   │   │   ├── content.config.ts
│       │   │   │   │   ├── modal.config.ts
│       │   │   │   │   └── search.config.ts
│       │   │   │   └── hooks
│       │   │   │       └── use-page-list.ts
│       │   │   ├── companion 使用指南
│       │   │   │   ├── companion.vue
│       │   │   │   ├── config
│       │   │   │   │   ├── content.config.ts
│       │   │   │   │   ├── modal.config.ts
│       │   │   │   │   └── search.config.ts
│       │   │   │   └── hooks
│       │   │   │       └── use-page-list.ts
│       │   │   ├── function 功能说明
│       │   │   │   ├── config
│       │   │   │   │   ├── content.config.ts
│       │   │   │   │   ├── modal.config.ts
│       │   │   │   │   └── search.config.ts
│       │   │   │   ├── function.vue
│       │   │   │   └── hooks
│       │   │   │       └── use-page-list.ts
│       │   │   ├── functionType 功能说明分类
│       │   │   │   ├── config
│       │   │   │   │   ├── content.config.ts
│       │   │   │   │   ├── modal.config.ts
│       │   │   │   │   └── search.config.ts
│       │   │   │   ├── functionType.vue
│       │   │   │   └── hooks
│       │   │   │       └── use-page-list.ts
│       │   │   ├── question 问题管理
│       │   │   │   ├── config
│       │   │   │   │   ├── content.config.ts
│       │   │   │   │   ├── modal.config.ts
│       │   │   │   │   └── search.config.ts
│       │   │   │   ├── hooks
│       │   │   │   │   └── use-page-list.ts
│       │   │   │   └── question.vue
│       │   │   └── questionType 问题类型管理
│       │   │       ├── config
│       │   │       │   ├── content.config.ts
│       │   │       │   ├── modal.config.ts
│       │   │       │   └── search.config.ts
│       │   │       ├── hooks
│       │   │       │   └── use-page-list.ts
│       │   │       └── questionType.vue
│       │   ├── main.vue
│       │   ├── oa 系统管理
│       │   │   ├── permission 权限列表
│       │   │   │   ├── config
│       │   │   │   │   ├── content.config.ts
│       │   │   │   │   ├── modal.config.ts
│       │   │   │   │   └── search.config.ts
│       │   │   │   ├── hook
│       │   │   │   │   └── user-page-list.ts
│       │   │   │   └── permission.vue
│       │   │   ├── role 角色管理
│       │   │   │   ├── config
│       │   │   │   │   ├── content.config.ts
│       │   │   │   │   ├── modal.config.ts
│       │   │   │   │   └── search.config.ts
│       │   │   │   ├── hook
│       │   │   │   │   └── user-page-list.ts
│       │   │   │   └── role.vue
│       │   │   ├── router 路由管理
│       │   │   │   ├── config
│       │   │   │   │   ├── content.config.ts
│       │   │   │   │   ├── modal.config.ts
│       │   │   │   │   └── search.config.ts
│       │   │   │   ├── hook
│       │   │   │   │   └── user-page-list.ts
│       │   │   │   └── router.vue
│       │   │   └── user 用户列表
│       │   │       ├── config
│       │   │       │   ├── content.config.ts
│       │   │       │   ├── modal.config.ts
│       │   │       │   └── search.config.ts
│       │   │       ├── hook
│       │   │       │   └── user-page-list.ts
│       │   │       └── user.vue
│       │   ├── resource 资料库
│       │   │   ├── center 资源管理中心
│       │   │   │   ├── center.vue
│       │   │   │   ├── components
│       │   │   │   │   ├── config
│       │   │   │   │   │   ├── relevance-prep-edit-modal.ts
│       │   │   │   │   │   ├── relevance-subPrep-edit-modal.ts
│       │   │   │   │   │   ├── relevance.modal.ts
│       │   │   │   │   │   ├── resource.modal.ts
│       │   │   │   │   │   ├── timer.modal.ts
│       │   │   │   │   │   └── u3d.modal.ts
│       │   │   │   │   ├── process.vue
│       │   │   │   │   ├── property.vue
│       │   │   │   │   ├── relevance.vue
│       │   │   │   │   ├── resource.vue
│       │   │   │   │   ├── step.vue
│       │   │   │   │   ├── timer.vue
│       │   │   │   │   └── u3d.vue
│       │   │   │   ├── config
│       │   │   │   │   ├── content.config.ts
│       │   │   │   │   ├── modal.config.ts
│       │   │   │   │   └── search.config.ts
│       │   │   │   └── hooks
│       │   │   │       └── use-page-list.ts
│       │   │   ├── classify 分类管理
│       │   │   │   ├── classify.vue
│       │   │   │   ├── config
│       │   │   │   │   ├── content.config.ts
│       │   │   │   │   ├── modal.config.ts
│       │   │   │   │   └── search.config.ts
│       │   │   │   └── hooks
│       │   │   │       └── use-page-list.ts
│       │   │   ├── data 资源数据统计
│       │   │   │   ├── config
│       │   │   │   │   ├── content.config.ts
│       │   │   │   │   ├── modal.config.ts
│       │   │   │   │   ├── operation.config.ts
│       │   │   │   │   └── search.config.ts
│       │   │   │   ├── data.vue
│       │   │   │   └── hooks
│       │   │   │       └── use-page-list.ts
│       │   │   ├── index 首页管理
│       │   │   │   ├── components
│       │   │   │   │   ├── config
│       │   │   │   │   │   ├── content.config.ts
│       │   │   │   │   │   ├── modal.config.ts
│       │   │   │   │   │   └── search.config.ts
│       │   │   │   │   ├── hooks
│       │   │   │   │   │   └── use-page-list.ts
│       │   │   │   │   └── indexSeries.vue
│       │   │   │   ├── config
│       │   │   │   │   ├── content.config.ts
│       │   │   │   │   ├── content.edit-config.ts
│       │   │   │   │   ├── modal.config.ts
│       │   │   │   │   └── search.config.ts
│       │   │   │   ├── hooks
│       │   │   │   │   └── use-page-list.ts
│       │   │   │   └── index.vue
│       │   │   ├── keyword 关键词管理
│       │   │   │   ├── config
│       │   │   │   │   ├── content.config.ts
│       │   │   │   │   ├── modal.config.ts
│       │   │   │   │   └── search.config.ts
│       │   │   │   ├── hooks
│       │   │   │   │   └── use-page-list.ts
│       │   │   │   └── keyword.vue
│       │   │   ├── series 系列管理
│       │   │   │   ├── config
│       │   │   │   │   ├── content.config.ts
│       │   │   │   │   ├── modal.config.ts
│       │   │   │   │   └── search.config.ts
│       │   │   │   ├── hooks
│       │   │   │   │   └── use-page-list.ts
│       │   │   │   └── series.vue
│       │   │   └── topic 专题管理
│       │   │       ├── config
│       │   │       │   ├── content.config.ts
│       │   │       │   ├── content.edit-config.ts
│       │   │       │   ├── modal.config.ts
│       │   │       │   └── search.config.ts
│       │   │       ├── hooks
│       │   │       │   └── use-page-list.ts
│       │   │       ├── topic copy.vue
│       │   │       └── topic.vue
│       │   ├── studyCenter 自学中心
│       │   │   ├── classManagement 课时管理
│       │   │   │   └── classManagement.vue
│       │   │   ├── courseManagement 课程管理
│       │   │   │   └── courseManagement.vue
│       │   │   └── entityManagement 实体管理
│       │   │       ├── config
│       │   │       │   ├── content.config.ts
│       │   │       │   ├── modal.config.ts
│       │   │       │   └── search.config.ts
│       │   │       ├── entityManagement.vue
│       │   │       └── hooks
│       │   │           └── use-page-list.ts
│       │   ├── user 用户管理
│       │   │   ├── config
│       │   │   │   ├── content.config.ts
│       │   │   │   ├── modal.config.ts
│       │   │   │   ├── operation.config.ts
│       │   │   │   └── search.config.ts
│       │   │   ├── hooks
│       │   │   │   └── use-page-list.ts
│       │   │   └── user.vue
│       │   └── userCenter 用户管理
│       │       ├── certificationTitle 认证头像
│       │       │   ├── certificationApprovingSystem 认证审批系统
│       │       │   │   └── certificationApprovingSystem.vue
│       │       │   ├── certificationClassify 头衔分类
│       │       │   │   └── certificationClassify.vue
│       │       │   ├── certificationName 头衔名称
│       │       │   │   └── certificationName.vue
│       │       │   └── issueTheSystem 颁发系统
│       │       │       └── issueTheSystem.vue
│       │       ├── gloriousAchievements  荣耀成就
│       │       │   └── gloriousAchievements.vue
│       │       ├── levelManagement 等级管理
│       │       │   └── levelManagement.vue
│       │       └── organization 机构组织
│       │           └── organization.vue
│       └── not-found
│           └── not-found.vue
├── tailwind.config.js
├── tsconfig.json
└── vue.config.js

```
