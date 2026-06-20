/* ============================================================
   zq_electric — 文章列表（每篇文章一条数据）
   添加新文章时在这里加一条即可
   ============================================================ */

const POSTS = [
  {
    id: '001',
    title: 'STM32 HAL库 UART 中断接收详解',
    date: '2026-06-20',
    categories: ['STM32', '嵌入式'],
    tags: ['STM32', 'UART', 'HAL库', '串口通信'],
    cover: '', // 留空则显示占位图；填 '/img/posts/xxx.webp'
    description: '详细介绍 STM32 HAL 库中 UART 串口中断接收的配置与使用方法，包括 CubeMX 配置和代码实现。',
    url: 'posts/post-001.html',
  },
  {
    id: '002',
    title: 'ESP32 + DHT22 温湿度监测系统',
    date: '2026-06-18',
    categories: ['项目', 'ESP32'],
    tags: ['ESP32', 'DHT22', 'MQTT', '物联网'],
    cover: '',
    description: '使用 ESP32 配合 DHT22 传感器，通过 MQTT 协议将温湿度数据上传至云端，实现远程监控。',
    url: 'posts/post-002.html',
  },
  {
    id: '003',
    title: 'KiCad 入门：绘制第一块 STM32 最小系统板',
    date: '2026-06-15',
    categories: ['PCB设计'],
    tags: ['KiCad', 'PCB', 'STM32', '原理图'],
    cover: '',
    description: '从零开始学习 KiCad，手把手教你绘制 STM32F103C8T6 最小系统板的原理图和 PCB 布局。',
    url: 'posts/post-003.html',
  },
  {
    id: '004',
    title: 'BUCK 降压电路原理与实战',
    date: '2026-06-10',
    categories: ['电源', '硬件'],
    tags: ['BUCK', 'DC-DC', '电源设计', 'PCB'],
    cover: '',
    description: '深入讲解 BUCK 降压电路的工作原理，包含电感选型、MOSFET 驱动和闭环控制设计。',
    url: 'posts/post-004.html',
  },
  {
    id: '005',
    title: 'FreeRTOS 任务调度与消息队列实战',
    date: '2026-06-05',
    categories: ['嵌入式'],
    tags: ['FreeRTOS', 'RTOS', 'STM32', '任务调度'],
    cover: '',
    description: '基于 STM32 平台，讲解 FreeRTOS 的任务创建、优先级调度、消息队列和信号量的使用方法。',
    url: 'posts/post-005.html',
  },
];

// 获取所有分类及其文章数
function getCategories() {
  const catMap = {};
  POSTS.forEach(p => {
    (p.categories || []).forEach(c => {
      catMap[c] = (catMap[c] || 0) + 1;
    });
  });
  return Object.entries(catMap).sort((a, b) => b[1] - a[1]);
}

// 获取所有标签及其文章数
function getTags() {
  const tagMap = {};
  POSTS.forEach(p => {
    (p.tags || []).forEach(t => {
      tagMap[t] = (tagMap[t] || 0) + 1;
    });
  });
  return Object.entries(tagMap).sort((a, b) => b[1] - a[1]);
}

// 按年月归档
function getArchives() {
  const archiveMap = {};
  POSTS.forEach(p => {
    const ym = p.date.substring(0, 7); // YYYY-MM
    if (!archiveMap[ym]) archiveMap[ym] = [];
    archiveMap[ym].push(p);
  });
  return Object.entries(archiveMap).sort((a, b) => b[0].localeCompare(a[0]));
}
