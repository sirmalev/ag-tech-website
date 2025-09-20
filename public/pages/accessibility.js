/**
 * Accessibility Widget - Packaged Version
 * Author: Geminii
 * Version: 1.3.1
 * Description: A self-contained accessibility widget. Fixes button click area issue.
 */
document.addEventListener('DOMContentLoaded', () => {

    const widgetCSS = `
        :root {
            --widget-bg: #ffffff;
            --widget-text: #1a1a1a;
            --widget-primary: #005fcc;
            --widget-primary-hover: #004a9f;
            --widget-border-radius: 8px;
            --widget-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        #accessibility-widget {
            position: fixed;
            bottom: 20px;
            right: 20px;
            transform: translateY(-50%);
            z-index: 9999;
            direction: rtl;
        }
        #accessibility-btn {
            background-color: var(--widget-primary);
            color: white;
            border: none;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: var(--widget-shadow);
            display: flex;
            justify-content: center;
            align-items: center;
            transition: background-color 0.3s ease;
        }
        #accessibility-btn:hover {
            background-color: var(--widget-primary-hover);
        }
        #accessibility-btn svg {
            width: 32px;
            height: 32px;
            /* FIX: Prevent the SVG icon from capturing mouse events */
            pointer-events: none;
        }
        #accessibility-menu {
            display: none;
            position: absolute;
            bottom: 75px;
            right: 0;
            width: 300px;
            background-color: var(--widget-bg);
            border-radius: var(--widget-border-radius);
            box-shadow: var(--widget-shadow);
            padding: 15px;
            border: 1px solid #ddd;
            text-align: right;
        }
        #accessibility-menu.active {
            display: block;
        }
        #accessibility-menu h3 {
            margin-top: 0;
            margin-bottom: 15px;
            font-size: 18px;
            color: var(--widget-text);
            text-align: center;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
        }
        .accessibility-group {
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid #f0f0f0;
        }
        .accessibility-group:last-of-type {
            border-bottom: none;
            margin-bottom: 5px;
        }
        .accessibility-group .group-title {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #444;
        }
        .accessibility-group .group-controls {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
        }
        .accessibility-option-btn {
            background-color: #f0f0f0;
            border: 1px solid #ccc;
            color: var(--widget-text);
            padding: 8px 10px;
            border-radius: var(--widget-border-radius);
            cursor: pointer;
            font-size: 14px;
            transition: background-color 0.3s, border-color 0.3s;
            text-align: center;
        }
        .accessibility-option-btn:hover {
            background-color: #e0e0e0;
            border-color: #bbb;
        }
        .accessibility-option-btn.active {
            background-color: var(--widget-primary);
            color: white;
            border-color: var(--widget-primary);
        }
        #reset-accessibility-btn {
            background-color: #6c757d;
            color: white;
            width: 100%;
            margin-top: 10px;
            grid-column: 1 / -1;
        }
        #reset-accessibility-btn:hover {
            background-color: #5a6268;
        }
        
        /* Accessibility Styles */
        html.accessibility-grayscale { filter: grayscale(100%); }
        html.accessibility-high-contrast { background-color: #000 !important; color: #fff !important; }
        html.accessibility-high-contrast a { color: #ffff00 !important; }
        html.accessibility-negative-contrast { filter: invert(100%); background-color: #fff; }
        html.accessibility-negative-contrast #accessibility-widget,
        html.accessibility-negative-contrast img, 
        html.accessibility-negative-contrast video {
            filter: invert(100%);
        }
        html.accessibility-links-highlight a { background-color: yellow !important; color: black !important; padding: 2px; border: 1px solid black; }
        html.accessibility-headings-highlight h1, html.accessibility-headings-highlight h2, html.accessibility-headings-highlight h3, html.accessibility-headings-highlight h4, html.accessibility-headings-highlight h5, html.accessibility-headings-highlight h6 {
            background-color: #90ee90 !important;
            color: black !important;
            padding: 4px;
            border: 1px solid darkgreen;
        }
        html.accessibility-keyboard-navigation :focus {
            outline: 3px solid #005fcc !important;
            outline-offset: 2px;
            box-shadow: 0 0 10px rgba(0, 95, 204, 0.8);
        }
        html.accessibility-readable-font, html.accessibility-readable-font * { font-family: 'Arial', sans-serif !important; }
    `;

    const widgetHTML = `
        <h3 data-lang-key="acc_widget_title">תפריט נגישות</h3>
        <div class="accessibility-group">
            <div class="group-title" data-lang-key="acc_group_content">תוכן</div>
            <div class="group-controls">
                <button id="increase-text" class="accessibility-option-btn" data-lang-key="acc_increase_text_label" data-lang-attr="aria-label" aria-label="הגדל טקסט"><span data-lang-key="acc_increase_text">הגדל טקסט</span></button>
                <button id="decrease-text" class="accessibility-option-btn" data-lang-key="acc_decrease_text_label" data-lang-attr="aria-label" aria-label="הקטן טקסט"><span data-lang-key="acc_decrease_text">הקטן טקסט</span></button>
                <button id="readable-font" class="accessibility-option-btn" data-mode="readable-font" data-lang-key="acc_readable_font">פונט קריא</button>
            </div>
        </div>
        <div class="accessibility-group">
            <div class="group-title" data-lang-key="acc_group_color">צבע וניגודיות</div>
            <div class="group-controls">
                <button id="high-contrast" class="accessibility-option-btn" data-mode="high-contrast" data-lang-key="acc_high_contrast">ניגודיות גבוהה</button>
                <button id="negative-contrast" class="accessibility-option-btn" data-mode="negative-contrast" data-lang-key="acc_negative_contrast">צבעים הפוכים</button>
                <button id="grayscale" class="accessibility-option-btn" data-mode="grayscale" data-lang-key="acc_grayscale">גווני אפור</button>
            </div>
        </div>
        <div class="accessibility-group">
            <div class="group-title" data-lang-key="acc_group_nav">ניווט והדגשות</div>
            <div class="group-controls">
                <button id="links-highlight" class="accessibility-option-btn" data-mode="links-highlight" data-lang-key="acc_links_highlight">הדגשת קישורים</button>
                <button id="headings-highlight" class="accessibility-option-btn" data-mode="headings-highlight" data-lang-key="acc_headings_highlight">הדגשת כותרות</button>
                <button id="keyboard-navigation" class="accessibility-option-btn" data-mode="keyboard-navigation" data-lang-key="acc_keyboard_nav">ניווט מקלדת</button>
            </div>
        </div>
        <div class="group-controls">
             <button id="reset-accessibility-btn" class="accessibility-option-btn" data-lang-key="acc_reset">אפס את כל ההגדרות</button>
        </div>
    `;

    const styleSheet = document.createElement("style");
    styleSheet.innerText = widgetCSS;
    document.head.appendChild(styleSheet);

    const widgetRoot = document.createElement("div");
    widgetRoot.id = "accessibility-widget";
    document.body.appendChild(widgetRoot);
    
    widgetRoot.innerHTML = `
        <div id="accessibility-menu">${widgetHTML}</div>
        <button id="accessibility-btn" aria-label="פתח תפריט נגישות" data-lang-key="acc_btn_label" data-lang-attr="aria-label">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/></svg>
        </button>
    `;

    const accessibilityMenu = document.getElementById('accessibility-menu');
    const accessibilityBtn = document.getElementById('accessibility-btn');
    const html = document.documentElement;

    let settings = {
        fontSize: 1,
        grayscale: false,
        'high-contrast': false,
        'negative-contrast': false,
        'links-highlight': false,
        'headings-highlight': false,
        'keyboard-navigation': false,
        'readable-font': false
    };

    const FONT_SIZE_STEP = 0.1;
    const MAX_FONT_SIZE = 2.0;
    const MIN_FONT_SIZE = 0.7;

    const applySettings = () => {
        html.className = html.className.replace(/accessibility-\S+/g, '').trim();
        html.style.fontSize = `${settings.fontSize * 100}%`;

        for (const mode in settings) {
            if (settings[mode] && mode !== 'fontSize') {
                html.classList.add(`accessibility-${mode}`);
            }
            const button = document.querySelector(`[data-mode="${mode}"]`);
            if (button) {
                button.classList.toggle('active', settings[mode]);
            }
        }
    };
    
    const saveAndApplySettings = () => {
        localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
        applySettings();
    };

    const loadSettings = () => {
        const savedSettings = localStorage.getItem('accessibilitySettings');
        if (savedSettings) {
            settings = { ...settings, ...JSON.parse(savedSettings) };
        }
        applySettings();
    };
    
    const resetSettings = () => {
        localStorage.removeItem('accessibilitySettings');
        window.location.reload();
    };

    // Main button listener
    accessibilityBtn.addEventListener('click', () => {
        accessibilityMenu.classList.toggle('active');
    });

    // Menu options listener
    accessibilityMenu.addEventListener('click', (e) => {
        const target = e.target;
        if (!target.classList.contains('accessibility-option-btn')) return;

        const targetId = target.id;
        const targetMode = target.dataset.mode;

        if (targetId === 'increase-text') {
            if (settings.fontSize < MAX_FONT_SIZE) settings.fontSize += FONT_SIZE_STEP;
        } else if (targetId === 'decrease-text') {
            if (settings.fontSize > MIN_FONT_SIZE) settings.fontSize -= FONT_SIZE_STEP;
        } else if (targetId === 'reset-accessibility-btn') {
            resetSettings();
            return; // Exit after reset
        } else if (targetMode) {
            settings[targetMode] = !settings[targetMode];
        }
        
        saveAndApplySettings();
    });

    document.addEventListener('click', (e) => {
        if (!widgetRoot.contains(e.target)) {
            accessibilityMenu.classList.remove('active');
        }
    });

    loadSettings();
});
