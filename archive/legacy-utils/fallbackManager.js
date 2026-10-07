export class FallbackManager {
    static async fetchWithFallback(url, fallbackType) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.warn(`[Fallback Triggered] Failed to fetch from ${url}. Type: ${fallbackType}. Error:`, error);
            return FallbackManager.handleContentFallback(fallbackType);
        }
    }

    static handleContentFallback(type) {
        if (type === 'services') {
            // By returning null, we signal the caller to NOT overwrite the DOM,
            // preserving the static HTML fallback already present in index.html.
            return null;
        }

        if (type === 'blogs') {
            return {
                posts: [
                    {
                        title: "Architecting Modern High-Performance API Gateways",
                        summary: "Discover core engineering strategies to manage low-latency traffic, SSL termination, and rate-limiting at scale in distributed ecosystems.",
                        author_email: "tech-team@agnex.tech",
                        published_at: new Date(2026, 4, 15).toISOString()
                    },
                    {
                        title: "Why We Chose Clean Architecture for Node.js Services",
                        summary: "An in-depth analysis detailing how separation of concerns, entity abstractions, and boundary layers accelerate agile product deployment.",
                        author_email: "engineering@agnex.tech",
                        published_at: new Date(2026, 4, 1).toISOString()
                    },
                    {
                        title: "Maximizing UX Performance with Micro-Animations",
                        summary: "Learn the scientific impact of responsive design systems, HSL-based smooth dark-mode transitions, and user engagement metrics.",
                        author_email: "ux-team@agnex.tech",
                        published_at: new Date(2026, 3, 20).toISOString()
                    }
                ]
            };
        }

        return null;
    }

    static handleChatbotFallback(query, rules, currentLang) {
        const cleanQuery = query.toLowerCase();
        const isTamil = currentLang === 'ta' || /[அ-ஹ]/.test(query);

        if (rules && Array.isArray(rules)) {
            for (const rule of rules) {
                const match = rule.regex.some(keyword => cleanQuery.includes(keyword.toLowerCase()));
                if (match) {
                    return isTamil ? rule.responseTa : rule.responseEn;
                }
            }
        }

        // Default handler if no rules match
        const ctaHtml = `<a href="#contact" style="color: #ff5500; text-decoration: underline;">Contact form</a>`;
        return isTamil
            ? `எங்களைத் தொடர்பு கொண்டதற்கு நன்றி! உங்கள் வினவல் குறித்து கீழே உள்ள தொடர்பு படிவத்தைப் பூர்த்தி செய்வதன் மூலம் எங்கள் பொறியாளர்களுடன் நேரடியாக விவாதிக்க பரிந்துரைக்கிறேன்.`
            : `Thank you for reaching out! Please share your query via our ${ctaHtml} or email us at support@agnex.tech.`;
    }

    static handleLocalizationFallback(lang, errorPath) {
        console.warn(`[Fallback Triggered] Localization failed for language: ${lang}. Path: ${errorPath}`);
        
        // Check for dev mode
        if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
            FallbackManager.showDeveloperAlert(`Localization Failed for: ${lang}`);
        }
        
        return {};
    }

    static showDeveloperAlert(message) {
        if (typeof document === 'undefined') return;
        
        const banner = document.createElement('div');
        banner.style.position = 'fixed';
        banner.style.top = '0';
        banner.style.left = '0';
        banner.style.width = '100%';
        banner.style.backgroundColor = 'red';
        banner.style.color = 'white';
        banner.style.textAlign = 'center';
        banner.style.padding = '10px';
        banner.style.zIndex = '9999';
        banner.style.fontWeight = 'bold';
        banner.textContent = `[Developer Alert] ${message}`;
        
        document.body.prepend(banner);
        
        setTimeout(() => {
            banner.remove();
        }, 5000);
    }
}
