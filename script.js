/* ============================================
   SWPE Script Generator — Core Logic
   ============================================ */

// ---- Data Definitions ----

const JUNXU_LEVELS = [60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160];
const BAIREN_LEVELS = [60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160];
const GUANFU_LEVELS = [45, 55, 65, 75, 85, 95, 105, 115];

const DUNGEONS = [
    { level: 50, name: "章魚_困難", script: "50章魚_困難", interactId: 1, lootId: null, lootName: null },
    { level: 70, name: "鮮卑腳本", script: "70鮮卑腳本", interactId: 1, lootId: 21685, lootName: "鮮卑戰利盒" },
    { level: 75, name: "搶救劉陶", script: "75搶救劉陶", interactId: 1, lootId: 21714, lootName: "救援錦囊" },
    { level: 80, name: "伏擊速刷", script: "80伏擊速刷", interactId: 55, lootId: null, lootName: null },
    { level: 85, name: "誅滅惡宦官速刷", script: "85誅滅惡宦官速刷", interactId: 11, lootId: 21855, lootName: "孝女寶袋" },
    { level: 100, name: "界橋大戰", script: "100界橋大戰", interactId: 4, lootId: 22145, lootName: "豪龍寶盒" },
    { level: 105, name: "大戰黑山賊", script: "105大戰黑山賊", interactId: 4, lootId: 22192, lootName: "黑山寶盒" },
    { level: 110, name: "刺殺董卓", script: "110刺殺董卓", interactId: 41, lootId: 22474, lootName: "密刺寶盒" },
    { level: 110, name: "搶救徐州", script: "110搶救徐州", interactId: 27, lootId: 22509, lootName: "血色錦盒" },
    { level: 130, name: "十面埋伏", script: "130十面埋伏", interactId: 17, lootId: 22872, lootName: "浴火重生箱" },
    { level: 130, name: "過五", script: "130過五", interactId: 26, lootId: null, lootName: null },
    { level: 135, name: "計掘漳河", script: "135計掘漳河", interactId: 13, lootId: 22884, lootName: "漳河計囊" },
    { level: 140, name: "中路", script: "140中路", interactId: 21, lootId: 22975, lootName: "烏桓勇士盒" },
    { level: 140, name: "八門", script: "140八門", interactId: 9, lootId: 22978, lootName: "金鎖盒" },
    { level: 145, name: "博望", script: "145博望", interactId: 1, lootId: 22995, lootName: "臥龍妙絕錦囊" },
    { level: 150, name: "一夫當關", script: "150一夫當關", interactId: 7, lootId: 24101, lootName: "當陽聲震包" },
    { level: 150, name: "速刷腳本", script: "150速刷腳本", interactId: 6, lootId: null, lootName: null },
    { level: 155, name: "借箭腳本", script: "155借箭腳本", interactId: 1, lootId: 24179, lootName: "諸葛臥龍錦囊" },
    { level: 160, name: "孔明借東風", script: "160孔明借東風", interactId: 6, lootId: 24199, lootName: "東風招來袋" },
    { level: 160, name: "赤壁之戰", script: "160赤壁之戰", interactId: 1, lootId: 24271, lootName: "赤壁烽火箱" },
    { level: 165, name: "華容", script: "165華容", interactId: 2, lootId: 24291, lootName: "華容救急袋" },
    { level: 165, name: "華容_跟隊", script: "165華容_跟隊", interactId: 2, lootId: 24291, lootName: "華容救急袋", isSpecialFollow: true },
    { level: 170, name: "四郡", script: "170四郡", interactId: 19, lootId: 24358, lootName: "四郡平定箱" },
    { level: 175, name: "劉備迎娶孫夫人", script: "175劉備迎娶孫夫人", interactId: 4, lootId: null, lootName: null },
    { level: 175, name: "劉備迎娶孫夫人_跟隊", script: "175劉備迎娶孫夫人_跟隊", interactId: 4, lootId: null, lootName: null, isSpecialFollow: true },
    { level: 180, name: "張遼威震逍遙律", script: "180張遼威震逍遙律", interactId: 7, lootId: 24637, lootName: "金湯之盒" },
    { level: 180, name: "馬孟起興兵雪恨", script: "180馬孟起興兵雪恨", interactId: 10, lootId: 24439, lootName: "復仇怒盒" }
];

// ---- Initialize UI ----

function initLevelGrid(containerId, levels, prefix) {
    const container = document.getElementById(containerId);
    container.innerHTML = levels.map(lv => `
        <label class="level-chip">
            <input type="checkbox" name="${prefix}-${lv}" value="${lv}">
            <span class="level-chip-label">Lv.${lv}</span>
        </label>
    `).join('');
}

function initDungeonGrid() {
    const container = document.getElementById('dungeon-list');
    container.innerHTML = DUNGEONS.map((d, i) => `
        <label class="dungeon-chip">
            <input type="checkbox" name="dungeon-${i}" value="${i}">
            <span class="dungeon-chip-label">
                <span class="dungeon-lv">Lv.${d.level}</span>
                <span class="dungeon-name">${d.name}</span>
            </span>
        </label>
    `).join('');
}

function initUI() {
    initLevelGrid('junxu-levels', JUNXU_LEVELS, 'junxu');
    initLevelGrid('bairen-levels', BAIREN_LEVELS, 'bairen');
    initLevelGrid('guanfu-levels', GUANFU_LEVELS, 'guanfu');

    initDungeonGrid();
    updateRebattleDropdown();
    setupEventListeners();
}

// ---- Event Listeners ----

function setupEventListeners() {
    // Mode switching
    document.querySelectorAll('input[name="mode"]').forEach(el => {
        el.addEventListener('change', onModeChange);
    });

    // Group toggles
    document.querySelectorAll('.group-header[data-toggle]').forEach(header => {
        header.addEventListener('click', () => {
            const targetId = header.getAttribute('data-toggle');
            const content = document.getElementById(targetId);
            content.classList.toggle('collapsed');
            header.classList.toggle('collapsed');
        });
    });

    // Module expand toggles
    document.querySelectorAll('[data-toggle-module]').forEach(arrow => {
        arrow.addEventListener('click', (e) => {
            e.stopPropagation();
            const targetId = arrow.getAttribute('data-toggle-module');
            const content = document.getElementById(targetId);
            content.classList.toggle('collapsed');
            arrow.classList.toggle('collapsed');
        });
    });

    // Select all toggle checkbox
    document.querySelectorAll('.toggle-select-all').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        toggle.addEventListener('change', (e) => {
            const targetId = toggle.getAttribute('data-target');
            const isChecked = toggle.checked;
            document.querySelectorAll(`#${targetId} input[type="checkbox"]`).forEach(cb => {
                cb.checked = isChecked;
                cb.dispatchEvent(new Event('change'));
            });
            if (targetId === 'dungeon-list') {
                updateRebattleDropdown();
            }
        });
    });

    // Listen to dungeon list checkbox clicks to update the rebattle dropdown
    const dungeonListContainer = document.getElementById('dungeon-list');
    if (dungeonListContainer) {
        dungeonListContainer.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox') {
                updateRebattleDropdown();
            }
        });
    }

    // Generate / Copy / Download
    document.getElementById('btn-generate').addEventListener('click', generateScript);
    document.getElementById('btn-copy').addEventListener('click', copyScript);
    document.getElementById('btn-download').addEventListener('click', downloadScript);

    // Drag and drop for modules
    setupDragAndDrop();

    // Auto-generate on change
    document.querySelectorAll('input, select').forEach(el => {
        el.addEventListener('change', autoGenerate);
    });

    // Update line count on manual edit
    const previewEl = document.getElementById('preview-code');
    if (previewEl) {
        previewEl.addEventListener('input', () => {
            const text = previewEl.value;
            const lineCount = text === '' ? 0 : text.split(/\r?\n/).length;
            document.getElementById('line-count').textContent = `${lineCount} 行`;
        });
    }
}

function onModeChange() {
    const mode = document.querySelector('input[name="mode"]:checked').value;
    const teamRoleSection = document.getElementById('team-role-section');
    const teamSettingsGroup = document.getElementById('team-settings-group');

    if (mode === 'team') {
        teamRoleSection.style.display = 'flex';
        teamSettingsGroup.style.display = 'block';
    } else {
        teamRoleSection.style.display = 'none';
        teamSettingsGroup.style.display = 'none';
    }
    autoGenerate();
}

// ---- Drag & Drop for Module Order ----

function setupDragAndDrop() {
    const list = document.getElementById('modules-list');
    let draggedItem = null;

    list.querySelectorAll('.module-item').forEach(item => {
        item.addEventListener('dragstart', (e) => {
            draggedItem = item;
            item.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
        });

        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
            list.querySelectorAll('.module-item').forEach(i => i.classList.remove('drag-over'));
            draggedItem = null;
            autoGenerate();
        });

        item.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            if (item !== draggedItem) {
                item.classList.add('drag-over');
            }
        });

        item.addEventListener('dragleave', () => {
            item.classList.remove('drag-over');
        });

        item.addEventListener('drop', (e) => {
            e.preventDefault();
            item.classList.remove('drag-over');
            if (draggedItem && item !== draggedItem) {
                const items = [...list.querySelectorAll('.module-item')];
                const draggedIdx = items.indexOf(draggedItem);
                const dropIdx = items.indexOf(item);
                if (draggedIdx < dropIdx) {
                    list.insertBefore(draggedItem, item.nextSibling);
                } else {
                    list.insertBefore(draggedItem, item);
                }
            }
        });
    });
}

// ---- Script Generation ----

function getSelectedLevels(containerId) {
    const checkboxes = document.querySelectorAll(`#${containerId} input[type="checkbox"]:checked`);
    return [...checkboxes].map(cb => parseInt(cb.value)).sort((a, b) => a - b);
}

function getSelectedDungeons() {
    const checkboxes = document.querySelectorAll('#dungeon-list input[type="checkbox"]:checked');
    return [...checkboxes].map(cb => DUNGEONS[parseInt(cb.value)]);
}

function getModuleOrder() {
    const items = document.querySelectorAll('#modules-list .module-item');
    return [...items].map(item => ({
        id: item.getAttribute('data-module'),
        enabled: item.querySelector('.module-toggle input').checked
    }));
}

function getSettings() {
    const getValue = (id, fallback) => {
        const el = document.getElementById(id);
        if (!el) return fallback;
        const val = el.value.trim();
        if (val === '') return fallback;
        const parsed = parseInt(val);
        return isNaN(parsed) ? fallback : parsed;
    };

    const isChecked = (id) => {
        const el = document.getElementById(id);
        return el ? el.checked : false;
    };

    return {
        mode: document.querySelector('input[name="mode"]:checked').value,
        role: document.querySelector('input[name="team-role"]:checked')?.value || 'leader',
        waitTime: document.getElementById('wait-time').value || '00:01',
        bagToggle: getValue('bag-toggle', 0),
        bagCount: getValue('bag-count', 0),
        bagDelay: getValue('bag-delay', 0),
        bagStart: getValue('bag-start', 1),
        bagEnd: getValue('bag-end', 15),
        teleportId: getValue('teleport-id', 2),
        leaderId: getValue('leader-id', 0),
        teamSize: getValue('team-size', 5),
        bagNumber: getValue('bag-number', 1),
        dungeonTimes: getValue('dungeon-times', 5),
        guanfuTimes: getValue('guanfu-times', 3),
        rebattleScript: document.getElementById('dungeon-rebattle')?.value || '',

        enableWaitTime: isChecked('enable-wait-time'),
        enableBagCleaning: isChecked('enable-bag-cleaning'),
        enableTeleport: isChecked('enable-teleport'),
        enableBagNumber: isChecked('enable-bag-number'),
        enableLeaderId: isChecked('enable-leader-id'),
        enableTeamSize: isChecked('enable-team-size'),
    };
}

function syncSelectAllToggles() {
    document.querySelectorAll('.toggle-select-all').forEach(toggle => {
        const targetId = toggle.getAttribute('data-target');
        const checkboxes = document.querySelectorAll(`#${targetId} input[type="checkbox"]`);
        if (checkboxes.length === 0) return;
        const allChecked = [...checkboxes].every(cb => cb.checked);
        toggle.checked = allChecked;
    });
}

function generateScript(isAuto = false) {
    const isManual = (isAuto !== true);

    syncSelectAllToggles();
    const settings = getSettings();
    const moduleOrder = getModuleOrder();

    // 驗證：如果模組標題有勾選，但內容沒有選取任何等級/副本，則進行提醒，並自動取消勾選
    for (const mod of moduleOrder) {
        if (mod.enabled) {
            let errorMsg = '';
            let checkboxId = '';
            if (mod.id === 'junxu') {
                const lvCount = getSelectedLevels('junxu-levels').length;
                if (lvCount === 0) {
                    errorMsg = '已自動關閉「軍需任務」模組，因為您未勾選任何等級！';
                    checkboxId = 'module-junxu';
                }
            } else if (mod.id === 'bairen') {
                const lvCount = getSelectedLevels('bairen-levels').length;
                if (lvCount === 0) {
                    errorMsg = '已自動關閉「百人副本」模組，因為您未勾選任何等級！';
                    checkboxId = 'module-bairen';
                }
            } else if (mod.id === 'guanfu') {
                const lvCount = getSelectedLevels('guanfu-levels').length;
                if (lvCount === 0) {
                    errorMsg = '已自動關閉「官府任務」模組，因為您未勾選任何等級！';
                    checkboxId = 'module-guanfu';
                }
            } else if (mod.id === 'dungeon') {
                const dgCount = getSelectedDungeons().length;
                if (dgCount === 0) {
                    errorMsg = '已自動關閉「副本連打」模組，因為您未勾選任何副本！';
                    checkboxId = 'module-dungeon';
                }
            }

            if (errorMsg && checkboxId) {
                // 自動將該模組的標題設為不啟用
                document.getElementById(checkboxId).checked = false;

                // 不論是否為自動預覽，驗證警告都應該顯示（因為會自動取消勾選，使用者需要知道原因）
                showToast(errorMsg, 'warning');

                // 遞迴重新執行，以在畫面上即時更新不包含該模組的代碼
                return generateScript(isAuto);
            }
        }
    }

    let lines = [];

    if (settings.mode === 'solo') {
        lines = generateSoloScript(settings, moduleOrder);
    } else {
        if (settings.role === 'leader') {
            lines = generateTeamLeaderScript(settings, moduleOrder);
        } else {
            lines = generateTeamMemberScript(settings, moduleOrder);
        }
    }

    const script = lines.join('\r\n');
    const preview = document.getElementById('preview-code');
    if (preview) {
        preview.value = script;
        preview.textContent = script; // Dual compatibility for cached browsers / textareas
    }
    document.getElementById('line-count').textContent = `${lines.length} 行`;

    if (isManual) {
        showToast('腳本產生成功！', 'success');
    }

    return script;
}

// --- Solo Mode Script ---
function generateSoloScript(settings, moduleOrder) {
    const lines = [];
    const selectedDungeons = getSelectedDungeons();
    const hasLoot = selectedDungeons.some(d => d.lootId);
    const isDungeonEnabled = moduleOrder.some(m => m.id === 'dungeon' && m.enabled);

    // Header
    lines.push('快速遇怪(1)');
    lines.push('');
    if (settings.enableWaitTime) {
        lines.push(`等待時間("${settings.waitTime}")`);
        lines.push('');
    }

    if (hasLoot && isDungeonEnabled && settings.enableBagNumber) {
        lines.push('fn 放物品入行囊(物品列表, 行囊編號)');
        lines.push('{');
        lines.push('    const 物品位置 = 真實背包物品.SelectWithIndex((item, i) => *[item[0], i + 1])');
        lines.push('                        .Where((item, i) => 物品列表.Contains(item))');
        lines.push('                        .Select((item, i) => i)');
        lines.push('                        .ToList();');
        lines.push('    以位置放入行囊(物品位置, 行囊編號);');
        lines.push('    延遲毫秒(150);');
        lines.push('}');
        lines.push('');
    }



    if (settings.enableBagCleaning) {
        lines.push(`清理背包(${settings.bagToggle}, ${settings.bagCount}, ${settings.bagDelay}, ${settings.bagStart}, ${settings.bagEnd})`);
        lines.push('延遲毫秒(2000)');
        lines.push('');
    }

    // Modules in order (except junxu)
    for (const mod of moduleOrder) {
        if (!mod.enabled || mod.id === 'junxu') continue;

        switch (mod.id) {
            case 'bairen':
                lines.push(...generateSoloBairen(settings));
                break;
            case 'guanfu':
                lines.push(...generateSoloGuanfu(settings));
                break;
            case 'dungeon':
                lines.push(...generateSoloDungeon(settings));
                break;
        }
    }

    // Always run junxu at the end of the tasks
    const isJunxuEnabled = moduleOrder.some(m => m.id === 'junxu' && m.enabled);
    if (isJunxuEnabled) {
        lines.push(...generateSoloJunxu());
    }

    // Footer
    lines.push('延遲毫秒(20000)');
    lines.push('');
    if (settings.enableBagCleaning) {
        lines.push('清理背包(0, 0, 0, 0, 0)');
        lines.push('');
    }
    if (settings.enableTeleport) {
        lines.push(`使用傳送符(${settings.teleportId})`);
        lines.push('');
    }
    lines.push('離開並掛機()');

    return lines;
}

function generateSoloJunxu() {
    const levels = getSelectedLevels('junxu-levels');
    if (levels.length === 0) return [];
    const lines = [];
    lines.push('// ====== 軍需任務 ======');

    // Group consecutive levels
    const groups = groupConsecutiveLevels(levels, JUNXU_LEVELS);

    for (const group of groups) {
        const min = group[0];
        const max = group[group.length - 1];
        lines.push(`執行軍需(${min}, ${max}, 1)`);
        lines.push(`執行軍需(${min}, ${max}, 2)`);
        lines.push(`執行軍需(${min}, ${max}, 3)`);
        lines.push('');
    }

    return lines;
}

function generateSoloBairen(settings) {
    const levels = getSelectedLevels('bairen-levels');
    if (levels.length === 0) return [];
    const lines = [];
    lines.push('// ====== 百人副本 ======');

    const groups = groupConsecutiveLevels(levels, BAIREN_LEVELS);

    for (const group of groups) {
        const min = group[0];
        const max = group[group.length - 1];
        lines.push(`執行百人(${min}, ${max}, 1)`);
        lines.push('等隊伍人數(1)');
        lines.push(`執行百人(${min}, ${max}, 2)`);
        lines.push('解散隊伍()');
        lines.push(`執行百人(${min}, ${max}, 3)`);
        lines.push('');
    }

    return lines;
}

function generateSoloGuanfu(settings) {
    const levels = getSelectedLevels('guanfu-levels');
    if (levels.length === 0) return [];
    const lines = [];
    lines.push('// ====== 官府任務 ======');
    lines.push('// 導航至徐州城門');
    lines.push('自動導航(15001)');
    lines.push('');

    const groups = groupConsecutiveLevels(levels, GUANFU_LEVELS);

    for (const group of groups) {
        const min = group[0];
        const max = group[group.length - 1];
        lines.push(`執行官府(${min}, ${max}, ${settings.guanfuTimes})`);
    }
    lines.push('');

    return lines;
}

function generateSoloDungeon(settings) {
    const dungeons = getSelectedDungeons();
    if (dungeons.length === 0) return [];
    const lines = [];
    lines.push('// ====== 副本連打 ======');

    for (const d of dungeons) {
        const actionBlock = [];
        actionBlock.push(`執行腳本("${d.script}", 1, ${settings.dungeonTimes})`);
        if (d.lootId && settings.enableBagNumber) {
            actionBlock.push(`放物品入行囊([${d.lootId}], ${settings.bagNumber})//${d.lootName}`);
        }

        if (settings.rebattleScript === d.script) {
            lines.push(...actionBlock);
            lines.push('');
            lines.push('使用再戰(11335, 5)');
            lines.push('延遲毫秒(2000)');
            lines.push('');
            lines.push(...actionBlock);
        } else {
            lines.push(...actionBlock);
        }
        lines.push('');
    }

    return lines;
}

// --- Team Leader Script ---
function generateTeamLeaderScript(settings, moduleOrder) {
    const lines = [];
    const selectedDungeons = getSelectedDungeons();
    const hasLoot = selectedDungeons.some(d => d.lootId) && settings.enableBagNumber;
    const isDungeonEnabled = moduleOrder.some(m => m.id === 'dungeon' && m.enabled);

    // Header — const definitions
    if (settings.enableLeaderId) {
        lines.push(`const 隊長 = ${settings.leaderId || '請填入隊長編號'}`);
        lines.push(`const 隊長編號 = ${settings.leaderId || '請填入隊長編號'}`);
    }
    if (settings.enableTeamSize) {
        lines.push(`const 打朝隊伍人數 = ${settings.teamSize}`);
        lines.push(`const 隊伍人數 = ${settings.teamSize}`);
        lines.push(`const 人數 = ${settings.teamSize}`);
    }
    lines.push(`const 副本次數 = ${settings.dungeonTimes}`);
    lines.push(`const 次數 = ${settings.dungeonTimes}`);
    if (settings.enableBagNumber) {
        lines.push(`const 行囊編號 = ${settings.bagNumber}`);
    }
    lines.push('');

    lines.push('快速遇怪(1)');
    lines.push('');
    if (settings.enableWaitTime) {
        lines.push(`等待時間("${settings.waitTime}")`);
        lines.push('');
    }

    // 放物品入行囊 function (if any dungeon has loot)
    if (hasLoot && isDungeonEnabled) {
        lines.push('fn 放物品入行囊(物品列表, 行囊編號)');
        lines.push('{');
        lines.push('    const 物品位置 = 真實背包物品.SelectWithIndex((item, i) => *[item[0], i + 1])');
        lines.push('                        .Where((item, i) => 物品列表.Contains(item))');
        lines.push('                        .Select((item, i) => i)');
        lines.push('                        .ToList();');
        lines.push('    以位置放入行囊(物品位置, 行囊編號);');
        lines.push('    延遲毫秒(150);');
        lines.push('}');
        lines.push('');
    }

    if (settings.enableBagCleaning) {
        lines.push(`清理背包(${settings.bagToggle}, ${settings.bagCount}, ${settings.bagDelay}, ${settings.bagStart}, ${settings.bagEnd})`);
        lines.push('');
    }
    lines.push('快速遇怪(0)');
    lines.push('自動導航(16001) // 許昌');
    lines.push('地圖限制(16001)');
    lines.push('');
    lines.push('延遲毫秒(2000)');
    lines.push('');

    // Modules in order (except junxu)
    for (const mod of moduleOrder) {
        if (!mod.enabled || mod.id === 'junxu') continue;

        switch (mod.id) {
            case 'bairen':
                lines.push(...generateTeamBairenLeader(settings));
                break;
            case 'guanfu':
                lines.push(...generateTeamGuanfuLeader(settings));
                break;
            case 'dungeon':
                lines.push(...generateTeamDungeonLeader(settings));
                break;
        }
    }

    // Always run junxu at the end of the tasks (solo mode)
    const isJunxuEnabled = moduleOrder.some(m => m.id === 'junxu' && m.enabled);
    if (isJunxuEnabled) {
        lines.push('解散隊伍()');
        lines.push('');
        lines.push(...generateSoloJunxu());
    }

    // Footer
    if (settings.enableTeleport) {
        lines.push(`使用傳送符(${settings.teleportId})`);
        lines.push('');
    }
    lines.push('離開並掛機()');

    return lines;
}

function generateTeamJunxuLeader(settings) {
    const levels = getSelectedLevels('junxu-levels');
    if (levels.length === 0) return [];
    const lines = [];
    lines.push('// ====== 軍需任務 ======');

    for (const lv of levels) {
        lines.push(`//${lv}軍需`);
        lines.push('延遲毫秒(2000)');
        lines.push(`執行軍需(${lv}, ${lv}, 1)`);
        lines.push('延遲毫秒(2000)');
        lines.push('關閉對話界面()');
        lines.push(`執行軍需(${lv}, ${lv}, 2)`);
        lines.push(`執行軍需(${lv}, ${lv}, 3)`);
        lines.push('延遲毫秒(2000)');
        lines.push('');
    }

    return lines;
}

function generateTeamBairenLeader(settings) {
    const levels = getSelectedLevels('bairen-levels');
    if (levels.length === 0) return [];
    const lines = [];
    lines.push('// ====== 百人副本（隊長） ======');
    lines.push('');

    // Group levels into blocks matching the reference pattern
    const groups = groupBairenLevels(levels);

    for (const group of groups) {
        // 接任
        for (const lv of group) {
            lines.push(`// ${lv} 接任`);
            lines.push('延遲毫秒(2000)');
            lines.push(`執行百人(${lv}, ${lv}, 1)`);
            lines.push('延遲毫秒(2000)');
            lines.push('關閉對話界面()');
            lines.push('');
        }

        // 隊長等待+解任
        lines.push('if 玩家編號等於(隊長)');
        lines.push('{');
        lines.push('');
        lines.push('\t等隊伍人數(打朝隊伍人數)');
        lines.push('\t延遲毫秒(1250)');
        lines.push('');

        for (const lv of group) {
            lines.push(`\t// ${lv} 解任`);
            lines.push('\t延遲毫秒(2000)');
            lines.push(`\t執行百人(${lv}, ${lv}, 2)`);
            lines.push('\t延遲毫秒(2000)');
            lines.push('\t關閉對話界面()');
            lines.push('');
        }

        lines.push('\t解散隊伍()');
        lines.push('}');
        lines.push('else');
        lines.push('{');
        lines.push('\t詢問位置並加入隊伍(隊長, 打朝隊伍人數)');
        lines.push('\t等隊伍人數(1)');
        lines.push('}');
        lines.push('');

        // 交任
        for (const lv of group) {
            lines.push(`// ${lv} 交任`);
            lines.push('延遲毫秒(2000)');
            lines.push(`執行百人(${lv}, ${lv}, 3)`);
            lines.push('延遲毫秒(2000)');
            lines.push('關閉對話界面()');
            lines.push('');
        }
    }

    return lines;
}

function generateTeamGuanfuLeader(settings) {
    const levels = getSelectedLevels('guanfu-levels');
    if (levels.length === 0) return [];
    const lines = [];
    lines.push('// ====== 官府任務 ======');
    lines.push('// 導航至徐州城門');
    lines.push('自動導航(15001)');
    lines.push('');

    // 組隊結構：隊長等待集合後執行，隊員加入隊伍等待
    lines.push('if 玩家編號等於(隊長)');
    lines.push('{');
    lines.push('');
    lines.push('\t等隊伍人數(打朝隊伍人數)');
    lines.push('\t延遲毫秒(1250)');
    lines.push('');

    for (const lv of levels) {
        lines.push(`\t// ${lv} 官府`);
        lines.push('\t延遲毫秒(2000)');
        lines.push(`\t執行官府(${lv}, ${lv}, ${settings.guanfuTimes})`);
        lines.push('\t延遲毫秒(2000)');
        lines.push('\t關閉對話界面()');
        lines.push('');
    }

    lines.push('\t解散隊伍()');
    lines.push('}');
    lines.push('else');
    lines.push('{');
    lines.push('\t詢問位置並加入隊伍(隊長, 打朝隊伍人數)');
    lines.push('\t等隊伍人數(1)');
    lines.push('}');
    lines.push('');

    return lines;
}

function generateTeamDungeonLeader(settings) {
    const dungeons = getSelectedDungeons();
    if (dungeons.length === 0) return [];
    const lines = [];
    lines.push('// ====== 副本連打 ======');
    lines.push('');

    // 組隊結構：隊長與隊員邏輯
    lines.push('if 玩家編號等於(隊長)');
    lines.push('{');
    lines.push('');
    lines.push('\t// 導航至徐州城門');
    lines.push('\t自動導航(15001)');
    lines.push('');
    if (settings.enableTeamSize) {
        lines.push('\t等隊伍人數(隊伍人數)');
        lines.push('');
    }


    for (const d of dungeons) {
        const actionBlock = [];
        actionBlock.push(`\t執行腳本("${d.script}", 隊伍人數, 副本次數)`);
        if (d.lootId && settings.enableBagNumber) {
            actionBlock.push(`\t放物品入行囊([${d.lootId}], 行囊編號)//${d.lootName}`);
        }
        if (settings.enableTeamSize) {
            actionBlock.push('\t等隊伍人數(隊伍人數)');
        }

        if (settings.rebattleScript === d.script) {
            lines.push(...actionBlock);
            lines.push('');
            lines.push('\t使用再戰(11335, 5)');
            lines.push('\t延遲毫秒(2000)');
            lines.push('');
            lines.push(...actionBlock);
        } else {
            lines.push(...actionBlock);
        }
        lines.push('');
    }



    lines.push('\t解散隊伍()');
    lines.push('}');
    lines.push('else');
    lines.push('{');
    lines.push('');
    lines.push('\t// 導航至徐州城門');
    lines.push('\t自動導航(15001)');
    lines.push('\t加入隊伍(隊長, 隊伍人數)');

    lines.push('');

    // 隊員跟打邏輯
    const leaderVar = '隊長';
    const sizeVar = '隊伍人數';
    const timesVar = '副本次數';

    for (const d of dungeons) {
        const actionBlock = [];
        if (d.isSpecialFollow || d.script.endsWith('_跟隊')) {
            actionBlock.push(`\t// ${d.script}`);
            actionBlock.push(`\t執行腳本("${d.script}", 1, ${timesVar}, {"隊長編號": ${leaderVar}, "隊伍人數": ${sizeVar}})`);
            actionBlock.push(`\t加入隊伍(${leaderVar}, ${sizeVar})`);
        } else {
            actionBlock.push(`\t// ${d.script} ${d.interactId}: 互動編號`);
            actionBlock.push(`\t跟打副本(${sizeVar}, ${leaderVar}, ${d.interactId}, ${timesVar})`);
            actionBlock.push(`\t加入隊伍(${leaderVar}, ${sizeVar})`);
        }
        if (d.lootId && settings.enableBagNumber) {
            actionBlock.push(`\t放物品入行囊([${d.lootId}], 行囊編號)//${d.lootName}`);
        }

        if (settings.rebattleScript === d.script) {
            lines.push(...actionBlock);
            lines.push('');
            lines.push('\t使用再戰(11335, 5)');
            lines.push('\t延遲毫秒(2000)');
            lines.push('');
            lines.push(...actionBlock);
        } else {
            lines.push(...actionBlock);
        }
        lines.push('');
    }

    lines.push('}');
    lines.push('');

    return lines;
}

// --- Team Member Script ---
function generateTeamMemberScript(settings, moduleOrder) {
    const lines = [];
    const selectedDungeons = getSelectedDungeons();
    const hasLoot = selectedDungeons.some(d => d.lootId) && settings.enableBagNumber;
    const isDungeonEnabled = moduleOrder.some(m => m.id === 'dungeon' && m.enabled);

    // Header — const definitions
    if (settings.enableLeaderId) {
        lines.push(`const 隊長 = ${settings.leaderId || '請填入隊長編號'}`);
        lines.push(`const 隊長編號 = ${settings.leaderId || '請填入隊長編號'}`);
    }
    if (settings.enableTeamSize) {
        lines.push(`const 打朝隊伍人數 = ${settings.teamSize}`);
        lines.push(`const 隊伍人數 = ${settings.teamSize}`);
        lines.push(`const 人數 = ${settings.teamSize}`);
    }
    lines.push(`const 副本次數 = ${settings.dungeonTimes}`);
    lines.push(`const 次數 = ${settings.dungeonTimes}`);
    if (settings.enableBagNumber) {
        lines.push(`const 行囊編號 = ${settings.bagNumber}`);
    }
    lines.push('');

    lines.push('快速遇怪(1)');
    lines.push('');
    if (settings.enableWaitTime) {
        lines.push(`等待時間("${settings.waitTime}")`);
        lines.push('');
    }

    if (hasLoot && isDungeonEnabled) {
        lines.push('fn 放物品入行囊(物品列表, 行囊編號)');
        lines.push('{');
        lines.push('    const 物品位置 = 真實背包物品.SelectWithIndex((item, i) => *[item[0], i + 1])');
        lines.push('                        .Where((item, i) => 物品列表.Contains(item))');
        lines.push('                        .Select((item, i) => i)');
        lines.push('                        .ToList();');
        lines.push('    以位置放入行囊(物品位置, 行囊編號);');
        lines.push('    延遲毫秒(150);');
        lines.push('}');
        lines.push('');
    }

    if (settings.enableBagCleaning) {
        lines.push(`清理背包(${settings.bagToggle}, ${settings.bagCount}, ${settings.bagDelay}, ${settings.bagStart}, ${settings.bagEnd})`);
        lines.push('');
    }
    lines.push('快速遇怪(0)');
    lines.push('自動導航(16001) // 許昌');
    lines.push('');

    // Modules in order (except junxu)
    for (const mod of moduleOrder) {
        if (!mod.enabled || mod.id === 'junxu') continue;

        switch (mod.id) {
            case 'bairen':
                lines.push(...generateTeamBairenMember(settings));
                break;
            case 'guanfu':
                lines.push(...generateTeamGuanfuMember(settings));
                break;
            case 'dungeon':
                lines.push(...generateTeamDungeonMember(settings));
                break;
        }
    }

    // Always run junxu at the end of the tasks (solo mode)
    const isJunxuEnabled = moduleOrder.some(m => m.id === 'junxu' && m.enabled);
    if (isJunxuEnabled) {
        lines.push('解散隊伍()');
        lines.push('');
        lines.push(...generateSoloJunxu());
    }

    // Footer
    if (settings.enableTeleport) {
        lines.push(`使用傳送符(${settings.teleportId})`);
        lines.push('');
    }
    lines.push('離開並掛機()');

    return lines;
}

function generateTeamJunxuMember(settings) {
    // Members run the same junxu code
    return generateTeamJunxuLeader(settings);
}

function generateTeamBairenMember(settings) {
    const levels = getSelectedLevels('bairen-levels');
    if (levels.length === 0) return [];
    const lines = [];
    lines.push('// ====== 百人副本（隊員） ======');
    lines.push('');

    const leaderVar = settings.enableLeaderId ? '隊長編號' : (settings.leaderId || '請填入隊長編號');
    const sizeVar = settings.enableTeamSize ? '人數' : settings.teamSize;

    const groups = groupBairenLevels(levels);

    for (const group of groups) {
        // 接任
        for (const lv of group) {
            lines.push(`// ${lv} 接任`);
            lines.push('延遲毫秒(2000)');
            lines.push(`執行百人(${lv}, ${lv}, 1)`);
            lines.push('延遲毫秒(2000)');
            lines.push('關閉對話界面()');
            lines.push('');
        }

        // 隊員加入隊伍等待
        lines.push(`詢問位置並加入隊伍(${leaderVar}, ${sizeVar})`);
        lines.push('等隊伍人數(1)');
        lines.push('');

        // 交任
        for (const lv of group) {
            lines.push(`// ${lv} 交任`);
            lines.push('延遲毫秒(2000)');
            lines.push(`執行百人(${lv}, ${lv}, 3)`);
            lines.push('延遲毫秒(2000)');
            lines.push('關閉對話界面()');
            lines.push('');
        }
    }

    return lines;
}

function generateTeamGuanfuMember(settings) {
    const levels = getSelectedLevels('guanfu-levels');
    if (levels.length === 0) return [];
    const lines = [];
    lines.push('// ====== 官府任務（隊員） ======');
    lines.push('// 導航至徐州城門');
    lines.push('自動導航(15001)');
    lines.push('');

    const leaderVar = settings.enableLeaderId ? '隊長編號' : (settings.leaderId || '請填入隊長編號');
    const sizeVar = settings.enableTeamSize ? '人數' : settings.teamSize;

    lines.push(`詢問位置並加入隊伍(${leaderVar}, ${sizeVar})`);
    lines.push('等隊伍人數(1)');
    lines.push('');

    return lines;
}

function generateTeamDungeonMember(settings) {
    // 隊員副本連打與隊長共享同樣的 if/else 結構，以實現同一套腳本相容
    return generateTeamDungeonLeader(settings);
}

// ---- Helper Functions ----

function groupConsecutiveLevels(selected, allLevels, maxGroupSize = 5) {
    // Group selected levels that are consecutive in the allLevels array
    // Then split any group larger than maxGroupSize into chunks
    if (selected.length === 0) return [];

    const rawGroups = [];
    let currentGroup = [selected[0]];

    for (let i = 1; i < selected.length; i++) {
        const prevIdx = allLevels.indexOf(selected[i - 1]);
        const currIdx = allLevels.indexOf(selected[i]);

        if (currIdx === prevIdx + 1) {
            currentGroup.push(selected[i]);
        } else {
            rawGroups.push(currentGroup);
            currentGroup = [selected[i]];
        }
    }
    rawGroups.push(currentGroup);

    // Split groups that exceed maxGroupSize
    const groups = [];
    for (const group of rawGroups) {
        for (let i = 0; i < group.length; i += maxGroupSize) {
            groups.push(group.slice(i, i + maxGroupSize));
        }
    }
    return groups;
}

function groupBairenLevels(levels) {
    // 依據遊戲任務上限，動態將選取的等級分組，每組最多 5 個等級
    const result = [];
    const chunkSize = 5;
    for (let i = 0; i < levels.length; i += chunkSize) {
        result.push(levels.slice(i, i + chunkSize));
    }
    return result;
}

// ---- Copy / Download ----

function copyScript() {
    let text = document.getElementById('preview-code').value;
    if (!text || text.trim() === '') {
        text = generateScript(true);
    }
    if (!text) return; // 驗證失敗則不進行複製

    navigator.clipboard.writeText(text).then(() => {
        showToast('已複製到剪貼簿！');
        const btn = document.getElementById('btn-copy');
        btn.classList.add('copied');
        btn.querySelector('.btn-icon').textContent = '✓';
        setTimeout(() => {
            btn.classList.remove('copied');
            btn.querySelector('.btn-icon').textContent = '📋';
        }, 2000);
    }).catch(() => {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('已複製到剪貼簿！');
    });
}

function downloadScript() {
    let text = document.getElementById('preview-code').value;
    if (!text || text.trim() === '') {
        text = generateScript(true);
    }
    if (!text) return; // 驗證失敗則不進行下載

    const filename = (document.getElementById('filename-input').value || '我的腳本') + '.swpe';

    // Create UTF-8 BOM + content
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast(`已下載 ${filename}！`);
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const msg = document.getElementById('toast-msg');
    const icon = toast.querySelector('.toast-icon');

    msg.textContent = message;

    toast.classList.remove('toast-success', 'toast-warning');
    if (type === 'warning') {
        toast.classList.add('toast-warning');
        if (icon) icon.textContent = '⚠️';
    } else {
        toast.classList.add('toast-success');
        if (icon) icon.textContent = '✓';
    }

    toast.classList.add('show');

    if (toast.timeoutId) {
        clearTimeout(toast.timeoutId);
    }

    toast.timeoutId = setTimeout(() => {
        toast.classList.remove('show');
    }, type === 'warning' ? 4000 : 2500);
}

// Auto-generate when settings change
let autoGenerateTimeout = null;
function autoGenerate() {
    clearTimeout(autoGenerateTimeout);
    autoGenerateTimeout = setTimeout(() => {
        generateScript(true);
    }, 300);
}

// ---- Tooltip System (appended to body, never clipped) ----

function setupTooltips() {
    // Create a single tooltip element on body
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip-popup';
    tooltip.id = 'global-tooltip';
    document.body.appendChild(tooltip);

    let hideTimer = null;

    document.querySelectorAll('.help-icon[data-tooltip]').forEach(icon => {
        icon.addEventListener('mouseenter', (e) => {
            clearTimeout(hideTimer);
            const text = icon.getAttribute('data-tooltip');
            tooltip.textContent = text;
            tooltip.classList.add('visible');
            tooltip.classList.remove('below');

            // Position the tooltip
            const rect = icon.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();

            // Try to show above first
            let top = rect.top - tooltipRect.height - 10;
            let left = rect.left + rect.width / 2 - 20; // align arrow with icon

            // If not enough space above, show below
            if (top < 8) {
                top = rect.bottom + 10;
                tooltip.classList.add('below');
            }

            // Keep within viewport horizontally
            if (left + tooltipRect.width > window.innerWidth - 12) {
                left = window.innerWidth - tooltipRect.width - 12;
            }
            if (left < 12) {
                left = 12;
            }

            tooltip.style.top = top + 'px';
            tooltip.style.left = left + 'px';

            // Adjust arrow position to point at the icon
            const arrowLeft = Math.max(12, Math.min(rect.left + rect.width / 2 - left, tooltipRect.width - 20));
            tooltip.style.setProperty('--arrow-left', arrowLeft + 'px');
        });

        icon.addEventListener('mouseleave', () => {
            hideTimer = setTimeout(() => {
                tooltip.classList.remove('visible');
            }, 100);
        });
    });
}

function updateRebattleDropdown() {
    const dropdown = document.getElementById('dungeon-rebattle');
    if (!dropdown) return;

    // Save current selection value
    const currentVal = dropdown.value;

    // Get all selected dungeons
    const selectedDungeons = getSelectedDungeons();

    // Rebuild options
    let html = '<option value="">無 (不使用再戰)</option>';

    selectedDungeons.forEach(d => {
        const isSelected = (d.script === currentVal) ? 'selected' : '';
        html += `<option value="${d.script}" ${isSelected}>Lv.${d.level} ${d.name}</option>`;
    });

    dropdown.innerHTML = html;
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
    initUI();
    setupTooltips();
});
