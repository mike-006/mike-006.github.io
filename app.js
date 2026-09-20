/* ============================================================
   游戏买量视频设计师作品集 - 交互脚本
   视频源：腾讯云 COS（公开可读），按项目分区
   ============================================================ */

(function() {
    'use strict';

    /* ============================================================
       视频作品数据（按项目分区）
       视频源：腾讯云 COS
       ============================================================ */
    const COS_BASE = 'https://yzx-jianli-1480071597.cos.ap-guangzhou.myqcloud.com/';

    // 项目分区配置
    const PROJECTS = [
        {
            name: 'Critter Colonies',
            category: 'critter',
            files: [
                'CC-精灵灵魂-左右横移玩法-乌龟忍者1080X1920——20240813-Star-Lila-N.mp4',
                'CC-精灵灵魂-自由视角-叫咩1080X1920——20240822-Star-Daisy-E.mp4',
                'PKM-精灵灵魂-数字开船玩法-好鹅有好豹1080X1920——20240729-Star-Daisy-E.mp4',
                'PKM-精灵灵魂-数字打球玩法-神偷小子1080X1920——20240805-Star-Daisy-N.mp4',
                'PKM-精灵灵魂-荡绳子玩法-越狱1080X1920——20241213-Star-Daisy-E.mp4',
                'PKM2-精灵灵魂-IO拓展-碰碰车鸭1080X1920——20240830-Star-Dolly-C.mp4',
                'PKM2-精灵灵魂-采集铺路-下班急先锋1080X1920——20240909-Star-Daisy-E.mp4'
            ]
        },
        {
            name: 'Kingdom Fall Zombie Defense',
            category: 'kingdom',
            files: [
                'P11-AI延时摄影-迭代昼夜变化1080X1920——20260624-Star-Daisy.mp4',
                'P11-尸潮和尸球1080X1920——20260525-Star-jevan-Ea.mp4',
                'P11-爬塔迭代1080X1920——20260706-Star-Daisy-Ea.mp4',
                'P11-终版1-圣水1080X1920——20260603-Star-Gemini.mp4'
            ]
        },
        {
            name: 'Mecha Fire',
            category: 'mecha',
            files: [
                'P6-001-4X乘-缺氧压力-圈圈圆圆圈圈1080X1920——20250616-Star-Daisy-E.mp4',
                'P6-4X-破碎爽感1080-1920.mp4',
                'P6-AI-NOADS-杰克肉丝-Star.mp4',
                'P6-AI素材-跨时空-幻痛1080X1920——20251231-Star(1).mp4',
                'P6-九王玩法-这就不是金铲铲1080x1920——20250417-Star-Daisy-J.mp4',
                'P6-批量人虫大战-蒜鸟蒜鸟1080X1920——20250815-Star-Daisy-E.mp4',
                'P6-新结构建造-摇啊摇1080X1920——20250403-Star-C.mp4',
                'P6-模拟经营-吔屎啦擂1080X1920——20260126-Star-Jevan-U.mp4',
                'P6-石化4X-豆不泳衣1080X1920——20250825-Star-Daisy-J.mp4',
                'P6-缺氧压力-ARPG建造-复刻咳咳咳1080X1920——20241231-Star-Fiona-X.mp4',
                'P6-缺氧压力-Planetbase建造-吖帕提1080X1920——20241101-Star-Daisy-M.mp4',
                'P6-缺氧压力-Planetbase建造-四不像1080X1920——20250213-Star-Daisy-M.mp4',
                'P6-缺氧压力-划线玩法-连呀连1080X1920——20250122-Star-Daisy-N.mp4',
                'P6-缺氧压力-剖面建造-绿岛泥发黄1080X1920——20250326-Star-Daisy-J.mp4',
                'P6-缺氧压力-建造氛围-九九八十一1080X1920——20250305-Star-Daisy-J.mp4',
                'P6-缺氧压力-批量Planetbase建造-就叫终版吧1080X1920——20250113-Star-Daisy-M.mp4',
                'P6-缺氧压力-拯救狗狗玩法-吸溜溜1080X1920——20241119-Star-Daisy-N.mp4',
                'P6-缺氧压力-拼图玩法-火拼1080X1920——20241223-Star-Daisy-C.mp4',
                'P6-缺氧压力-拼图群集建造-方方的1080X1920——20250318-Star-Daisy-E.mp4',
                'P6-缺氧压力-滚球爬楼梯玩法-哼哧哼哧滚加爬1080X1920——20250714-Star-Daisy.mp4',
                'P6-缺氧压力-石油大亨批量化-堵堵右门卫1080X1920——20250703-Star-Daisy-N.mp4',
                'P6-缺氧压力-解压采集-削不鼠你1080X1920——20241127-Star-Daisy-C.mp4',
                'P6-缺氧压力-解压采集行为-挖掘机亮点-有大冰1080X1920——20250425-Star-Daisy-E.mp4',
                'P6-缺氧压力-转水管(剖面)-咕嚕咕嚕1080X1920——20241111-Star-Daisy-E.mp4',
                'P6-缺氧压力-重压力轻建造(外星生物)-当挡当1080X1080-20241017-Star-Daisy.mp4',
                'P6-解压采集行为-大冰普拉斯1080X1920——20250516-Star-Daisy-N.mp4',
                'P6-转刀-唔系滴西1080X1920——20260209-Star-Jevan-U.mp4',
                'P6-转刀-我爱转刀1080X1920——20260309-Star-Jevan-Ea.mp4',
                'P6-转刀-玛卡巴卡1080X1920——20260204-Star-Jevan-U.mp4',
                'P6-题材探索-抱了个娃1080X1920——20250310-Star-Daisy-E.mp4',
                'P6-题材探索-画线传输-弹力绳抓娃娃1080X1920——20241205-Star-Daisy-J.mp4'
            ]
        },
        {
            name: 'P4',
            category: 'p4',
            files: [
                'P4-地块合并IO大小-冷冰冰的石头1080X1920——20241010-Star-Fiona.mp4',
                'P4-拯救狗狗-小蜜蜂1080X1920——20240924-Star-Fiona-M.mp4',
                'P4-拯救狗狗玩法-烧烧的岩浆1080X1920——20241017-Star-Daisy-E.mp4',
                'P4-祖玛-四头九头蛇1080X1920-20240914-Star-Daisy-Foina.mp4'
            ]
        },
        {
            name: 'Virox Global Outbreak',
            category: 'virox',
            files: [
                'AI-0423氛围-SJ.mp4',
                'AI-0511-寂静岭.mp4',
                'P10-AI预告片-冰雪末日孤寂氛围1080X1920——20260429-Star.mp4',
                'P10-AI预告片-冰雪末日孤寂氛围1920X1080——20260429-Star.mp4',
                'P10-类KS-人从众1080X1920——20260317-Star-Jevan-E.mp4',
                'P10-类KS-冰冻僵尸1080X1920——20260402-Star-Jevan-Ea.mp4',
                'P10-类WS-圈地运动1080X1920——20260325-Star-Jevan-C.mp4',
                'P10-类WS-游泳僵尸1080X1920——20260414-Star-Jevan-U.mp4'
            ]
        },
        {
            name: 'West Game Ⅱ',
            category: 'west',
            files: [
                'P8-P8题材-加减乘除-加加又减减1080X1920——20250624-Star-Daisy-J.mp4',
                'P8-建造-呜呜呜1080X1920——20250527-Star-Daisy-E.mp4',
                'P8-荒野大镖客RPG氛围感-火车大嫖客1080X1920——20250605-Star-Daisy-N.mp4',
                'P9-AI视频-短片火灾选择1080X1920——20251217-Star(1).mp4',
                'P9-AI视频-短片羊桥1080X1920——20251217-Star(1).mp4',
                'P9-xx-布达佩斯续集1080X1920——20260116-Star-Richard-U.mp4',
                'P9-切割爽点-割树爬梯1080X1920——20250807-Star-Daisy-N.mp4',
                'P9-割草-割割割不动了1080X1920——20250722-Star-Daisy-E.mp4',
                'P9-同色消除玩法-堆叠爽点-排排排1080X1920——20251121-Star-Vincy-Ea.mp4',
                'P9-模拟玩法印象-威士露1080X1920——20250919-Star-Daisy-C.mp4',
                'P9-爽点创新-拉金条1080X1920——20250911-Star-Daisy-U.mp4',
                'P9-色块占领-红与蓝1080X1920——20251202-Star-Daisy-Richard-C.mp4',
                'P9-色块碰撞1080X1920——20250928-Star-Daisy-T.mp4',
                'P9-逃离鸭科夫-哦哦啊诶诶1080X1920——20251210-Star-Richard-U.mp4',
                'P9-题材创新-西部流水线1080X1920——20250902-Star-Daisy-N.mp4',
                'P9-题材印象-复古游戏1080X1920——20251016-Star-Daisy-J.mp4',
                'P9题材-超轻度休闲-放置打斗-竖崖biubiubiu1080X1080——20251104-Star-Richard-E.mp4',
                'SR终稿-0107-1080-1920.mp4',
                '咻咻咻1080X1920——20251023-Star-Daisy-Ea.mp4',
                '奶牛1080X1920——20251225-Star-Richard-终版.mp4',
                '打不中的蛇1080X1920——20251112-Star-Vincy-N.mp4',
                '横河biubiubiu1080X1920——20251104-Star-Jevan-E.mp4',
                '竖崖biubiubiu1080X1920——20251104-Star-Richard-E.mp4'
            ]
        },
        {
            name: '大学时期',
            category: 'college',
            files: [
                '1157360991-1-192.mp4',
                '原创三维动画《生命向前》.mp4',
                '游戏《精灵世界》宣传片（模型非原创）.mp4'
            ]
        }
    ];

    /* ============================================================
       根据文件名推断标签（用户可自行修改）
       ============================================================ */
    function inferTags(fileName) {
        const tags = [];
        if (new RegExp('4X', 'i').test(fileName)) tags.push('4X');
        if (new RegExp('缺氧压力').test(fileName)) tags.push('缺氧压力');
        if (new RegExp('建造').test(fileName)) tags.push('建造玩法');
        if (new RegExp('题材').test(fileName)) tags.push('题材氛围');
        if (fileName.includes('AI')) tags.push('AI创意');
        if (new RegExp('爽点|割草|切割|转刀').test(fileName)) tags.push('爽点玩法');
        if (new RegExp('生存|僵尸|尸潮|爬塔').test(fileName)) tags.push('生存对抗');
        if (new RegExp('^P4-').test(fileName)) tags.push('休闲小游戏');
        if (new RegExp('玩法').test(fileName)) tags.push('玩法探索');
        if (new RegExp('精灵灵魂').test(fileName)) tags.push('精灵灵魂');
        if (new RegExp('采集|解压').test(fileName)) tags.push('解压采集');
        if (new RegExp('拼图|消除|色块').test(fileName)) tags.push('益智消除');
        if (tags.length === 0) tags.push('其他');
        return tags;
    }

    /* ============================================================
       文件名解析：提取标题 / 日期 / 画幅
       ============================================================ */
    function parseVideoName(projectName, category, fileName) {
        let base = fileName.replace(new RegExp('\\.mp4$', 'i'), '');

        // 提取日期（如 20241101 → 2024.11）
        const dateMatch = base.match(new RegExp('20(\\d{2})(\\d{2})(\\d{2})'));
        let dateText = '';
        if (dateMatch) dateText = '20' + dateMatch[1] + '.' + dateMatch[2];

        // 提取画幅
        let orient = '竖屏';
        let resText = '';
        const resMatch = base.match(new RegExp('(\\d{3,4})[xX\u00d7](\\d{3,4})'));
        if (resMatch) {
            const w = parseInt(resMatch[1], 10);
            const h = parseInt(resMatch[2], 10);
            orient = h > w ? '竖屏' : (h < w ? '横屏' : '方形');
            resText = w + '×' + h;
        } else if (new RegExp('1080[-]1920').test(base)) {
            resText = '1080×1920';
            orient = '竖屏';
        } else if (new RegExp('1080[-]1080').test(base)) {
            resText = '1080×1080';
            orient = '方形';
        }

        // 清理标题
        const reDash = new RegExp('[\\-\u2014]+20\\d{6}.*$');
        const reStar = new RegExp('[\\-\u2014]?Star.*$');
        const reRes = new RegExp('\\d{3,4}[xX\u00d7]\\d{3,4}', 'g');
        const reRes2 = new RegExp('[-]?1080[-]1920', 'g');
        const reRes3 = new RegExp('[-]?1080[-]1080', 'g');
        const reTail = new RegExp('[\\-\u2014\\s]+$');
        let title = base
            .replace(reDash, '')
            .replace(reStar, '')
            .replace(reRes, '')
            .replace(reRes2, '')
            .replace(reRes3, '')
            .replace(reTail, '')
            .trim();

        const prefixes = [
            'P6-001-4X乘-缺氧压力-', 'P6-缺氧压力-', 'P6-解压采集行为-',
            'P8-P8题材-', 'P9题材-', 'PKM2-精灵灵魂-', 'PKM-精灵灵魂-',
            'CC-精灵灵魂-', 'AI-0511-', 'AI-0423-', 'P4-', 'P6-', 'P8-', 'P9-', 'P10-', 'P11-', 'SR终稿-'
        ];
        for (const p of prefixes) {
            if (title.startsWith(p)) { title = title.slice(p.length); break; }
        }

        if (!title) title = fileName.replace(new RegExp('\\.mp4$', 'i'), '');

        const tags = inferTags(fileName);

        return {
            src: COS_BASE + encodeURI('Star-作品/' + projectName + '/' + fileName),
            cover: 'covers/' + projectName + '/' + fileName.replace(/\.mp4$/i, '.png'),
            title: title,
            project: projectName,
            category: category,
            tags: tags,
            date: dateText,
            orient: orient,
            res: resText,
            type: 'video'
        };
    }

    // 可玩广告（HTML 文件，点击新窗口打开）
    const PLAYABLE_ADS = [
        {
            title: '3D Game - AppLovin 模板',
            fileName: '3DGame_Template_applovin.html',
            tags: ['3D', '可玩广告'],
            res: '1080×1920',
            date: '2025'
        },
        {
            title: 'P8 MIP 3D - 转刀子',
            fileName: 'P8-MIP-3D-转刀子-Ekko-Star-Daisy-20250804-J.html',
            tags: ['3D', '可玩广告', '转刀'],
            res: '1080×1920',
            date: '2025.08'
        }
    ];

    // 展平为视频数组
    const videos = [];
    PROJECTS.forEach(p => {
        p.files.forEach(f => {
            videos.push(parseVideoName(p.name, p.category, f));
        });
    });

    // 可玩广告转为卡片数据
    PLAYABLE_ADS.forEach(ad => {
        videos.push({
            src: COS_BASE + encodeURI('Star-作品/可玩广告/' + ad.fileName),
            cover: 'covers/可玩广告/' + ad.fileName.replace(/\.html$/i, '.png'),
            title: ad.title,
            project: '可玩广告',
            category: 'playable',
            tags: ad.tags,
            date: ad.date,
            orient: '竖屏',
            res: ad.res,
            type: 'playable'
        });
    });

    /* ============================================================
       1. 加载动画
       ============================================================ */
    window.addEventListener('load', function() {
        const loader = document.getElementById('loader');
        setTimeout(() => {
            loader.classList.add('hidden');
            initHeroAnimations();
            initScrollReveal();
        }, 1800);
    });

    /* ============================================================
       2. 渲染作品卡片
       ============================================================ */
    const worksGrid = document.getElementById('works-grid');
    const visibleCountEl = document.getElementById('works-visible-count');

    function renderWorks() {
        if (!worksGrid) return;
        const frag = document.createDocumentFragment();

        videos.forEach((v, i) => {
            const card = document.createElement('div');
            card.className = 'work-card';
            card.setAttribute('data-category', v.category);
            card.setAttribute('data-type', v.type);
            card.setAttribute('data-src', v.src);
            card.setAttribute('data-index', i);

            const isVertical = v.orient === '竖屏';
            const isNew = v.date.startsWith('2026');
            const isPlayable = v.type === 'playable';

            const tagsHtml = v.tags.map(t => '<span class="work-tag">' + t + '</span>').join('');

            // 可玩广告：用占位图标代替 video，标注"可玩"
            let mediaHtml;
            if (isPlayable) {
                mediaHtml =
                    '<div class="work-video-container' + (isVertical ? ' vertical' : '') + ' playable-cover">' +
                        '<div class="playable-icon">🎮</div>' +
                        '<div class="playable-label">可玩广告</div>' +
                        '<div class="video-overlay">' +
                            '<div class="play-btn"><span class="play-icon">↗</span></div>' +
                            '<div class="video-info">' +
                                '<h4>' + v.title + '</h4>' +
                                '<p>' + v.project + ' · 点击试玩</p>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
            } else {
                mediaHtml =
                    '<div class="work-video-container' + (isVertical ? ' vertical' : '') + '">' +
                        '<video class="work-video" muted loop playsinline preload="none" poster="' + v.cover + '"></video>' +
                        '<div class="video-overlay">' +
                            '<div class="play-btn"><span class="play-icon">▶</span></div>' +
                            '<div class="video-info">' +
                                '<h4>' + v.title + '</h4>' +
                                '<p>' + v.project + ' · ' + v.orient + (v.date ? ' · ' + v.date : '') + '</p>' +
                            '</div>' +
                        '</div>' +
                        (isNew ? '<div class="work-badge badge-new">NEW</div>' : '') +
                    '</div>';
            }

            card.innerHTML =
                mediaHtml +
                '<div class="work-details">' +
                    '<div class="work-tags">' +
                        '<span class="tag tag-project">' + v.project + '</span>' +
                        tagsHtml +
                        (v.res ? '<span class="tag">' + v.res + '</span>' : '') +
                    '</div>' +
                    '<div class="work-meta">' +
                        '<span class="meta-item">📅 ' + (v.date || '未标注日期') + '</span>' +
                        '<span class="meta-item">' + (isPlayable ? '↗ 点击试玩' : '▶ 点击播放') + '</span>' +
                    '</div>' +
                '</div>';

            frag.appendChild(card);
        });

        worksGrid.innerHTML = '';
        worksGrid.appendChild(frag);
        updateVisibleCount();
        bindCardEvents();
        initWorksReveal();
        // 有了 poster 封面图，卡片 video 不需要提前赋 src；点击弹窗时才从 COS 拉完整视频
    }

    function updateVisibleCount(n) {
        if (!visibleCountEl) return;
        visibleCountEl.textContent = (typeof n === 'number') ? n :
            worksGrid.querySelectorAll('.work-card:not(.hidden)').length;
    }

    /* ============================================================
       3. 卡片交互：悬停预览 + 点击弹窗
       ============================================================ */
    const videoModal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');
    const modalClose = document.getElementById('modal-close');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalVideoWrap = document.querySelector('.modal-video-wrap');

    function bindCardEvents() {
        worksGrid.querySelectorAll('.work-card').forEach(card => {
            const type = card.getAttribute('data-type');

            if (type === 'playable') {
                // 可玩广告：点击新窗口打开
                card.addEventListener('click', () => {
                    window.open(card.getAttribute('data-src'), '_blank', 'noopener,noreferrer');
                });
            } else {
                // 视频卡片：只绑定点击 → 弹窗播放完整视频
                // 卡片上的 video 仅用于显示 poster 封面，不做 hover 自动播放（省 COS 流量）
                card.addEventListener('click', () => {
                    const v = videos[parseInt(card.getAttribute('data-index'), 10)];
                    openModal(v);
                });
            }
        });
    }

    function openModal(v) {
        if (!videoModal) return;
        modalTitle.textContent = v.title;
        modalDesc.textContent = v.project + ' · ' + v.orient + (v.res ? ' (' + v.res + ')' : '') +
            (v.date ? ' · 制作于 ' + v.date : '') +
            (v.tags && v.tags.length ? ' · 标签：' + v.tags.join('、') : '');

        modalVideoWrap.classList.toggle('vertical', v.orient === '竖屏');

        modalVideo.setAttribute('src', v.src);
        modalVideo.currentTime = 0;
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        modalVideo.play().catch(() => {});
    }

    function closeModal() {
        if (!videoModal) return;
        videoModal.classList.remove('active');
        modalVideo.pause();
        modalVideo.removeAttribute('src');
        modalVideo.load();
        document.body.style.overflow = '';
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) closeModal();
    });

    /* ============================================================
       4. 作品筛选
       ============================================================ */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const paginationEl = document.getElementById('pagination');

    // 分页设置：每页 6 张，翻页与筛选联动
    const PAGE_SIZE = 6;
    let currentFilter = 'west';
    let currentPage = 1;

    function getFilteredCards() {
        return Array.from(worksGrid.querySelectorAll('.work-card')).filter(card =>
            currentFilter === 'all' || card.getAttribute('data-category') === currentFilter
        );
    }

    function renderPage() {
        const visible = getFilteredCards();
        const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
        if (currentPage > totalPages) currentPage = totalPages;
        const start = (currentPage - 1) * PAGE_SIZE;
        const pageCards = visible.slice(start, start + PAGE_SIZE);

        worksGrid.querySelectorAll('.work-card').forEach(card => {
            const idx = pageCards.indexOf(card);
            if (idx !== -1) {
                card.classList.remove('hidden');
                // 重新触发淡入动画（否则 reveal 初始置 0 的卡片翻页后会隐形）
                card.style.animation = 'none';
                void card.offsetWidth;
                card.style.animation = 'fadeInUp 0.5s ease ' + (idx * 0.04) + 's forwards';
                card.style.opacity = '0';
            } else {
                card.classList.add('hidden');
            }
        });

        updateVisibleCount(visible.length);
        renderPagination(totalPages);
    }

    function applyFilter(filter, scrollToWorks) {
        currentFilter = filter;
        currentPage = 1;
        filterBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-filter') === filter));
        renderPage();
        if (scrollToWorks) scrollToWorksTop();
    }

    function scrollToWorksTop() {
        const tabs = document.querySelector('.filter-tabs');
        if (!tabs) return;
        const y = tabs.getBoundingClientRect().top + window.pageYOffset - 90;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            applyFilter(this.getAttribute('data-filter'), true);
        });
    });

    if (paginationEl) {
        paginationEl.addEventListener('click', function(e) {
            const btn = e.target.closest('button[data-page]');
            if (!btn || btn.disabled) return;
            const p = btn.getAttribute('data-page');
            if (p === 'prev') currentPage = Math.max(1, currentPage - 1);
            else if (p === 'next') currentPage++;
            else currentPage = parseInt(p, 10);
            renderPage();
            scrollToWorksTop();
        });
    }

    function renderPagination(totalPages) {
        if (!paginationEl) return;
        paginationEl.innerHTML = '';
        if (totalPages <= 1) return;

        const mk = (label, page, cls, disabled) => {
            const b = document.createElement('button');
            b.textContent = label;
            if (cls) b.className = cls;
            if (disabled) { b.disabled = true; }
            else { b.setAttribute('data-page', page); }
            paginationEl.appendChild(b);
        };

        mk('‹ 上一页', 'prev', 'pag-prev', currentPage === 1);

        // 页码：首尾 + 当前页前后一页，中间省略号
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
                pages.push(i);
            } else if (pages[pages.length - 1] !== '…') {
                pages.push('…');
            }
        }
        pages.forEach(p => {
            if (p === '…') {
                const s = document.createElement('span');
                s.className = 'pag-ellipsis';
                s.textContent = '…';
                paginationEl.appendChild(s);
            } else {
                mk(String(p), p, p === currentPage ? 'active' : '', false);
            }
        });

        mk('下一页 ›', 'next', 'pag-next', currentPage === totalPages);
    }

    /* ============================================================
       5. 导航栏交互
       ============================================================ */
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-links');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNavLink();
        toggleBackToTop();
    });

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    function updateActiveNavLink() {
        const scrollPos = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    /* ============================================================
       6. Hero 动画与数字滚动
       ============================================================ */
    function initHeroAnimations() {
        animateStats();
    }

    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const suffix = stat.getAttribute('data-suffix') || '';
            const duration = 2000;
            const start = performance.now();

            function formatNum(n) {
                if (target >= 1000000) {
                    return (n / 10000).toFixed(0) + '万' + suffix;
                }
                return n.toLocaleString() + suffix;
            }

            function update(currentTime) {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(target * eased);
                stat.textContent = formatNum(current);
                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    stat.textContent = formatNum(target);
                }
            }
            requestAnimationFrame(update);
        });
    }

    /* ============================================================
       7. 滚动显现动画
       ============================================================ */
    function initScrollReveal() {
        const elementsToReveal = [
            '.about-content',
            '.works-count',
            '.filter-tabs',
            '.skills-container',
            '.timeline',
            '.contact-container',
            '.section-header'
        ];

        elementsToReveal.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => el.classList.add('reveal'));
        });

        const revealElements = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    if (entry.target.classList.contains('.skills-container') ||
                        entry.target.closest('.skills-container')) {
                        animateSkillBars();
                    }
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

        revealElements.forEach(el => observer.observe(el));
    }

    function initWorksReveal() {
        if (!worksGrid) return;
        const cards = worksGrid.querySelectorAll('.work-card');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const visibleCards = entry.target.querySelectorAll('.work-card:not(.hidden)');
                    visibleCards.forEach((card, i) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, i * 60);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05 });

        observer.observe(worksGrid);
    }

    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => { bar.style.width = width + '%'; }, 100);
        });
    }

    /* ============================================================
       8. 回到顶部
       ============================================================ */
    const backToTop = document.getElementById('back-to-top');

    function toggleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ============================================================
       9. 平滑滚动
       ============================================================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                window.scrollTo({ top: targetEl.offsetTop - 70, behavior: 'smooth' });
            }
        });
    });

    /* ============================================================
       10. 联系表单
       ============================================================ */
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const name = formData.get('name');
            const contactWay = formData.get('contact-way');
            const message = formData.get('message');

            if (!name || !contactWay || !message) {
                showToast('请填写必填项！', 'error');
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>发送中...</span><span class="btn-icon">⏳</span>';

            setTimeout(() => {
                showToast('消息发送成功！我会尽快回复您 ✨', 'success');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 1500);
        });
    }

    /* ============================================================
       11. Toast 提示
       ============================================================ */
    function showToast(message, type) {
        type = type || 'info';
        const existingToast = document.querySelector('.custom-toast');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.className = 'custom-toast toast-' + type;
        toast.style.cssText =
            'position: fixed; top: 30px; left: 50%;' +
            'transform: translateX(-50%) translateY(-100px);' +
            'padding: 13px 24px; border-radius: 12px;' +
            'font-size: 14px; font-weight: 600; z-index: 9999;' +
            'transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);' +
            'background: #232336; color: #F4F4FA;' +
            'border: 1px solid rgba(255,255,255,0.18);' +
            'box-shadow: 0 16px 44px rgba(0,0,0,0.5);';

        if (type === 'success') {
            toast.style.color = '#34D399';
            toast.style.borderColor = 'rgba(52,211,153,0.45)';
        } else if (type === 'error') {
            toast.style.color = '#F87171';
            toast.style.borderColor = 'rgba(248,113,113,0.45)';
        } else {
            toast.style.color = '#FFE14D';
            toast.style.borderColor = 'rgba(255,225,77,0.45)';
        }

        toast.textContent = message;
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.style.transform = 'translateX(-50%) translateY(0)';
        });

        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(-100px)';
            setTimeout(() => toast.remove(), 400);
        }, 3500);
    }

    /* ============================================================
       12. 下载简历
       ============================================================ */
    /* ============================================================
       11b. 点击复制联系方式
       ============================================================ */
    document.querySelectorAll('[data-copy]').forEach(function(el) {
        var copyText = el.getAttribute('data-copy');
        var doCopy = function() {
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(copyText).then(
                    function() { showToast('已复制：' + copyText, 'success'); },
                    function() { fallbackCopy(copyText); }
                );
            } else {
                fallbackCopy(copyText);
            }
        };
        el.addEventListener('click', doCopy);
        el.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); doCopy(); }
        });
    });
    function fallbackCopy(text) {
        var ta = document.createElement('textarea');
        ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        try {
            document.execCommand('copy');
            showToast('已复制：' + text, 'success');
        } catch (err) {
            showToast('复制失败，请手动选中复制', 'error');
        }
        document.body.removeChild(ta);
    }

    const downloadResume = document.getElementById('download-resume');
    if (downloadResume) {
        downloadResume.addEventListener('click', function() {
            showToast('简历 PDF 开始下载，感谢关注！', 'success');
        });
    }

    /* ============================================================
       13. 时间轴交错动画
       ============================================================ */
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 150);
                timelineObserver.unobserve(entry);
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        timelineObserver.observe(item);
    });

    /* ============================================================
       14. 注入动画关键帧 & 初始化渲染
       ============================================================ */
    const styleSheet = document.createElement('style');
    styleSheet.textContent =
        '@keyframes fadeInUp {' +
        '  from { opacity: 0; transform: translateY(20px); }' +
        '  to { opacity: 1; transform: translateY(0); }' +
        '}';
    document.head.appendChild(styleSheet);

    /* ============================================================
       4.5 案例分析：tab 切换 + 案例视频点击才加载（省 COS 流量）
       ============================================================ */
    const caseTabs = document.querySelectorAll('.case-tab');
    const casePanels = document.querySelectorAll('.case-panel');
    const caseVideo = document.getElementById('case-video');
    const caseVideoBox = caseVideo ? caseVideo.closest('.case-video-box') : null;

    caseTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            caseTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const key = this.getAttribute('data-case-tab');
            casePanels.forEach(p => p.classList.toggle('active', p.getAttribute('data-case-panel') === key));
        });
    });

    if (caseVideo && caseVideoBox) {
        caseVideoBox.addEventListener('click', function() {
            if (!caseVideo.getAttribute('src')) {
                caseVideo.src = COS_BASE + encodeURI('Star-作品/Mecha Fire/P6-转刀-唔系滴西1080X1920——20260209-Star-Jevan-U.mp4');
                caseVideo.controls = true;
                caseVideoBox.classList.add('playing');
                caseVideo.play().catch(() => {});
            }
        });
    }

    renderWorks();

    // 默认只展示 West Game Ⅱ（不滚动页面）
    applyFilter('west', false);

})();
