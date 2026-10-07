import { FallbackManager } from '/utils/fallbackManager.js';

export async function initLocalization() {
    let currentLang = localStorage.getItem('lang') || 'en';
    
    async function fetchTranslations(lang) {
        try {
            const response = await fetch(`/lang/${lang}.json`);
            if (!response.ok) throw new Error('Failed to fetch translations');
            return await response.json();
        } catch (error) {
            return FallbackManager.handleLocalizationFallback(lang, `/lang/${lang}.json`);
        }
    }

    async function setLanguage(lang) {
        currentLang = lang;
        document.documentElement.lang = lang;
        localStorage.setItem('lang', lang);
        
        const currentLangText = document.getElementById('currentLangText');
        if (currentLangText) {
            currentLangText.textContent = lang.toUpperCase();
        }
        
        document.querySelectorAll('.lang-option-btn').forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        const dict = await fetchTranslations(lang);
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const val = dict[key];
            if (!val) return;
            
            if (val.includes('<') || element.tagName === 'H2' || element.tagName === 'H1' || element.tagName === 'H3' || element.tagName === 'P') {
                element.innerHTML = val;
            } else {
                element.textContent = val;
            }
        });
        
        const chatbotInput = document.getElementById('chatbotInput');
        if (chatbotInput) {
            chatbotInput.placeholder = lang === 'ta' ? 'செய்தியை தட்டச்சு செய்க...' : 'Type a message...';
        }
        
        updateGreeting(lang);
        
        // Dispatch custom event for chatbot or others to re-render if needed
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
    }

    // Adaptive personalized greeting based on user time-of-day
    function updateGreeting(lang) {
        const personalizedGreeting = document.getElementById('personalizedGreeting');
        if (!personalizedGreeting) return;
        
        const hour = new Date().getHours();
        let greeting = '';
        
        if (lang === 'ta') {
            if (hour < 12) {
                greeting = 'காலை வணக்கம்! அக்நெக்ஸ் டெக்னாலஜி-க்கு வரவேற்கிறோம்';
            } else if (hour < 17) {
                greeting = 'மதிய வணக்கம்! அக்நெக்ஸ் டெக்னாலஜி-க்கு வரவேற்கிறோம்';
            } else {
                greeting = 'மாலை வணக்கம்! அக்நெக்ஸ் டெக்னாலஜி-க்கு வரவேற்கிறோம்';
            }
        } else {
            if (hour < 12) {
                greeting = 'Good Morning! Welcome to AGNEX Technology';
            } else if (hour < 17) {
                greeting = 'Good Afternoon! Welcome to AGNEX Technology';
            } else {
                greeting = 'Good Evening! Welcome to AGNEX Technology';
            }
        }
        personalizedGreeting.textContent = greeting;
    }

    // Language Toggler Actions
    const langToggleBtn = document.getElementById('langToggleBtn');
    const langDropdown = document.getElementById('langDropdown');
    
    if (langToggleBtn && langDropdown) {
        langToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const show = langDropdown.classList.toggle('show');
            langToggleBtn.setAttribute('aria-expanded', show);
        });
        
        document.addEventListener('click', () => {
            langDropdown.classList.remove('show');
            langToggleBtn.setAttribute('aria-expanded', 'false');
        });
        
        document.querySelectorAll('.lang-option-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                setLanguage(lang);
            });
        });
    }

    // Set initial localized language
    await setLanguage(currentLang);
    
    window.getCurrentLang = () => currentLang;
}
