export const creatorLayoutData = {
  items: [
    {
      id: 1,
      name: '',
      routes: [
        { title: '我的简历', path: '/creator', icon: 'mdi-view-list-outline' },
        { title: '模板中心', path: '/creator/templates', icon: 'mdi-database-outline' },
        { title: '收藏夹', path: '/creator/favorites', icon: 'mdi-heart-outline' },
        { title: '回收站', path: '/creator/recycle', icon: 'mdi-trash-can-outline' },
      ],
    },
    {
      id: 2,
      name: '',
      routes: [
        { title: '订单中心', path: '/creator/orders', icon: 'mdi-cart-minus' },
        { title: '个人设置', path: '/creator/profile', icon: 'mdi-cog-outline' },
      ],
    },
  ],
}

export const layoutData = {
  footer: [
    {
      title: '产品',
      children: [
        { title: '简历模板', path: '/templates' },
        { title: 'AI 工具', path: '/ai' },
      ],
    },
    {
      title: '文章',
      children: [
        { title: '求职攻略', path: '/templates' },
        { title: '面试经验', path: '/ai' },
        { title: '建立指南', path: '/ai' },
      ],
    },
    {
      title: '关于我们',
      children: [
        { title: '产品介绍', path: '/templates' },
        { title: '服务协议', path: '/ai' },
        { title: '隐私条款', path: '/ai' },
      ],
    },
    {
      title: '服务',
      children: [
        { title: '帮助中心', path: '/templates' },
        { title: '常见问题', path: '/ai' },
        { title: '成为VIP会员', path: '/ai' },
      ],
    },
    {
      title: '联系我们',
      children: [
        { title: '微信号：Bravesnail', path: '' },
        { title: '公众号：奈斯简历NiceCV', path: '' },
        { title: '小红书：奈斯简历', path: '' },
      ],
    },
  ],
}
