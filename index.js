// Lei's Emoji & Kaomoji Picker for SillyTavern
const MODULE_NAME = 'lei_emoji_kaomoji_picker';

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
    animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐻‍❄️', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🙈', '🙉', '🙊', '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🪱', '🐛', '🦋', '🐌', '🐞', '🐜', '🪰', '🦗', '🪳', '🕷️', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🦬', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑', '🦙', '🐐', '🦌', '🐕', '🐩', '🦮', '🐕‍🦺', '🐈', '🐈‍⬛', '🐓', '🦃', '🦤', '🦚', '🦜', '🦢', '🦩', '🕊️', '🐇', '🦝', '🦨', '🦡', '🦫', '🦦', '🦥', '🐁', '🐀', '🐿️', '🦔'],
    food: ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶️', '🫑', '🌽', '🥕', '🫒', '🧄', '🧅', '🥔', '🍠', '🥐', '🥯', '🍞', '🥖', '🥨', '🧀', '🥚', '🍳', '🧈', '🥞', '🧇', '🥓', '🥩', '🍗', '🍖', '🌭', '🍔', '🍟', '🍕', '🫓', '🥪', '🥙', '🧆', '🌮', '🌯', '🫔', '🥗', '🥘', '🫕', '🍝', '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🦪', '🍤', '🍙', '🍚', '🍘', '🍥', '🥠', '🥮', '🍢', '🍡', '🍧', '🍨', '🍦', '🥧', '🧁', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫', '🍿', '🍩', '🍪', '🌰', '🥜', '🍯', '🥛', '🍼', '🫖', '☕', '🍵', '🧃', '🥤', '🧋', '🍶', '🍺', '🍻', '🥂', '🍷', '🥃', '🍸', '🍹', '🧉', '🍾', '🧊'],
    nature: ['🌸', '💮', '🏵️', '🌹', '🥀', '🌺', '🌻', '🌼', '🌷', '🌱', '🪴', '🌲', '🌳', '🌴', '🌵', '🌾', '🌿', '☘️', '🍀', '🍁', '🍂', '🍃', '🍄', '🌰', '🦀', '🦞', '🦐', '🦑', '🌍', '🌎', '🌏', '🌐', '🪨', '🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘', '🌙', '🌚', '🌛', '🌜', '☀️', '🌝', '🌞', '⭐', '🌟', '🌠', '☁️', '⛅', '⛈️', '🌤️', '🌥️', '🌦️', '🌧️', '🌨️', '🌩️', '🌪️', '🌫️', '🌬️', '🌈', '☂️', '☔', '⚡', '❄️', '☃️', '⛄', '🔥', '💧', '🌊'],
    objects: ['⌚', '📱', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '💽', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '📽️', '🎞️', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙️', '🎚️', '🎛️', '🧭', '⏱️', '⏲️', '⏰', '🕰️', '⌛', '⏳', '📡', '🔋', '🔌', '💡', '🔦', '🕯️', '🪔', '🧯', '💸', '💵', '💴', '💶', '💷', '💰', '💳', '💎', '⚖️', '🔧', '🔨', '⚒️', '🛠️', '⛏️', '🔩', '⚙️', '🔫', '💣', '🪓', '🔪', '🗡️', '⚔️', '🛡️', '🚬', '⚰️', '⚱️', '🏺', '🔮', '📿', '🧿', '💈', '⚗️', '🔭', '🔬', '🕳️', '🩹', '🩺', '💊', '💉', '🩸', '🧬', '🦠', '🧫', '🧪'],
    symbols: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '❤️‍🔥', '❤️‍🩹', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉️', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐', '⛎', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', '🆔', '⚛️', '🉑', '☢️', '☣️', '📴', '📳', '🈶', '🈚', '🈸', '🈺', '🈷️', '✴️', '🆚', '💮', '🉐', '㊙️', '㊗️', '🈴', '🈵', '🈹', '🈲', '🅰️', '🅱️', '🆎', '🆑', '🅾️', '🆘', '❌', '⭕', '🛑', '⛔', '📛', '🚫', '💯', '💢', '♨️', '🚷', '🚯', '🚳', '🚱', '🔞', '📵', '🚭', '❗', '❕', '❓', '❔', '‼️', '⁉️', '🔅', '🔆', '〽️', '⚠️', '🚸', '🔱', '⚜️', '🔰', '♻️', '✅', '🈯', '💹', '❇️', '✳️', '❎', '🌐', '💠', 'Ⓜ️', '🌀', '💤', '🏧', '🚾', '♿', '🅿️', '🈳', '🈂️', '🛂', '🛃', '🛄', '🛅', '🚹', '🚺', '🚼', '⚧️', '🚻', '🚮', '🎦', '📶', '🈁', '🔣', 'ℹ️', '🔤', '🔡', '🔠', '🆖', '🆗', '🆙', '🆒', '🆕', '🆓', '0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', '🔢', '#️⃣', '*️⃣', '⏏️', '▶️', '⏸️', '⏯️', '⏹️', '⏺️', '⏭️', '⏮️', '⏩', '⏪', '⏫', '⏬', '◀️', '🔼', '🔽', '➡️', '⬅️', '⬆️', '⬇️', '↗️', '↘️', '↙️', '↖️', '↕️', '↔️', '↪️', '↩️', '⤴️', '⤵️', '🔀', '🔁', '🔂', '🔄', '🔃', '🎵', '🎶', '➕', '➖', '➗', '✖️', '🟰', '♾️', '💲', '💱', '™️', '©️', '®️', '〰️', '➰', '➿', '🔚', '🔙', '🔛', '🔝', '🔜', '✔️', '☑️', '🔘', '🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '⚫', '⚪', '🟤', '🔺', '🔻', '🔸', '🔹', '🔶', '🔷', '🔳', '🔲', '▪️', '▫️', '◾', '◽', '◼️', '◻️', '🟥', '🟧', '🟨', '🟩', '🟦', '🟪', '⬛', '⬜', '🟫', '🔈', '🔇', '🔉', '🔊', '🔔', '🔕', '📣', '📢', '👁️‍🗨️', '💬', '💭', '🗯️', '♠️', '♣️', '♥️', '♦️', '🃏', '🎴', '🀄', '🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕛', '🕜', '🕝', '🕞', '🕟', '🕠', '🕡', '🕢', '🕣', '🕤', '🕥', '🕦', '🕧']
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

// Initialize settings
function loadSettings() {
    const { extensionSettings } = SillyTavern.getContext();
    
    if (!extensionSettings[MODULE_NAME]) {
        extensionSettings[MODULE_NAME] = {
            kaomojis: structuredClone(defaultKaomojis),
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
}

function saveSettings() {
    const { saveSettingsDebounced } = SillyTavern.getContext();
    saveSettingsDebounced();
}

// Get all kaomoji categories (default + custom)
function getAllKaomojiCategories() {
    return [...defaultCategoryNames, ...settings.customCategories];
}

// Insert text into the message input
function insertIntoInput(text) {
    const textarea = document.getElementById('send_textarea');
    if (!textarea) return;
    
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
    const list = isEmoji ? settings.recentEmojis : settings.recentKaomojis;
    const index = list.indexOf(item);
    if (index > -1) list.splice(index, 1);
    list.unshift(item);
    if (list.length > 20) list.pop();
    saveSettings();
}

// Create the picker button
function createPickerButton() {
    const sendButton = document.getElementById('send_but');
    if (!sendButton) return;
    
    // Check if button already exists
    if (document.getElementById('lei_emoji_picker_btn')) return;
    
    const button = document.createElement('div');
    button.id = 'lei_emoji_picker_btn';
    button.className = 'lei-picker-btn fa-solid fa-face-smile';
    button.title = 'Emoji & Kaomoji Picker';
    button.addEventListener('click', togglePicker);
    
    // Insert before send button
    sendButton.parentNode.insertBefore(button, sendButton);
}

// Create the picker popup
function createPickerPopup() {
    if (document.getElementById('lei_emoji_picker_popup')) return;
    
    const popup = document.createElement('div');
    popup.id = 'lei_emoji_picker_popup';
    popup.className = 'lei-picker-popup';
    popup.innerHTML = `
        <div class="lei-picker-header">
            <div class="lei-picker-tabs">
                <button class="lei-tab active" data-tab="emoji">Emoji</button>
                <button class="lei-tab" data-tab="kaomoji">Kaomoji</button>
            </div>
            <input type="text" class="lei-picker-search" placeholder="Search...">
        </div>
        <div class="lei-picker-categories" id="lei_emoji_categories">
            ${Object.keys(emojis).map(cat => 
                `<button class="lei-cat-btn ${cat === 'smileys' ? 'active' : ''}" data-category="${cat}">${cat}</button>`
            ).join('')}
        </div>
        <div class="lei-picker-categories hidden" id="lei_kaomoji_categories"></div>
        <div class="lei-kaomoji-controls hidden" id="lei_kaomoji_controls">
            <button class="lei-add-btn" id="lei_add_kaomoji_btn">+ Add Kaomoji</button>
            <button class="lei-add-cat-btn" id="lei_add_category_btn">+ New Category</button>
            <button class="lei-delete-toggle" id="lei_delete_toggle">Delete Mode</button>
        </div>
        <div class="lei-add-form hidden" id="lei_add_form">
            <input type="text" id="lei_new_kaomoji" placeholder="Enter kaomoji">
            <select id="lei_new_category"></select>
            <div class="lei-form-buttons">
                <button class="lei-save-btn" id="lei_save_kaomoji">Save</button>
                <button class="lei-cancel-btn" id="lei_cancel_add">Cancel</button>
            </div>
        </div>
        <div class="lei-add-cat-form hidden" id="lei_add_cat_form">
            <input type="text" id="lei_new_cat_name" placeholder="Category name (lowercase, no spaces)">
            <div class="lei-form-buttons">
                <button class="lei-save-btn" id="lei_save_category">Create</button>
                <button class="lei-cancel-btn" id="lei_cancel_cat">Cancel</button>
            </div>
        </div>
        <div class="lei-picker-grid" id="lei_picker_grid"></div>
    `;
    
    document.body.appendChild(popup);
    
    // Event listeners
    popup.querySelectorAll('.lei-tab').forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });
    
    popup.querySelector('.lei-picker-search').addEventListener('input', (e) => {
        renderGrid(e.target.value);
    });
    
    popup.querySelectorAll('#lei_emoji_categories .lei-cat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            popup.querySelectorAll('#lei_emoji_categories .lei-cat-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            renderGrid();
        });
    });
    
    document.getElementById('lei_add_kaomoji_btn').addEventListener('click', () => {
        document.getElementById('lei_add_form').classList.remove('hidden');
        document.getElementById('lei_add_cat_form').classList.add('hidden');
        updateCategoryDropdown();
    });
    
    document.getElementById('lei_add_category_btn').addEventListener('click', () => {
        document.getElementById('lei_add_cat_form').classList.remove('hidden');
        document.getElementById('lei_add_form').classList.add('hidden');
    });
    
    document.getElementById('lei_delete_toggle').addEventListener('click', (e) => {
        deleteMode = !deleteMode;
        e.target.classList.toggle('active');
        document.getElementById('lei_picker_grid').classList.toggle('delete-mode');
    });
    
    document.getElementById('lei_save_kaomoji').addEventListener('click', () => {
        const kaomoji = document.getElementById('lei_new_kaomoji').value.trim();
        const category = document.getElementById('lei_new_category').value;
        if (kaomoji && category) {
            if (!settings.kaomojis[category]) {
                settings.kaomojis[category] = [];
            }
            settings.kaomojis[category].push(kaomoji);
            saveSettings();
            document.getElementById('lei_new_kaomoji').value = '';
            document.getElementById('lei_add_form').classList.add('hidden');
            renderGrid();
        }
    });
    
    document.getElementById('lei_cancel_add').addEventListener('click', () => {
        document.getElementById('lei_add_form').classList.add('hidden');
        document.getElementById('lei_new_kaomoji').value = '';
    });
    
    document.getElementById('lei_save_category').addEventListener('click', () => {
        let catName = document.getElementById('lei_new_cat_name').value.trim().toLowerCase().replace(/\s+/g, '_');
        if (catName && !getAllKaomojiCategories().includes(catName) && catName !== 'all' && catName !== 'recent') {
            settings.customCategories.push(catName);
            settings.kaomojis[catName] = [];
            saveSettings();
            document.getElementById('lei_new_cat_name').value = '';
            document.getElementById('lei_add_cat_form').classList.add('hidden');
            renderKaomojiCategories();
            updateCategoryDropdown();
        } else if (catName) {
            alert('Category already exists or invalid name!');
        }
    });
    
    document.getElementById('lei_cancel_cat').addEventListener('click', () => {
        document.getElementById('lei_add_cat_form').classList.add('hidden');
        document.getElementById('lei_new_cat_name').value = '';
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
        if (pickerVisible && 
            !popup.contains(e.target) && 
            !document.getElementById('lei_emoji_picker_btn').contains(e.target)) {
            hidePicker();
        }
    });
    
    // Initial render of kaomoji categories
    renderKaomojiCategories();
}

// Render kaomoji category buttons
function renderKaomojiCategories() {
    const container = document.getElementById('lei_kaomoji_categories');
    const allCats = getAllKaomojiCategories();
    
    container.innerHTML = `
        <button class="lei-cat-btn active" data-category="all">All</button>
        ${allCats.map(cat => {
            const isCustom = settings.customCategories.includes(cat);
            return `<button class="lei-cat-btn ${isCustom ? 'custom-cat' : ''}" data-category="${cat}" ${isCustom ? 'data-custom="true"' : ''}>${cat}</button>`;
        }).join('')}
        <button class="lei-cat-btn" data-category="recent">Recent</button>
    `;
    
    // Re-attach event listeners
    container.querySelectorAll('.lei-cat-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Right-click on custom category to delete it
            if (e.button === 0) { // Left click
                container.querySelectorAll('.lei-cat-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentKaomojiCategory = btn.dataset.category;
                renderGrid();
            }
        });
        
        // Add right-click to delete custom categories
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

// Update the category dropdown in the add form
function updateCategoryDropdown() {
    const select = document.getElementById('lei_new_category');
    const allCats = getAllKaomojiCategories();
    select.innerHTML = allCats.map(cat => `<option value="${cat}">${cat}</option>`).join('');
}

// Switch between emoji and kaomoji tabs
function switchTab(tab) {
    currentTab = tab;
    const popup = document.getElementById('lei_emoji_picker_popup');
    
    popup.querySelectorAll('.lei-tab').forEach(t => {
        t.classList.toggle('active', t.dataset.tab === tab);
    });
    
    document.getElementById('lei_emoji_categories').classList.toggle('hidden', tab !== 'emoji');
    document.getElementById('lei_kaomoji_categories').classList.toggle('hidden', tab !== 'kaomoji');
    document.getElementById('lei_kaomoji_controls').classList.toggle('hidden', tab !== 'kaomoji');
    document.getElementById('lei_add_form').classList.add('hidden');
    document.getElementById('lei_add_cat_form').classList.add('hidden');
    
    renderGrid();
}

// Render the grid
function renderGrid(searchTerm = '') {
    const grid = document.getElementById('lei_picker_grid');
    grid.innerHTML = '';
    
    let items = [];
    const isEmoji = currentTab === 'emoji';
    
    if (isEmoji) {
        if (currentCategory === 'recent') {
            items = settings.recentEmojis;
        } else {
            items = emojis[currentCategory] || [];
        }
    } else {
        if (currentKaomojiCategory === 'all') {
            for (const cat of getAllKaomojiCategories()) {
                items = items.concat(settings.kaomojis[cat] || []);
            }
        } else if (currentKaomojiCategory === 'recent') {
            items = settings.recentKaomojis;
        } else {
            items = settings.kaomojis[currentKaomojiCategory] || [];
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
        el.className = `lei-picker-item ${isEmoji ? 'emoji' : 'kaomoji'}`;
        el.textContent = item;
        el.addEventListener('click', () => handleItemClick(item, isEmoji));
        grid.appendChild(el);
    });
    
    // Show empty state
    if (items.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'lei-picker-empty';
        empty.textContent = searchTerm ? 'No results found' : 'No items in this category';
        grid.appendChild(empty);
    }
}

// Handle item click
function handleItemClick(item, isEmoji) {
    if (!isEmoji && deleteMode) {
        // Delete kaomoji from all categories
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

// Toggle picker visibility
function togglePicker() {
    if (pickerVisible) {
        hidePicker();
    } else {
        showPicker();
    }
}

function showPicker() {
    const popup = document.getElementById('lei_emoji_picker_popup');
    const button = document.getElementById('lei_emoji_picker_btn');
    
    if (!popup || !button) return;
    
    // Position popup above button
    const rect = button.getBoundingClientRect();
    popup.style.bottom = `${window.innerHeight - rect.top + 10}px`;
    popup.style.right = `${window.innerWidth - rect.right}px`;
    
    popup.classList.add('visible');
    pickerVisible = true;
    renderGrid();
}

function hidePicker() {
    const popup = document.getElementById('lei_emoji_picker_popup');
    if (popup) {
        popup.classList.remove('visible');
    }
    pickerVisible = false;
    deleteMode = false;
    const deleteToggle = document.getElementById('lei_delete_toggle');
    if (deleteToggle) deleteToggle.classList.remove('active');
    const grid = document.getElementById('lei_picker_grid');
    if (grid) grid.classList.remove('delete-mode');
}

// Initialize
function init() {
    loadSettings();
    createPickerButton();
    createPickerPopup();
    console.log(`[${MODULE_NAME}] Extension loaded`);
}

// Wait for ST to be ready
if (typeof SillyTavern !== 'undefined' && SillyTavern.getContext) {
    const { eventSource, event_types } = SillyTavern.getContext();
    eventSource.on(event_types.APP_READY, init);
} else {
    // Fallback for older versions
    jQuery(() => {
        setTimeout(init, 1000);
    });
}
