/* ============================================================
   zq_electric — 主逻辑脚本
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSidebar();
  initSearch();
  highlightCurrentNav();
});

/* ----- 导航栏 ----- */
function initNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }
}

/* ----- 高亮当前页面导航项 ----- */
function highlightCurrentNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (path === '/' && a.getAttribute('href') === 'index.html') {
      a.classList.add('active');
    } else if (a.getAttribute('href') && path.includes(a.getAttribute('href').replace(/\.html$/, ''))) {
      if (a.getAttribute('href') !== 'index.html') a.classList.add('active');
    }
  });
}

/* ----- 侧边栏动态填充 ----- */
function initSidebar() {
  const cfg = SITE_CONFIG;

  // 作者卡片 — 从 config.js 动态读取
  const avatarEl = document.getElementById('sidebar-avatar');
  if (avatarEl) {
    avatarEl.src = cfg.author.avatar;
    avatarEl.alt = cfg.author.name;
  }
  const nameEl = document.getElementById('sidebar-name');
  if (nameEl) nameEl.textContent = cfg.author.name;
  const bioEl = document.getElementById('sidebar-bio');
  if (bioEl) bioEl.innerHTML = cfg.author.bio.replace(/\n/g, '<br>');
  const descEl = document.getElementById('sidebar-desc');
  if (descEl) descEl.textContent = cfg.author.description;

  // 社交链接 — 从 config.js 动态生成
  const socialEl = document.getElementById('sidebar-social');
  if (socialEl) {
    socialEl.innerHTML = cfg.social.map(s => `
      <a class="social-btn" href="${s.url}" target="_blank" rel="noopener"><i class="${s.icon}"></i> ${s.label}</a>
    `).join('');
  }

  // 公告
  const announceEl = document.getElementById('sidebar-announcement');
  if (announceEl) announceEl.textContent = cfg.announcement;

  // 站点名
  const logoEls = document.querySelectorAll('.logo');
  logoEls.forEach(el => { el.innerHTML = '⚡ ' + cfg.siteName; });

  // 页脚
  const footerEls = document.querySelectorAll('.footer p');
  footerEls.forEach(el => {
    el.innerHTML = '&copy; ' + new Date().getFullYear() + ' ' + cfg.footerText;
  });

  // 最近文章
  const recentEl = document.getElementById('sidebar-recent');
  if (recentEl) {
    const recent = POSTS.slice(0, 5);
    recentEl.innerHTML = recent.map(p => `
      <li><a href="${p.url}">${p.title}</a></li>
    `).join('');
  }

  // 站点统计
  const postCountEl = document.getElementById('stat-posts');
  if (postCountEl) postCountEl.textContent = POSTS.length;
  const catCountEl = document.getElementById('stat-categories');
  if (catCountEl) catCountEl.textContent = getCategories().length;
  const tagCountEl = document.getElementById('stat-tags');
  if (tagCountEl) tagCountEl.textContent = getTags().length;

  // 运行天数
  const daysEl = document.getElementById('stat-days');
  if (daysEl) {
    const since = new Date(cfg.siteSince);
    daysEl.textContent = Math.floor((new Date() - since) / (1000 * 60 * 60 * 24));
  }

  // 关于页面社交链接
  const aboutSocial = document.getElementById('about-social');
  if (aboutSocial) {
    aboutSocial.innerHTML = cfg.social.map(s => {
      let iconClass = s.icon;
      let displayText = '';
      if (s.label === 'GitHub') {
        displayText = 'GitHub：<a href="' + s.url + '" target="_blank">' + s.url.replace('https://github.com/', '') + '</a>';
      } else if (s.label === 'Email') {
        displayText = 'Email：<a href="' + s.url + '">' + s.url.replace('mailto:', '') + '</a>';
      } else if (s.label === 'B站') {
        displayText = 'B站：<a href="' + s.url + '" target="_blank">点击访问</a>';
      } else {
        displayText = s.label + '：<a href="' + s.url + '" target="_blank">' + s.url + '</a>';
      }
      return '<p><i class="' + iconClass + '"></i> ' + displayText + '</p>';
    }).join('');
  }
}

/* ----- 首页卡片渲染 ----- */
function renderCardGrid(containerId, posts, page = 1) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const perPage = SITE_CONFIG.postsPerPage;
  const start = (page - 1) * perPage;
  const pagePosts = posts.slice(start, start + perPage);

  container.innerHTML = pagePosts.map(p => {
    const coverHTML = p.cover
      ? `<img class="card-cover" src="${p.cover}" alt="${p.title}" loading="lazy">`
      : `<div class="card-cover-placeholder">📄</div>`;

    const tagsHTML = (p.tags || []).slice(0, 4).map(t =>
      `<a class="card-tag" href="tags.html?tag=${encodeURIComponent(t)}">${t}</a>`
    ).join('');

    const catHTML = (p.categories || []).map(c =>
      `<a class="card-category" href="categories.html?cat=${encodeURIComponent(c)}">${c}</a>`
    ).join(' / ');

    return `
      <article class="post-card">
        <a href="${p.url}">${coverHTML}</a>
        <div class="card-body">
          <div class="card-date">📅 ${p.date}</div>
          ${catHTML ? `<div>${catHTML}</div>` : ''}
          <h2 class="card-title"><a href="${p.url}">${p.title}</a></h2>
          <p class="card-desc">${p.description || ''}</p>
          <div class="card-meta">${tagsHTML}</div>
        </div>
      </article>
    `;
  }).join('');

  // 分页
  const pagEl = document.getElementById('pagination');
  if (pagEl && posts.length > perPage) {
    const totalPages = Math.ceil(posts.length / perPage);
    let pagHTML = '';
    if (page > 1) pagHTML += `<a href="?page=${page - 1}">← 上一页</a>`;
    for (let i = 1; i <= totalPages; i++) {
      if (i === page) {
        pagHTML += `<span class="current">${i}</span>`;
      } else {
        pagHTML += `<a href="?page=${i}">${i}</a>`;
      }
    }
    if (page < totalPages) pagHTML += `<a href="?page=${page + 1}">下一页 →</a>`;
    pagEl.innerHTML = pagHTML;
  }
}

/* ----- 搜索 ----- */
function initSearch() {
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  if (!input || !results) return;

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { results.innerHTML = ''; return; }

    const matched = POSTS.filter(p =>
      p.title.toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q) ||
      (p.tags || []).some(t => t.toLowerCase().includes(q)) ||
      (p.categories || []).some(c => c.toLowerCase().includes(q))
    );

    if (matched.length === 0) {
      results.innerHTML = '<div class="empty-state"><span class="icon">🔍</span>未找到相关文章</div>';
      return;
    }
    results.innerHTML = matched.map(p => `
      <div class="search-result-item">
        <h3><a href="${p.url}">${highlightMatch(p.title, q)}</a></h3>
        <p>${highlightMatch(p.description || '', q)}</p>
        <p style="font-size:0.8rem;margin-top:4px;">📅 ${p.date} | 📂 ${(p.categories||[]).join(', ')}</p>
      </div>
    `).join('');
  });

  // 如果URL带查询参数，自动填入
  const params = new URLSearchParams(window.location.search);
  const q = params.get('q');
  if (q) { input.value = q; input.dispatchEvent(new Event('input')); }
}

function highlightMatch(text, query) {
  if (!query) return text;
  const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(re, '<mark style="background:#49b1f5;color:#000;padding:0 2px;">$1</mark>');
}

/* ----- 分类页面 ----- */
function renderCategories() {
  const cats = getCategories();
  const el = document.getElementById('category-list');
  if (!el) return;
  if (cats.length === 0) {
    el.innerHTML = '<div class="empty-state"><span class="icon">📂</span>暂无分类</div>';
    return;
  }
  el.innerHTML = cats.map(([cat, count]) => `
    <li><a href="categories.html?cat=${encodeURIComponent(cat)}">${cat} <span>${count} 篇</span></a></li>
  `).join('');
}

/* ----- 标签页面 ----- */
function renderTags() {
  const tags = getTags();
  const el = document.getElementById('tag-cloud');
  if (!el) return;
  if (tags.length === 0) {
    el.innerHTML = '<div class="empty-state"><span class="icon">🏷️</span>暂无标签</div>';
    return;
  }
  const maxCount = tags[0][1];
  const getSize = (count) => {
    if (count === maxCount) return 5;
    if (count > maxCount * 0.7) return 4;
    if (count > maxCount * 0.4) return 3;
    if (count > maxCount * 0.2) return 2;
    return 1;
  };
  el.innerHTML = tags.map(([tag, count]) => `
    <a href="tags.html?tag=${encodeURIComponent(tag)}" class="tag-size-${getSize(count)}">${tag} (${count})</a>
  `).join('');
}

/* ----- 归档页面 ----- */
function renderArchives() {
  const archives = getArchives();
  const el = document.getElementById('archive-content');
  if (!el) return;
  if (archives.length === 0) {
    el.innerHTML = '<div class="empty-state"><span class="icon">📦</span>暂无文章</div>';
    return;
  }
  el.innerHTML = archives.map(([ym, posts]) => `
    <h3 class="archive-year">${ym}</h3>
    ${posts.map(p => `
      <div class="archive-item">
        <span class="archive-date">${p.date}</span>
        <a class="archive-title" href="${p.url}">${p.title}</a>
      </div>
    `).join('')}
  `).join('');
}

/* ----- 按分类/标签筛选文章 ----- */
function renderFilteredPosts() {
  const container = document.getElementById('filtered-posts');
  if (!container) return;
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('cat');
  const tag = params.get('tag');

  let filtered = POSTS;
  let title = '';
  if (cat) {
    filtered = POSTS.filter(p => (p.categories || []).includes(cat));
    title = `📂 分类：${cat}`;
  }
  if (tag) {
    filtered = POSTS.filter(p => (p.tags || []).includes(tag));
    title = `🏷️ 标签：${tag}`;
  }

  const titleEl = document.getElementById('filter-title');
  if (titleEl) titleEl.innerHTML = `${title} <span style="color:var(--text-light);font-size:0.85rem;">(${filtered.length} 篇)</span>`;

  renderCardGrid('filtered-posts', filtered);
}

/* ----- 项目页面 ----- */
function renderProjects() {
  const el = document.getElementById('project-grid');
  if (!el) return;
  const projects = POSTS.filter(p => (p.categories || []).some(c => c.includes('项目')));
  if (projects.length === 0) {
    el.innerHTML = '<div class="empty-state"><span class="icon">🚀</span>暂无项目，敬请期待！</div>';
    return;
  }
  el.innerHTML = projects.map(p => {
    const cover = p.cover
      ? `<img src="${p.cover}" alt="${p.title}" loading="lazy">`
      : `<div class="project-cover-placeholder">🔧</div>`;
    return `
      <a href="${p.url}" class="project-card">
        ${cover}
        <div class="project-info">
          <h3>${p.title}</h3>
          <p>${p.description || ''}</p>
        </div>
      </a>
    `;
  }).join('');
}

/* ----- 友链页面 ----- */
function renderFriends() {
  const el = document.getElementById('flink-grid');
  if (!el) return;
  if (FRIENDS.length === 0) {
    el.innerHTML = '<div class="empty-state"><span class="icon">🔗</span>暂无友链，欢迎交换！</div>';
    return;
  }
  el.innerHTML = FRIENDS.map(f => `
    <a href="${f.url}" target="_blank" rel="noopener" class="flink-card">
      <img src="${f.avatar}" alt="${f.name}" loading="lazy" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23333%22 width=%22100%22 height=%22100%22/><text x=%2250%22 y=%2255%22 text-anchor=%22middle%22 fill=%22%23999%22 font-size=%2230%22>🔗</text></svg>'">
      <div class="flink-info">
        <h3>${f.name}</h3>
        <p>${f.description || ''}</p>
      </div>
    </a>
  `).join('');
}

/* ----- 关于页面技能 ----- */
function renderSkills() {
  const el = document.getElementById('skills-list');
  if (!el) return;
  el.innerHTML = SKILLS.map(s => `
    <div style="margin-bottom:16px;">
      <strong style="color:var(--text-bright);">${s.category}</strong>
      <div class="tag-cloud" style="margin-top:6px;">
        ${s.items.map(i => `<span style="padding:3px 12px;border-radius:20px;background:var(--tag-bg);font-size:0.85rem;color:var(--text);">${i}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

/* ----- 文章页面 TOC 生成 ----- */
function generateTOC() {
  const content = document.getElementById('post-content');
  const toc = document.getElementById('toc-list');
  if (!content || !toc) return;

  const headings = content.querySelectorAll('h2, h3');
  if (headings.length === 0) {
    toc.innerHTML = '<li style="color:var(--text-light);font-size:0.8rem;">暂无目录</li>';
    return;
  }

  toc.innerHTML = Array.from(headings).map((h, i) => {
    // 给标题加 id
    h.id = 'heading-' + i;
    const cls = h.tagName === 'H2' ? 'toc-h2' : 'toc-h3';
    return `<li class="${cls}"><a href="#heading-${i}">${h.textContent}</a></li>`;
  }).join('');
}

// 向全局暴露函数
window.renderCardGrid = renderCardGrid;
window.renderCategories = renderCategories;
window.renderTags = renderTags;
window.renderArchives = renderArchives;
window.renderFilteredPosts = renderFilteredPosts;
window.renderProjects = renderProjects;
window.renderFriends = renderFriends;
window.renderSkills = renderSkills;
window.generateTOC = generateTOC;
