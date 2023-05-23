import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Rubbing',
  description: 'across platform canvas render tool',
  lang: 'zh-CN',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '指南', link: '/guards/rubbing' },
    ],

    sidebar: [
      {
        text: '指南',
        items: [
          { text: '简介', link: '/guards/rubbing' },
          { text: '快速开始', link: '/guards/getting-started' },
          { text: '使用', link: '/guards/usage' },
        ],
      },
      {
        text: '图形',
        items: [
          { text: '基础属性', link: '/shapes/' },
          { text: '圆', link: '/shapes/circle' },
          { text: '椭圆', link: '/shapes/ellipse' },
          { text: '图片', link: '/shapes/image' },
          { text: '直线', link: '/shapes/line' },
          { text: '多边形', link: '/shapes/polygon' },
          { text: '折线', link: '/shapes/polyline' },
          { text: '矩形', link: '/shapes/rect' },
          { text: '文本', link: '/shapes/text' },
          { text: '三角形', link: '/shapes/triangle' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/copofe/rubbing' },
    ],
  },
})
