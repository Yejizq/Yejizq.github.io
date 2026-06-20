/* ============================================================
   zq_electric — 个人信息配置（在这里填写你的信息）
   修改这个文件即可更新全站个人信息
   ============================================================ */

const SITE_CONFIG = {
  // ----- 网站信息 -----
  siteName: 'zq_electric',
  siteUrl: 'https://zq-electric.github.io',
  siteSince: 2026,
  beian: '', // 备案号（如需要）

  // ----- 作者信息 -----
  author: {
    name: 'zq_electric',
    avatar: 'img/BLOG头像.png',      // 头像图片路径（可换成 .webp / .png）
    bio: '嵌入式开发工程师',
    description: '专注于嵌入式系统开发与电子电路设计。热爱开源硬件，乐于分享技术经验。',
  },

  // ----- 社交链接 -----
  social: [
    { icon: 'fab fa-github', label: 'GitHub',   url: 'https://github.com/Yejizq' },
    { icon: 'fas fa-envelope', label: 'Email',  url: 'mailto:3434832644@qq.com' },
    { icon: 'fab fa-bilibili', label: 'B站',    url: 'https://space.bilibili.com/539078148?spm_id_from=333.1007.0.0' },
  ],

  // ----- 公告 -----
  announcement: '欢迎来到 zq_electric 的博客！🎉',

  // ----- 首页设置 -----
  postsPerPage: 10,  // 每页文章数

  // ----- 页脚 -----
  footerText: 'zq_electric | 记录嵌入式开发的点点滴滴',
};

/* ============================================================
   技能标签（用于关于页面）
   ============================================================ */
const SKILLS = [
  {
    category: 'MCU 平台',
    items: ['STM32', 'ESP32', 'Arduino', 'GD32'],
  },
  {
    category: 'PCB 设计',
    items: ['Altium Designer', 'KiCad', '立创EDA'],
  },
  {
    category: '编程语言',
    items: ['C / C++', 'Python', '汇编'],
  },
  {
    category: '通信协议',
    items: ['I2C', 'SPI', 'UART', 'CAN', 'MQTT'],
  },
  {
    category: '开发工具',
    items: ['Keil', 'STM32CubeMX', 'PlatformIO', 'VS Code'],
  },
];

/* ============================================================
   友链信息
   ============================================================ */
const FRIENDS = [
  {
    name: 'EDAdong',
    url: 'https://www.edadong.com/',
    avatar: 'https://www.edadong.com/img/avatar.webp',
    description: 'EDA 与技术博客',
  },
  // 在这里添加更多友链：
  // { name: '', url: '', avatar: '', description: '' },
];
