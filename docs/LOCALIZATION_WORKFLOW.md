# Localization Workflow

This document outlines how to manage, update, and deploy localized content for the AGNEX Technology corporate website.

## Architecture

The website uses a **Data Attribute-Driven Localization System** built with Vanilla JavaScript and the Fetch API.
Translations are stored as separate JSON files (`en.json`, `ta.json`) and injected into the DOM asynchronously on page load or when the user toggles their language preference.

## Adding a New Translatable Element

1. **Add `data-i18n` attribute in HTML:**
   Identify the HTML node you want to translate and add `data-i18n="yourKey"`.
   ```html
   <h2 data-i18n="newFeatureTitle">Default English Title</h2>
   ```
2. **Update JSON Files:**
   Open all language files in the `/lang` directory (`en.json`, `ta.json`, etc.) and add the new key.
   
   **lang/en.json**
   ```json
   {
       ...
       "newFeatureTitle": "Brand New Feature"
   }
   ```
   **lang/ta.json**
   ```json
   {
       ...
       "newFeatureTitle": "புதிய சிறப்பம்சம்"
   }
   ```
3. **Save and Test:**
   Reload the page locally. The translation script in `js/localization.js` automatically iterates over all `[data-i18n]` elements and injects the corresponding strings.

## Adding a New Language

1. **Create JSON Dictionary:**
   Create a new file in the `/lang` directory, e.g., `es.json` for Spanish.
2. **Copy and Translate:**
   Copy the contents of `en.json` into `es.json` and translate the values while preserving the keys.
3. **Update Language Selector UI:**
   In `index.html`, add a new language option button within the `.lang-dropdown`:
   ```html
   <button class="lang-option-btn" data-lang="es">Spanish</button>
   ```
4. **Update Greetings (Optional):**
   In `js/localization.js`, update the `updateGreeting(lang)` switch block if you have dynamic, time-based greetings tailored for that language.

## Deployment Readiness & Caching

To ensure optimal load times, language JSON files should be aggressively cached by the browser and CDN, utilizing Cache-Control headers, while allowing for easy invalidation upon updates.

**Recommended Caching Headers:**
Configure your web server (e.g., Apache `.htaccess`, Nginx, or Vercel `vercel.json`) to serve `.json` files with appropriate headers:

```json
{
  "headers": [
    {
      "source": "/lang/(.*).json",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

*Note: If you use immutable caching, you must implement cache busting (e.g., `fetch('lang/en.json?v=2')`) in `localization.js` when modifying language content, or rely on ETag validation (e.g., `max-age=0, must-revalidate`).*
