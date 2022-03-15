# 页面复杂度整理

|     模块名      |    子模块    | 复杂度（1容易 2一般 3难） |            功能实现            |       完成程度       |                    bug                    |
| :-------------: | :----------: | :-----------------------: | :----------------------------: | :------------------: | :---------------------------------------: |
|                 |   角色管理   |             2             |                                |       success        |                                           |
| <u>系统管理</u> |   权限管理   |             1             |                                |       success        |                                           |
|                 |   用户管理   |             2             |                                |       success        |                                           |
|                 |   路由列表   |             2             |                                |       success        |                                           |
| <u>意见反馈</u> |   问题列表   |             3             |                                |                      |                                           |
| <u>审核管理</u> | 用户资料审核 |             3             |                                |                      |                                           |
| <u>商品中心</u> |   充值套餐   |             2             |                                |                      | 新增数据无效，高级检索无数据total返回错误 |
|                 |   功能套餐   |             2             |                                |                      |                                           |
|                 |   套餐文案   |             3             |             多语言             |                      |                                           |
|                 |   资源商品   |             3             |             多语言             |                      |                                           |
|  <u>资料库</u>  | 资源数据统计 |             2             |                                |                      |                                           |
|                 | 资源管理中心 |             3             | (使用Hytable定制化)  (多语言)  |                      |                                           |
|                 |   专题管理   |             3             |      (国家侧边)  (多语言)      |                      |                                           |
|                 |   首页管理   |             3             |      (国家侧边)  (多语言)      |                      |                                           |
|                 |   系列管理   |             3             |            (多语言)            |                      |                                           |
|                 |   分类管理   |             3             |            (多语言)            |                      |                                           |
|                 |  关键词管理  |             3             |            (多语言)            |                      |                                           |
| <u>基础设置</u> |   附件管理   |             2             |                                |                      |                                           |
|                 |   跳转设置   |             2             |      (自定义modal 下拉框)      |                      |                                           |
|                 |   默认头像   |             2             |                                |       success        |                                           |
|                 |  多语言管理  |             1             |                                |       success        |                                           |
|                 |   配置管理   |             3             | 区分是否可搜索, 编辑,国家侧边  |                      |                                           |
|                 |   地区管理   |             2             |                                |       success        |                                           |
|                 |   版本管理   |             3             | (国家侧边) (自定义modal下拉框) |                      |                                           |
|                 | 模块功能管理 |             1             |                                |       success        |                                           |
| <u>用户中心</u> |   用户管理   |             2             |                                |                      |                                           |
| <u>设备管理</u> |   预警文案   |             2             |                                |                      |                                           |
|  合并三级路由   |   限制条件   |             2             |                                |       success        |                                           |
|                 | 用户设备清单 |             2             |                                |       success        |                                           |
| <u>财务中心</u> |   用户钱包   |             3             |                                |                      |                                           |
|                 |   订单管理   |             2             |                                |       success        |                                           |
|                 |   内测记录   |             2             |                                |       success        |                                           |
| <u>帮助中心</u> |   使用指南   |             2             |                                |       (多语言)       |                                           |
|                 | 功能说明分类 |             2             |                                |       (多语言)       |                                           |
|                 |   功能说明   |             2             |                                |       (多语言)       |                                           |
|                 | 问题类型管理 |             2             |                                |       (多语言)       |                                           |
|                 |   问题管理   |             2             |                                |       (多语言)       |                                           |
|                 |   联系账号   |             2             |                                | (自定义modal 下拉框) |                                           |
| <u>活动中心</u> |  充值页活动  |             2             |                                |                      |                                           |
| <u>广告中心</u> |   栏目广告   |             3             |                                | (国家侧边) (多语言)  |                                           |

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
coderwhy add3page pageName -d dirname (/src/views/main/*)
