// Dan's Emoji & Kaomoji Picker for SillyTavern
(function() {
    const MODULE_NAME = 'dan_emoji_kaomoji_picker';

    // Default kaomoji organized by category
    const defaultKaomojis = {
        happy: ['(◕‿◕)', '(✿◠‿◠)', '(◡‿◡✿)', '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧', '( ´ ▽ ` )', '(｡♥‿♥｡)', '(◠‿◠)', '(◕ᴗ◕✿)', 'ヽ(>∀<☆)☆', '(●´ω｀●)', '(◍•ᴗ•◍)', '( ˊᵕˋ )'],
        flustered: ['(⁄ ⁄•⁄ω⁄•⁄ ⁄)', '(〃￣ω￣〃)ゞ', '(*/ω＼*)', '(⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄)', '(/ω\)', '(*/▽＼*)', '(⸝⸝⸝°_°⸝⸝⸝)', '(´,,•ω•,,)♡', '(⺣◡⺣)♡*'],
        angry: ['(╯°□°)╯︵ ┻━┻', '(ノಠ益ಠ)ノ', '(╬ Ò﹏Ó)', '(ง •̀_•́)ง', '(＃｀Д´)', '(ノಠ皿ಠ)ノ', 'ಠ_ಠ', '(눈_눈)', '(¬_¬)', '(ಠ⌣ಠ)'],
        teary: ['(´；ω；`)', '(╥﹏╥)', '(T_T)', '(っ˘̩╭╮˘̩)っ', '(´•̥̥̥ω•̥̥̥`)', 'ಥ_ಥ', '(｡•́︿•̀｡)', '(´;︵;`)', '(ノД`)・゜・。', '(つω`。)', '(っ´ω`)っ', '。゜゜(´Ο`) ゜゜。', '(இ﹏இ`｡)', '(´°̥̥̥̥̥̥̥̥ω°̥̥̥̥̥̥̥̥`)', 'ू(ʚ̴̶̷́ .̠ ʚ̴̶̷̥̀ ू)', '(´;ω;`)'],
        braindead: ['(⊙_⊙)', '(●__●)', '(゜-゜)', '(・_・;)', '(￣□￣;)', '(°△°|||)', '(°ロ°)', '( ˙▿˙ )', '(눈‸눈)', '(._.)', '(´-ω-`)', '(?_?)', '(・・;)', 'σ(°△°|||)', '(゜゜)', '( ꒪⌓꒪)'],
        love: ['(♡°▽°♡)', '(´∀`)♡', '(◕‿◕)♡', '♡(ӦｖӦ｡)', '(●♡∀♡)', '(ღ˘⌣˘ღ)', '(灬♥ω♥灬)', '(ㅅ´ ˘ `)♡', '♡(◡‿◡)', '( ˘ ³˘)♥', '(♡ω♡ ) ~♪', '( ´ ∀ `)ノ～ ♡', '(〃▽〃)♡', '♡´・ᴗ・`♡'],
        shook: ['Σ(°△°|||)', 'Σ(ﾟДﾟ)', '(ʘᗩʘ\')', '(๑°o°๑)', '!!!', 'Σ(゜゜)', '(゜ロ゜)', '(☉_☉)', '(◎_◎;)', '∑(O_O;)', '(ノ゜⊿゜)ノ', 'ヽ(゜ロ゜;)ノ', '(」゜ロ゜)」', '━━━━━(゜∀゜)━━━━━'],
        misc: ['¯\\_(ツ)_/¯', '(づ｡◕‿‿◕｡)づ', '(⌐■_■)', '( •_•)>⌐■-■', '┬─┬ノ( º _ ºノ)', '(╯°□°）╯︵ ┻━┻', '┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻', '( ͡° ͜ʖ ͡°)', '(☞ﾟヮﾟ)☞', '☜(ﾟヮﾟ☜)', '(☞ ͡° ͜ʖ ͡°)☞', '( ˘ω˘ )zzZ', '(っ˘ڡ˘ς)', '♪(´ε` )'],
        custom: []
    };

    // Comprehensive emoji list by category
    const emojis = {
        smileys: ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙', '🥲', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '🥸', '😎', '🤓', '🧐'],
        emotions: ['😕', '😟', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '😈', '👿', '💀', '☠️', '💩', '🤡', '👹', '👺', '👻', '👽', '👾', '🤖'],
        gestures: ['👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💪', '🦾', '🦿'],
        hearts: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥️', '🩷', '🩵', '🩶'],
        animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐻‍❄️', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🙈', '🙉', '🙊', '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🪱', '🐛', '🦋', '🐌', '🐞', '🐜', '🪰', '🦗', '🪳', '🕷️', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑'],
        food: ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶️', '🫑', '🌽', '🥕', '🍔', '🍟', '🍕', '🌭', '🍿', '🧁', '🍰', '🎂', '🍩', '🍪', '🍫', '🍬', '🍭', '☕', '🍵', '🧋', '🍺', '🍷', '🥤'],
        nature: ['🌸', '💮', '🌹', '🥀', '🌺', '🌻', '🌼', '🌷', '🌱', '🪴', '🌲', '🌳', '🌴', '🌵', '🌾', '🌿', '☘️', '🍀', '🍁', '🍂', '🍃', '🍄', '🌙', '⭐', '🌟', '✨', '☀️', '🌈', '☁️', '❄️', '🔥', '💧', '🌊'],
        objects: ['⌚', '📱', '💻', '🖥️', '🎮', '🕹️', '📷', '📸', '🎥', '📺', '📻', '🎙️', '💡', '🔦', '📚', '📖', '✏️', '🖊️', '🔑', '💎', '🔮', '🎁', '🎈', '🎉', '🎊'],
        symbols: ['❤️', '💔', '💕', '💖', '✨', '⭐', '🌟', '💫', '✅', '❌', '❓', '❗', '💯', '🔥', '💢', '💤', '🎵', '🎶', '➡️', '⬅️', '⬆️', '⬇️', '✔️', '➕', '➖']
    };

    // List of default (non-deletable) categories
    const defaultCategoryNames = Object.keys(defaultKaomojis);

    // State
    let settings = null;
    let pickerVisible = false;
    let currentTab = 'emoji';
    let currentCategory = 'smileys';
    let currentKaomojiCategory = 'all';
    let deleteMode = false;
    let initialized = false;

    // Get context safely
    function getContext() {
        if (typeof SillyTavern !== 'undefined' && SillyTavern.getContext) {
            return SillyTavern.getContext();
        }
        return null;
    }

    // Initialize settings
    function loadSettings() {
        const context = getContext();
        if (!context) {
            console.error(`[${MODULE_NAME}] Could not get SillyTavern context`);
            return false;
        }
        
        const { extensionSettings } = context;
        
        if (!extensionSettings[MODULE_NAME]) {
            extensionSettings[MODULE_NAME] = {
                kaomojis: JSON.parse(JSON.stringify(defaultKaomojis)),
                customCategories: [],
                recentEmojis: [],
                recentKaomojis: []
            };
        }
        
        settings = extensionSettings[MODULE_NAME];
        
        // Ensure all default categories exist
        for (const key of Object.keys(defaultKaomojis)) {
            if (!settings.kaomojis[key]) {
                settings.kaomojis[key] = [...defaultKaomojis[key]];
            }
        }
        
        if (!settings.customCategories) settings.customCategories = [];
        if (!settings.recentEmojis) settings.recentEmojis = [];
        if (!settings.recentKaomojis) settings.recentKaomojis = [];
        
        // Ensure custom categories have their arrays
        for (const cat of settings.customCategories) {
            if (!settings.kaomojis[cat]) {
                settings.kaomojis[cat] = [];
            }
        }
        
        return true;
    }

    function saveSettings() {
        const context = getContext();
        if (context && context.saveSettingsDebounced) {
            context.saveSettingsDebounced();
        }
    }

    // Get all kaomoji categories (default + custom)
    function getAllKaomojiCategories() {
        return [...defaultCategoryNames, ...(settings?.customCategories || [])];
    }

    // Insert text into the message input
    function insertIntoInput(text) {
        const textarea = document.getElementById('send_textarea');
        if (!textarea) {
            console.warn(`[${MODULE_NAME}] Could not find send_textarea`);
            return;
        }
        
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;
        
        textarea.value = value.substring(0, start) + text + value.substring(end);
        textarea.selectionStart = textarea.selectionEnd = start + text.length;
        textarea.focus();
        
        // Trigger input event for ST to detect changes
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
    }

    // Add to recently used
    function addToRecent(item, isEmoji) {
        if (!settings) return;
        const list = isEmoji ? settings.recentEmojis : settings.recentKaomojis;
        const index = list.indexOf(item);
        if (index > -1) list.splice(index, 1);
        list.unshift(item);
        if (list.length > 20) list.pop();
        saveSettings();
    }

    // Create the picker button
    function createPickerButton() {
        // Try multiple possible parent elements
        const sendForm = document.getElementById('send_form');
        const rightSendForm = document.getElementById('rightSendForm');
        const sendButWrap = document.getElementById('send_but_wrap');
        
        // Check if button already exists
        if (document.getElementById('dan_emoji_picker_btn')) {
            console.log(`[${MODULE_NAME}] Button already exists`);
            return true;
        }
        
        const button = document.createElement('div');
        button.id = 'dan_emoji_picker_btn';
        button.className = 'dan-picker-btn fa-solid fa-face-smile interactable';
        button.title = 'Emoji & Kaomoji Picker';
        button.tabIndex = 0;
        
        // Try to insert in the best location
        let inserted = false;
        
        // Method 1: Insert before send button
        const sendButton = document.getElementById('send_but');
        if (sendButton && sendButton.parentNode) {
            sendButton.parentNode.insertBefore(button, sendButton);
            inserted = true;
            console.log(`[${MODULE_NAME}] Button inserted before send_but`);
        }
        
        // Method 2: Append to rightSendForm
        if (!inserted && rightSendForm) {
            rightSendForm.insertBefore(button, rightSendForm.firstChild);
            inserted = true;
            console.log(`[${MODULE_NAME}] Button inserted into rightSendForm`);
        }
        
        // Method 3: Append to send_but_wrap
        if (!inserted && sendButWrap) {
            sendButWrap.insertBefore(button, sendButWrap.firstChild);
            inserted = true;
            console.log(`[${MODULE_NAME}] Button inserted into send_but_wrap`);
        }
        
        if (!inserted) {
            console.warn(`[${MODULE_NAME}] Could not find suitable location for button`);
            return false;
        }
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log(`[${MODULE_NAME}] Button clicked!`);
            togglePicker();
        });
        
        // Touch support for mobile - use touchstart for immediate response
        button.addEventListener('touchstart', (e) => {
            console.log(`[${MODULE_NAME}] Button touchstart!`);
            button.style.background = 'lime'; // Visual debug
        });
        
        button.addEventListener('touchend', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log(`[${MODULE_NAME}] Button touchend!`);
            button.style.background = ''; // Reset
            togglePicker();
        });
        
        return true;
    }

    // Create the picker popup
    function createPickerPopup() {
        if (document.getElementById('dan_emoji_picker_popup')) return;
        
        const popup = document.createElement('div');
        popup.id = 'dan_emoji_picker_popup';
        popup.className = 'dan-picker-popup';
        popup.innerHTML = `
            <div class="dan-picker-header">
                <div class="dan-picker-tabs">
                    <button class="dan-tab active" data-tab="emoji">Emoji</button>
                    <button class="dan-tab" data-tab="kaomoji">Kaomoji</button>
                </div>
                <input type="text" class="dan-picker-search" placeholder="Search...">
            </div>
            <div class="dan-picker-categories" id="dan_emoji_categories">
                ${Object.keys(emojis).map(cat => 
                    `<button class="dan-cat-btn ${cat === 'smileys' ? 'active' : ''}" data-category="${cat}">${cat}</button>`
                ).join('')}
            </div>
            <div class="dan-picker-categories hidden" id="dan_kaomoji_categories"></div>
            <div class="dan-kaomoji-controls hidden" id="dan_kaomoji_controls">
                <button class="dan-add-btn" id="dan_add_kaomoji_btn">+ Add Kaomoji</button>
                <button class="dan-add-cat-btn" id="dan_add_category_btn">+ New Category</button>
                <button class="dan-delete-toggle" id="dan_delete_toggle">Delete Mode</button>
            </div>
            <div class="dan-add-form hidden" id="dan_add_form">
                <input type="text" id="dan_new_kaomoji" placeholder="Enter kaomoji">
                <select id="dan_new_category"></select>
                <div class="dan-form-buttons">
                    <button class="dan-save-btn" id="dan_save_kaomoji">Save</button>
                    <button class="dan-cancel-btn" id="dan_cancel_add">Cancel</button>
                </div>
            </div>
            <div class="dan-add-cat-form hidden" id="dan_add_cat_form">
                <input type="text" id="dan_new_cat_name" placeholder="Category name (lowercase, no spaces)">
                <div class="dan-form-buttons">
                    <button class="dan-save-btn" id="dan_save_category">Create</button>
                    <button class="dan-cancel-btn" id="dan_cancel_cat">Cancel</button>
                </div>
            </div>
            <div class="dan-picker-grid" id="dan_picker_grid"></div>
        `;
        
        document.body.appendChild(popup);
        
        // Event listeners
        popup.querySelectorAll('.dan-tab').forEach(tab => {
            tab.addEventListener('click', () => switchTab(tab.dataset.tab));
        });
        
        popup.querySelector('.dan-picker-search').addEventListener('input', (e) => {
            renderGrid(e.target.value);
        });
        
        popup.querySelectorAll('#dan_emoji_categories .dan-cat-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                popup.querySelectorAll('#dan_emoji_categories .dan-cat-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentCategory = btn.dataset.category;
                renderGrid();
            });
        });
        
        document.getElementById('dan_add_kaomoji_btn').addEventListener('click', () => {
            document.getElementById('dan_add_form').classList.remove('hidden');
            document.getElementById('dan_add_cat_form').classList.add('hidden');
            updateCategoryDropdown();
        });
        
        document.getElementById('dan_add_category_btn').addEventListener('click', () => {
            document.getElementById('dan_add_cat_form').classList.remove('hidden');
            document.getElementById('dan_add_form').classList.add('hidden');
        });
        
        document.getElementById('dan_delete_toggle').addEventListener('click', (e) => {
            deleteMode = !deleteMode;
            e.target.classList.toggle('active');
            document.getElementById('dan_picker_grid').classList.toggle('delete-mode');
        });
        
        document.getElementById('dan_save_kaomoji').addEventListener('click', () => {
            const kaomoji = document.getElementById('dan_new_kaomoji').value.trim();
            const category = document.getElementById('dan_new_category').value;
            if (kaomoji && category && settings) {
                if (!settings.kaomojis[category]) {
                    settings.kaomojis[category] = [];
                }
                settings.kaomojis[category].push(kaomoji);
                saveSettings();
                document.getElementById('dan_new_kaomoji').value = '';
                document.getElementById('dan_add_form').classList.add('hidden');
                renderGrid();
            }
        });
        
        document.getElementById('dan_cancel_add').addEventListener('click', () => {
            document.getElementById('dan_add_form').classList.add('hidden');
            document.getElementById('dan_new_kaomoji').value = '';
        });
        
        document.getElementById('dan_save_category').addEventListener('click', () => {
            let catName = document.getElementById('dan_new_cat_name').value.trim().toLowerCase().replace(/\s+/g, '_');
            if (catName && settings && !getAllKaomojiCategories().includes(catName) && catName !== 'all' && catName !== 'recent') {
                settings.customCategories.push(catName);
                settings.kaomojis[catName] = [];
                saveSettings();
                document.getElementById('dan_new_cat_name').value = '';
                document.getElementById('dan_add_cat_form').classList.add('hidden');
                renderKaomojiCategories();
                updateCategoryDropdown();
            } else if (catName) {
                alert('Category already exists or invalid name!');
            }
        });
        
        document.getElementById('dan_cancel_cat').addEventListener('click', () => {
            document.getElementById('dan_add_cat_form').classList.add('hidden');
            document.getElementById('dan_new_cat_name').value = '';
        });
        
        // Close on outside click
        document.addEventListener('click', (e) => {
            const popup = document.getElementById('dan_emoji_picker_popup');
            const btn = document.getElementById('dan_emoji_picker_btn');
            if (pickerVisible && popup && btn && 
                !popup.contains(e.target) && 
                !btn.contains(e.target)) {
                hidePicker();
            }
        });
        
        // Initial render of kaomoji categories
        renderKaomojiCategories();
        console.log(`[${MODULE_NAME}] Popup created`);
    }

    // Render kaomoji category buttons
    function renderKaomojiCategories() {
        const container = document.getElementById('dan_kaomoji_categories');
        if (!container) return;
        
        const allCats = getAllKaomojiCategories();
        
        container.innerHTML = `
            <button class="dan-cat-btn active" data-category="all">All</button>
            ${allCats.map(cat => {
                const isCustom = settings?.customCategories?.includes(cat);
                return `<button class="dan-cat-btn ${isCustom ? 'custom-cat' : ''}" data-category="${cat}" ${isCustom ? 'data-custom="true"' : ''}>${cat}</button>`;
            }).join('')}
            <button class="dan-cat-btn" data-category="recent">Recent</button>
        `;
        
        // Re-attach event listeners
        container.querySelectorAll('.dan-cat-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (e.button === 0) {
                    container.querySelectorAll('.dan-cat-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    currentKaomojiCategory = btn.dataset.category;
                    renderGrid();
                }
            });
            
            if (btn.dataset.custom === 'true') {
                btn.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    const cat = btn.dataset.category;
                    if (confirm(`Delete category "${cat}" and all its kaomoji?`)) {
                        deleteCategory(cat);
                    }
                });
            }
        });
    }

    // Delete a custom category
    function deleteCategory(catName) {
        if (!settings) return;
        const index = settings.customCategories.indexOf(catName);
        if (index > -1) {
            settings.customCategories.splice(index, 1);
            delete settings.kaomojis[catName];
            saveSettings();
            currentKaomojiCategory = 'all';
            renderKaomojiCategories();
            renderGrid();
        }
    }

    // Update the category dropdown
    function updateCategoryDropdown() {
        const select = document.getElementById('dan_new_category');
        if (!select) return;
        const allCats = getAllKaomojiCategories();
        select.innerHTML = allCats.map(cat => `<option value="${cat}">${cat}</option>`).join('');
    }

    // Switch tabs
    function switchTab(tab) {
        currentTab = tab;
        const popup = document.getElementById('dan_emoji_picker_popup');
        if (!popup) return;
        
        popup.querySelectorAll('.dan-tab').forEach(t => {
            t.classList.toggle('active', t.dataset.tab === tab);
        });
        
        document.getElementById('dan_emoji_categories')?.classList.toggle('hidden', tab !== 'emoji');
        document.getElementById('dan_kaomoji_categories')?.classList.toggle('hidden', tab !== 'kaomoji');
        document.getElementById('dan_kaomoji_controls')?.classList.toggle('hidden', tab !== 'kaomoji');
        document.getElementById('dan_add_form')?.classList.add('hidden');
        document.getElementById('dan_add_cat_form')?.classList.add('hidden');
        
        renderGrid();
    }

    // Render the grid
    function renderGrid(searchTerm = '') {
        const grid = document.getElementById('dan_picker_grid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        let items = [];
        const isEmoji = currentTab === 'emoji';
        
        if (isEmoji) {
            if (currentCategory === 'recent') {
                items = settings?.recentEmojis || [];
            } else {
                items = emojis[currentCategory] || [];
            }
        } else {
            if (currentKaomojiCategory === 'all') {
                for (const cat of getAllKaomojiCategories()) {
                    items = items.concat(settings?.kaomojis?.[cat] || []);
                }
            } else if (currentKaomojiCategory === 'recent') {
                items = settings?.recentKaomojis || [];
            } else {
                items = settings?.kaomojis?.[currentKaomojiCategory] || [];
            }
        }
        
        // Filter by search
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            items = items.filter(item => item.toLowerCase().includes(term));
        }
        
        // Remove duplicates
        items = [...new Set(items)];
        
        items.forEach(item => {
            const el = document.createElement('div');
            el.className = `dan-picker-item ${isEmoji ? 'emoji' : 'kaomoji'}`;
            el.textContent = item;
            el.addEventListener('click', () => handleItemClick(item, isEmoji));
            grid.appendChild(el);
        });
        
        if (items.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'dan-picker-empty';
            empty.textContent = searchTerm ? 'No results found' : 'No items in this category';
            grid.appendChild(empty);
        }
    }

    // Handle item click
    function handleItemClick(item, isEmoji) {
        if (!isEmoji && deleteMode && settings) {
            for (const cat of getAllKaomojiCategories()) {
                if (settings.kaomojis[cat]) {
                    const index = settings.kaomojis[cat].indexOf(item);
                    if (index > -1) {
                        settings.kaomojis[cat].splice(index, 1);
                    }
                }
            }
            const recentIndex = settings.recentKaomojis.indexOf(item);
            if (recentIndex > -1) settings.recentKaomojis.splice(recentIndex, 1);
            saveSettings();
            renderGrid();
        } else {
            insertIntoInput(item);
            addToRecent(item, isEmoji);
        }
    }

    // Toggle picker
    function togglePicker() {
        console.log(`[${MODULE_NAME}] togglePicker called, pickerVisible: ${pickerVisible}`);
        if (pickerVisible) {
            hidePicker();
        } else {
            showPicker();
        }
    }

    function showPicker() {
        console.log(`[${MODULE_NAME}] showPicker called`);
        const popup = document.getElementById('dan_emoji_picker_popup');
        const button = document.getElementById('dan_emoji_picker_btn');
        
        console.log(`[${MODULE_NAME}] popup:`, popup, 'button:', button);
        
        if (!popup || !button) {
            console.error(`[${MODULE_NAME}] Missing elements!`);
            return;
        }
        
        // Force show with inline styles that override everything
        popup.style.cssText = `
            display: flex !important;
            position: fixed !important;
            bottom: 80px !important;
            left: 10px !important;
            right: 10px !important;
            width: auto !important;
            max-width: 95vw !important;
            max-height: 70vh !important;
            z-index: 999999 !important;
            background: #1a1a1a !important;
            border: 2px solid #5865F2 !important;
            border-radius: 8px !important;
            flex-direction: column !important;
            overflow: hidden !important;
        `;
        
        popup.classList.add('visible');
        pickerVisible = true;
        
        console.log(`[${MODULE_NAME}] Popup should be visible now`);
        
        renderGrid();
    }

    function hidePicker() {
        const popup = document.getElementById('dan_emoji_picker_popup');
        if (popup) {
            popup.classList.remove('visible');
            popup.style.cssText = ''; // Clear inline styles
        }
        pickerVisible = false;
        deleteMode = false;
        const deleteToggle = document.getElementById('dan_delete_toggle');
        if (deleteToggle) deleteToggle.classList.remove('active');
        const grid = document.getElementById('dan_picker_grid');
        if (grid) grid.classList.remove('delete-mode');
    }

    // Main initialization
    function init() {
        if (initialized) {
            console.log(`[${MODULE_NAME}] Already initialized`);
            return;
        }
        
        console.log(`[${MODULE_NAME}] Initializing...`);
        
        if (!loadSettings()) {
            console.error(`[${MODULE_NAME}] Failed to load settings`);
            return;
        }
        
        if (!createPickerButton()) {
            console.error(`[${MODULE_NAME}] Failed to create picker button`);
            return;
        }
        
        createPickerPopup();
        initialized = true;
        console.log(`[${MODULE_NAME}] Extension loaded successfully!`);
    }

    // Wait for ST to be ready using multiple methods
    function waitForST() {
        console.log(`[${MODULE_NAME}] Waiting for SillyTavern...`);
        
        // Method 1: Use SillyTavern event system if available
        if (typeof SillyTavern !== 'undefined' && SillyTavern.getContext) {
            const context = SillyTavern.getContext();
            if (context && context.eventSource && context.event_types) {
                console.log(`[${MODULE_NAME}] Using SillyTavern event system`);
                context.eventSource.on(context.event_types.APP_READY, init);
                return;
            }
        }
        
        // Method 2: Use jQuery document ready as fallback
        if (typeof jQuery !== 'undefined') {
            console.log(`[${MODULE_NAME}] Using jQuery ready`);
            jQuery(document).ready(function() {
                // Wait a bit for ST to fully initialize
                setTimeout(init, 1500);
            });
            return;
        }
        
        // Method 3: Use DOMContentLoaded as last resort
        console.log(`[${MODULE_NAME}] Using DOMContentLoaded`);
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                setTimeout(init, 2000);
            });
        } else {
            setTimeout(init, 2000);
        }
    }
    
    // Start the initialization process
    waitForST();
})();
