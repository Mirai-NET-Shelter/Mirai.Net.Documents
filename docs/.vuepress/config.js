module.exports = {
  title: 'Mirai.Net 文档页',
  description: 'Mirai.Net是基于.Net的Mirai社区SDK',
  base: '/Mirai.Net.Documents/',
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'en', // 将会被设置为 <html> 的 lang 属性
      title: 'Mirai.Net 2.2.0-Pre1',
      description: '.Net实现的Mirai社区SDK',
    },
    '/1.x/': {
      lang: 'zh-CN',
      title: 'Mirai.Net Legacy',
      description: '.Net实现的Mirai社区SDK',
    },
  },
  themeConfig: {
    sidebar: 'auto',
    locales: {
      '/': {
        selectText: '2.x',
        label: '2.x',
        ariaLabel: '2.x',
        nav: [{ text: '指北', link: '/guide/' }],
      },
      '/1.x/': {
        selectText: '1.x',
        label: '1.x',
        nav: [
          { text: '首页', link: '/1.x/' },
          { text: '指南', link: '/1.x/guide/' },
          { text: '消息', link: '/1.x/message/' },
          { text: '枚举', link: '/1.x/enum/' },
          { text: '事件', link: '/1.x/event/' },
          { text: 'Github', link: 'https://github.com/AHpxChina/Mirai.Net' },
        ],
      },
    },
  },
}
