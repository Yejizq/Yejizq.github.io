/* ============================================================
   zq_electric — 文章列表（每篇文章一条数据）
   添加新文章时在这里加一条即可
   ============================================================ */

const POSTS = [
  // 在这里添加你的文章，格式如下：
  // {
  //   id: '001',
  //   title: '文章标题',
  //   date: '2026-06-20',
  //   categories: ['分类1', '分类2'],
  //   tags: ['标签1', '标签2'],
  //   cover: '',          // 封面图路径，留空显示占位图
  //   description: '文章简介，显示在首页卡片上。',
  //   url: 'posts/post-001.html',
  // },
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
