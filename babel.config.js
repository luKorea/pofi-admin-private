module.exports = {
  plugins: [
    [
      'import',
      {
        libraryName: 'element-plus',
        customStyleName: (name) => {
          return `element-plus/lib/theme-chalk/${name}.css`
        }
      },
      'element-plus'
    ],
    [
      'import',
      {
        libraryName: 'vxe-table',
        style: true // 样式是否也按需加载
      },
      'vxe-table'
    ]
  ],
  presets: ['@vue/cli-plugin-babel/preset']
}
