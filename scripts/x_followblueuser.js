// ========== 完整自动关注蓝V用户脚本（可调间隔 + 429自动检测版）==========

// 数据存储
window._processedUsers = window._processedUsers || new Set();
window._currentBlueVElement = null;
window._currentBlueVUsername = null;
window._isRunning = false;

// ========== 可配置的间隔时间（毫秒）==========
window.followDelay = 5000;  // 每次关注后的间隔，默认5秒
window.hoverDelay = 1000;   // 悬停等待面板出现的时间，默认1秒

// ========== 拦截网络请求，检测 429 错误（支持 fetch 和 XMLHttpRequest）==========
(function () {
    // 处理 429 错误的公共函数
    function handle429(url) {
        if (url.includes('friendships/create.json')) {
            console.log('🚨 捕获到了！关注接口触发了 429 频率限制！');

            // 设定 10 分钟冷却时间
            const cooldownMinutes = 10;
            const resetTime = Date.now() + cooldownMinutes * 60 * 1000;
            localStorage.setItem('twitter_follow_rate_limit_reset', resetTime);

            // 延长基础间隔（可选，防止恢复后立即又触发）
            window.followDelay = (window.followDelay || 3000) + 2000; // 加2秒

            // 停止自动关注
            window._isRunning = false;

            console.log(`🛑 已强制停止！需等待 ${cooldownMinutes} 分钟。`);
            console.log(`⏰ 预计恢复时间: ${new Date(resetTime).toLocaleTimeString()}`);
            console.log(`⚠️ 请勿在此时间前手动重启，否则可能导致更长时间的封禁。`);

            // 启动倒计时播报 (每10秒)
            if (window._cooldownInterval) clearInterval(window._cooldownInterval);

            window._cooldownInterval = setInterval(() => {
                const now = Date.now();
                const remaining = resetTime - now;

                if (remaining <= 0) {
                    clearInterval(window._cooldownInterval);
                    window._cooldownInterval = null;
                    console.log('✅ 冷却时间已结束！您可以尝试重新运行 startAutoFollow() 了。');
                } else {
                    const m = Math.floor(remaining / 60000);
                    const s = Math.floor((remaining % 60000) / 1000);
                    console.log(`⏳ 冷却倒计时: 还有 ${m} 分 ${s} 秒...`);
                }
            }, 10000);
        }
    }

    // ========== 1. 拦截 fetch ==========
    const originalFetch = window.fetch;
    window.fetch = async function (...args) {
        const response = await originalFetch.apply(this, args);
        const url = args[0] ? args[0].toString() : '';

        if (response.status === 429) {
            handle429(url);
        }

        return response;
    };

    // ========== 2. 拦截 XMLHttpRequest ==========
    const originalXHROpen = XMLHttpRequest.prototype.open;
    const originalXHRSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function (method, url, ...rest) {
        this._url = url; // 保存 URL 供后续使用
        return originalXHROpen.apply(this, [method, url, ...rest]);
    };

    XMLHttpRequest.prototype.send = function (...args) {
        this.addEventListener('load', function () {
            if (this.status === 429) {
                handle429(this._url || '');
            }
        });
        return originalXHRSend.apply(this, args);
    };

    console.log('✅ 已启用 429 错误自动检测（10分钟冷却保护版）');
})();

// 第一步：找到蓝V用户
window.findBlueVUser = function () {
    const excludeUsers = ['aussiehaggie', 'jinshimanong', 'MSIG_SG', 'mumo_mumo_'];
    const articles = document.querySelectorAll('article');

    for (const article of articles) {
        const verifiedBadge = article.querySelector('svg[aria-label="认证账号"]');
        if (!verifiedBadge) continue;

        const allLinks = article.querySelectorAll('a[role="link"]');
        let usernameHandle = null;
        let displayNameLink = null;

        for (const link of allLinks) {
            const href = link.getAttribute('href');
            if (!href) continue;

            if (href.includes('/status/') || href.includes('/photo/') ||
                href.includes('/analytics') || href === '/home' ||
                href.includes('/i/') || href.includes('/compose/')) continue;

            const text = link.textContent.trim();

            if (href.startsWith('/') && href.split('/').length === 2) {
                const username = href.substring(1);
                if (text.startsWith('@')) {
                    usernameHandle = username;
                } else if (text && !displayNameLink) {
                    displayNameLink = link;
                }
            }
        }

        if (usernameHandle &&
            !excludeUsers.includes(usernameHandle) &&
            !window._processedUsers.has(usernameHandle) &&
            displayNameLink) {

            const rect = displayNameLink.getBoundingClientRect();

            if (rect.width > 0 && rect.height > 0) {
                // 模拟人类平滑滚动，将目标置于屏幕中心
                displayNameLink.scrollIntoView({ behavior: 'smooth', block: 'center' });
                const newRect = displayNameLink.getBoundingClientRect();

                window._currentBlueVElement = displayNameLink;
                window._currentBlueVUsername = usernameHandle;

                console.log('找到蓝V用户:', displayNameLink.textContent.trim(), '@' + usernameHandle);
                return {
                    displayName: displayNameLink.textContent.trim(),
                    username: '@' + usernameHandle,
                    element: displayNameLink,
                    position: {
                        x: Math.round(newRect.left + newRect.width / 2),
                        y: Math.round(newRect.top + newRect.height / 2)
                    }
                };
            }
        }
    }

    console.log('未找到可关注的蓝V用户');
    return null;
};

// 第二步：触发悬停
window.triggerHover = function (element) {
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    ['mouseenter', 'mouseover', 'mousemove'].forEach(type => {
        element.dispatchEvent(new MouseEvent(type, {
            bubbles: true,
            cancelable: true,
            view: window,
            clientX: x,
            clientY: y
        }));
    });
};

// 辅助：随机等待时间（模拟人类思考/反应）
window.humanDelay = function (min = 500, max = 1500) {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    return new Promise(r => setTimeout(r, delay));
};

// 辅助：模拟真实人类点击（随机坐标 + mousedown/up 间隔）
window.simulateHumanClick = async function (element) {
    const rect = element.getBoundingClientRect();

    // 随机偏移 (在按钮中心区域 80% 范围内 randomness)
    // 比如宽100，中心50，随机范围 10~90
    const marginX = rect.width * 0.1;
    const marginY = rect.height * 0.1;

    const x = rect.left + marginX + Math.random() * (rect.width - 2 * marginX);
    const y = rect.top + marginY + Math.random() * (rect.height - 2 * marginY);

    const commonOpts = {
        bubbles: true,
        cancelable: true,
        view: window,
        clientX: x,
        clientY: y
    };

    // 1. 移动到元素 (mousemove)
    element.dispatchEvent(new MouseEvent('mousemove', commonOpts));

    // 2. 按下 (mousedown)
    element.dispatchEvent(new MouseEvent('mousedown', commonOpts));

    // 3. 真实按压延迟 (50-150ms)
    await new Promise(r => setTimeout(r, 50 + Math.random() * 100));

    // 4. 抬起 (mouseup)
    element.dispatchEvent(new MouseEvent('mouseup', commonOpts));

    // 5. 点击 (click)
    element.dispatchEvent(new MouseEvent('click', commonOpts));
};

// 第三步：查找并点击关注按钮 (Async)
window.clickFollowButton = async function () {
    const allButtons = document.querySelectorAll('button');

    for (const btn of allButtons) {
        const text = btn.textContent.trim();
        if (text === '关注') {
            console.log('👆 模拟人类点击操作...');
            await window.simulateHumanClick(btn);

            console.log('✅ 点击完成');
            return { clicked: true, isFollowing: false };
        }

        if (text === '正在关注') {
            console.log('该用户已关注，跳过');
            return { clicked: false, isFollowing: true };
        }
    }

    console.log('未找到关注按钮');
    return { clicked: false, isFollowing: false };
};

// 标记用户已处理
window.markCurrentUserProcessed = function () {
    if (window._currentBlueVUsername) {
        window._processedUsers.add(window._currentBlueVUsername);
        console.log('已标记用户:', window._currentBlueVUsername);
    }
};

// ========== 主循环函数 ==========
window.startAutoFollow = async function (maxCount = 10) {
    // 检查冷却时间
    const resetTime = parseInt(localStorage.getItem('twitter_follow_rate_limit_reset') || '0', 10);
    const now = Date.now();

    if (resetTime > now) {
        const remainingMs = resetTime - now;
        const minutes = Math.floor(remainingMs / 60000);
        const seconds = Math.floor((remainingMs % 60000) / 1000);

        console.warn(`🛑 处于 429 冷却保护期！`);
        console.warn(`⏳ 请再等待: ${minutes} 分 ${seconds} 秒`);
        console.warn(`⏰ 预计恢复时间: ${new Date(resetTime).toLocaleTimeString()}`);
        return;
    }

    if (window._isRunning) {
        console.log('已在运行中...');
        return;
    }

    window._isRunning = true;
    let followedCount = 0;
    let processedCount = 0;
    let consecutiveScrolls = 0; // 连续滚动计数
    const maxScrolls = 3;       // 最大连续滚动次数

    console.log('========== 开始自动关注蓝V用户 ==========');
    console.log(`当前间隔: ${window.followDelay / 1000} 秒`);

    while (window._isRunning && processedCount < maxCount) {
        const user = window.findBlueVUser();

        if (!user) {
            // 如果连续3次滚动都没找到人，说明到底了
            if (consecutiveScrolls >= maxScrolls) {
                console.log('🏁 连续滚动3次未发现新蓝V，当前评论区已处理完毕。');
                console.log('👉 关注完了，换一个thread吧！');
                break;
            }

            console.log(`📉 未找到目标，模拟下拉刷新... (${consecutiveScrolls + 1}/${maxScrolls})`);

            // 模拟人类平滑滚动 (滚动一屏的 70%)
            window.scrollBy({ top: window.innerHeight * 0.7, behavior: 'smooth' });

            // 增加计数
            consecutiveScrolls++;

            // 快速滚动寻找模式：仅等待极短时间让页面渲染
            const scrollWait = 100 + Math.random() * 200;
            console.log(`🚀 快速查找下一位... ${(scrollWait / 1000).toFixed(2)}s`);
            await new Promise(r => setTimeout(r, scrollWait));

            continue; // 重新进入循环尝试查找
        }

        // 找到了用户，重置滚动计数
        consecutiveScrolls = 0;

        console.log(`[${processedCount + 1}] 处理用户: ${user.displayName} (${user.username})`);

        window.triggerHover(user.element);

        // 模拟人类阅读时间 (随机 500-1500ms)
        const readingTime = 500 + Math.random() * 1000;
        console.log(`👀 模拟阅读信息 (${(readingTime / 1000).toFixed(2)}s)...`);
        await new Promise(r => setTimeout(r, readingTime));

        // 等待面板出现 (基础 Hover Delay 也是必需的)
        await new Promise(r => setTimeout(r, window.hoverDelay));

        const result = await window.clickFollowButton();

        let currentWait = window.followDelay;

        if (result.clicked) {
            followedCount++;
            console.log(`✅ 成功关注: ${user.displayName}`);
        } else if (result.isFollowing) {
            console.log(`⏭️ 已关注，快速跳过: ${user.displayName}`);
            // 已关注用户不需要等待长间隔，仅留极短缓冲
            currentWait = 100;
        } else {
            console.log(`❌ 关注失败: ${user.displayName}`);
        }

        window.markCurrentUserProcessed();
        processedCount++;

        if (currentWait > 500) {
            console.log(`⏳ 等待 ${currentWait / 1000} 秒...`);
        }
        await new Promise(r => setTimeout(r, currentWait));
    }

    window._isRunning = false;
    console.log('========== 自动关注结束 ==========');
    console.log(`处理: ${processedCount} 个, 成功关注: ${followedCount} 个`);

    return { processed: processedCount, followed: followedCount };
};

// 停止
window.stopAutoFollow = function () {
    window._isRunning = false;
    console.log('已停止自动关注');
};

// 重置已处理列表
window.resetProcessedUsers = function () {
    window._processedUsers.clear();
    console.log('已重置处理列表');
};

// 设置间隔时间（秒）
window.setFollowDelay = function (seconds) {
    window.followDelay = seconds * 1000;
    console.log(`间隔时间已设置为: ${seconds} 秒`);
};

console.log('脚本已加载');
console.log('使用: window.startAutoFollow(10)');
console.log('停止: window.stopAutoFollow()');
console.log('设置间隔: window.setFollowDelay(5) // 5秒');
console.log('⚠️ 遇到429会自动增加0.5秒间隔并停止，需手动重新启动');
