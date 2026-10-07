// AGNEX Technology Backend - Cloudflare Worker
// Central Router for forms validation, Supabase DB operations, Resend Email alerts, and Gemini AI Chatbot

// In-memory rate limiter cache
const ipCache = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_MIN = 10; // Rate limit threshold

// Local Chatbot Fallback Rules (loaded directly to avoid network calls on fallback)
const LOCAL_CHATBOT_RULES = [
  {
    "type": "services",
    "regex": ["service", "சேவை", "மென்பொருள்"],
    "responseEn": "We specialize in Web Development, Mobile Apps (Android/iOS), and Custom ERP & Smart Inventory platforms. Type \"pricing\" or click Get a Quote to know more!",
    "responseTa": "நாங்கள் இணையதள உருவாக்கம் (Web), மொபைல் செயலிகள் (Android/iOS) மற்றும் தனிப்பயன் மென்பொருட்களை (ERP/Inventory) தயாரிப்பதில் நிபுணத்துவம் பெற்றவர்கள். மேலும் அறிய \"விலை\" என்று தட்டச்சு செய்யவும்!"
  },
  {
    "type": "location",
    "regex": ["location", "office", "namakkal", "நாமக்கல்", "முகவரி"],
    "responseEn": "AGNEX Technology is proudly located on Namakkal Main Road, Namakkal, Tamil Nadu, 637001, India. Our office hours are Monday-Saturday, 9 AM - 6 PM.",
    "responseTa": "அக்நெக்ஸ் டெக்னாலஜி நாமக்கல் மெயின் ரோடு, நாமக்கல், தமிழ்நாடு, 637001 இல் அமைந்துள்ளது. எங்களது வேலை நேரம் திங்கள்-சனி, காலை 9 மணி முதல் மாலை 6 மணி வரை ஆகும்."
  },
  {
    "type": "quote",
    "regex": ["quote", "price", "cost", "budget", "விலை", "மதிப்பீடு"],
    "responseEn": "Pricing varies depending on project scope. Basic business portals start at ₹25,000, while custom enterprise ERP systems start at ₹1,50,000. Let's discuss your project! Use our Contact Form to send an inquiry directly.",
    "responseTa": "திட்டத்தின் அளவைப் பொறுத்து விலை மாறுபடும். அடிப்படை வணிக இணையதளங்கள் ₹25,000 முதல் தொடங்குகின்றன, தனிப்பயன் ERP அமைப்புகள் ₹1,50,000 முதல் தொடங்குகின்றன. உங்கள் திட்டத்தை விவாதிக்க எங்களது தொடர்பு படிவத்தைப் பயன்படுத்தவும்."
  },
  {
    "type": "admin",
    "regex": ["contact", "team", "email", "phone", "தொடர்பு", "தொலைபேசி"],
    "responseEn": "You can call us at +91 9345402493, email support@agnex.tech, or fill out the Contact form below. We will get back to you within 24 hours!",
    "responseTa": "நீங்கள் எங்களை +91 9345402493 என்ற எண்ணில் அழைக்கலாம், support@agnex.tech என்ற முகவரிக்கு மின்னஞ்சல் அனுப்பலாம் அல்லது கீழே உள்ள படிவத்தை நிரப்பலாம். 24 மணி நேரத்திற்குள் நாங்கள் உங்களைத் தொடர்புகொள்வோம்!"
  },
  {
    "type": "greeting",
    "regex": ["hello", "hi", "வணக்கம்", "நன்றி"],
    "responseEn": "Hello! How can I assist you today? You can ask about our services, Namakkal office location, or pricing estimates.",
    "responseTa": "வணக்கம்! நான் உங்களுக்கு எவ்வாறு உதவ வேண்டும்? சேவைகள், நாமக்கல் அலுவலகம், அல்லது மதிப்பீடு பற்றி கேட்கலாம்."
  }
];

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const method = request.method;

    // Handle CORS preflight
    if (method === "OPTIONS") {
      return handleCORS();
    }

    // Apply Rate Limiting
    const clientIP = request.headers.get("CF-Connecting-IP") || "anonymous";
    const isTestBypass = env.ENVIRONMENT !== "production" && request.headers.get("X-Bypass-Rate-Limit") === "true";
    if (!isTestBypass && isRateLimited(clientIP)) {
      return jsonResponse({ message: "Too many requests. Please try again later." }, 429);
    }

    try {
      // API Routes Mapping
      switch (url.pathname) {
        case "/api/contact":
          if (method !== "POST") return jsonResponse({ message: "Method not allowed" }, 405);
          return await handleContactSubmit(request, env);

        case "/api/careers":
          if (method !== "POST") return jsonResponse({ message: "Method not allowed" }, 405);
          return await handleCareersSubmit(request, env);

        case "/api/newsletter":
          if (method !== "POST") return jsonResponse({ message: "Method not allowed" }, 405);
          return await handleNewsletterSubmit(request, env);

        case "/api/chat":
          if (method !== "POST") return jsonResponse({ message: "Method not allowed" }, 405);
          return await handleChatbot(request, env);

        case "/api/services":
        case "/api/content/services":
          if (method === "GET") return await getServices(env);
          return jsonResponse({ message: "Method not allowed" }, 405);

        case "/api/blogs":
        case "/api/content/blogs":
          if (method === "GET") return await getBlogs(env);
          return jsonResponse({ message: "Method not allowed" }, 405);

        default:
          return jsonResponse({ message: "Not Found" }, 404);
      }
    } catch (err) {
      console.error("Worker Execution Error:", err);
      return jsonResponse({ message: "Internal Server Error", error: err.message }, 500);
    }
  }
};

// --- CORS & Responses ---
function handleCORS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, DELETE",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
      "Access-Control-Max-Age": "86400"
    }
  });
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status: status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, DELETE",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey"
    }
  });
}

// --- Rate Limiter ---
function isRateLimited(ip) {
  const now = Date.now();
  if (!ipCache.has(ip)) {
    ipCache.set(ip, { count: 1, firstRequestTime: now });
    return false;
  }

  const rateData = ipCache.get(ip);
  if (now - rateData.firstRequestTime > RATE_LIMIT_WINDOW) {
    // Reset window
    rateData.count = 1;
    rateData.firstRequestTime = now;
    return false;
  }

  rateData.count++;
  return rateData.count > MAX_REQUESTS_PER_MIN;
}

// --- Route Handlers ---

// Handle Contact Submission
async function handleContactSubmit(request, env) {
  const body = await request.json();

  // 1. Spambot Honeypot Validation
  if (body.company) {
    console.warn("[Honeypot Triggered] Spambot detected via company field");
    // Return fake success to discourage retrying
    return jsonResponse({ message: "Submission successful (honeypot caught)" }, 200);
  }

  const { name, phone, message } = body;
  if (!name || !phone || !message) {
    return jsonResponse({ message: "Missing required fields" }, 400);
  }

  // 2. Save Submissions in Supabase
  let dbResult = null;
  if (env.SUPABASE_URL && env.SUPABASE_ANON_KEY) {
    try {
      const response = await fetch(`${env.SUPABASE_URL}/rest/v1/contacts`, {
        method: "POST",
        headers: {
          "apikey": env.SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${env.SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
          "Prefer": "return=representation"
        },
        body: JSON.stringify({ name, phone, message })
      });
      if (response.ok) {
        dbResult = await response.json();
      } else {
        console.error("Supabase Contact Insert Failure:", await response.text());
      }
    } catch (dbErr) {
      console.error("Supabase Contact Insert Exception:", dbErr);
    }
  }

  // 3. Email Notification via Resend API
  if (env.RESEND_API_KEY && env.ADMIN_EMAIL) {
    try {
      const emailHtml = `
        <h3>New AGNEX Technology Lead Inquiry</h3>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Phone/Mobile:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Requirements:</strong></p>
        <blockquote style="background:#f4f4f5; padding:10px; border-left:4px solid #ff5500;">
          ${escapeHtml(message).replace(/\n/g, "<br>")}
        </blockquote>
        <p style="font-size:0.85em; color:#71717a;">Submitted at: ${new Date().toISOString()}</p>
      `;

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "Vantrex Leads <onboarding@resend.dev>",
          to: [env.ADMIN_EMAIL],
          subject: `New Lead Inquiry: ${name}`,
          html: emailHtml
        })
      });
    } catch (emailErr) {
      console.error("Resend Email Delivery Exception:", emailErr);
    }
  }

  return jsonResponse({ message: "Lead submitted successfully", details: dbResult }, 200);
}

// Handle Careers Form Submission
async function handleCareersSubmit(request, env) {
  const body = await request.json();

  if (body.company) {
    return jsonResponse({ message: "Submission successful (honeypot caught)" }, 200);
  }

  const { candidateName, candidateEmail, portfolioLink } = body;
  if (!candidateName || !candidateEmail || !portfolioLink) {
    return jsonResponse({ message: "Missing required fields" }, 400);
  }

  let dbResult = null;
  if (env.SUPABASE_URL && env.SUPABASE_ANON_KEY) {
    try {
      const response = await fetch(`${env.SUPABASE_URL}/rest/v1/careers`, {
        method: "POST",
        headers: {
          "apikey": env.SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${env.SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
          "Prefer": "return=representation"
        },
        body: JSON.stringify({
          candidate_name: candidateName,
          candidate_email: candidateEmail,
          portfolio_link: portfolioLink
        })
      });
      if (response.ok) {
        dbResult = await response.json();
      } else {
        console.error("Supabase Careers Insert Failure:", await response.text());
      }
    } catch (dbErr) {
      console.error("Supabase Careers Insert Exception:", dbErr);
    }
  }

  // Resend Alert for Application
  if (env.RESEND_API_KEY && env.ADMIN_EMAIL) {
    try {
      const emailHtml = `
        <h3>New AGNEX Technology Job Application</h3>
        <p><strong>Candidate Name:</strong> ${escapeHtml(candidateName)}</p>
        <p><strong>Email Address:</strong> ${escapeHtml(candidateEmail)}</p>
        <p><strong>Portfolio Link:</strong> <a href="${escapeHtml(portfolioLink)}">${escapeHtml(portfolioLink)}</a></p>
      `;

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "Vantrex Careers <onboarding@resend.dev>",
          to: [env.ADMIN_EMAIL],
          subject: `New Job Application: ${candidateName}`,
          html: emailHtml
        })
      });
    } catch (emailErr) {
      console.error("Resend Careers Email Delivery Exception:", emailErr);
    }
  }

  return jsonResponse({ message: "Application submitted successfully", details: dbResult }, 200);
}

// Handle Newsletter Signup
async function handleNewsletterSubmit(request, env) {
  const body = await request.json();
  const { email } = body;

  if (!email) {
    return jsonResponse({ message: "Email is required" }, 400);
  }

  let dbResult = null;
  if (env.SUPABASE_URL && env.SUPABASE_ANON_KEY) {
    try {
      const response = await fetch(`${env.SUPABASE_URL}/rest/v1/newsletter_subscribers`, {
        method: "POST",
        headers: {
          "apikey": env.SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${env.SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
          "Prefer": "return=representation"
        },
        body: JSON.stringify({ email })
      });
      if (response.ok) {
        dbResult = await response.json();
      } else {
        // If email already exists, Supabase returns 409
        const txt = await response.text();
        if (response.status === 409) {
          return jsonResponse({ message: "Email already subscribed" }, 200);
        }
        console.error("Supabase Newsletter Insert Failure:", txt);
      }
    } catch (dbErr) {
      console.error("Supabase Newsletter Exception:", dbErr);
    }
  }

  return jsonResponse({ message: "Subscribed successfully", details: dbResult }, 200);
}

// Handle Gemini Chatbot Response
async function handleChatbot(request, env) {
  const body = await request.json();
  const { message, history, lang } = body;
  const currentLang = lang || "en";

  if (!message) {
    return jsonResponse({ message: "Message is required" }, 400);
  }

  // Fallback engine if Gemini is unconfigured or errors
  const fallbackResponse = () => {
    return runLocalChatbotRulesFallback(message, currentLang);
  };

  if (!env.GEMINI_API_KEY) {
    console.warn("Gemini API key missing. Falling back to rule-matching engine.");
    return jsonResponse({ response: fallbackResponse() });
  }

  try {
    // Construct Gemini Content payload
    const contents = [];

    // Append history
    if (history && Array.isArray(history)) {
      history.forEach(msg => {
        contents.push({
          role: msg.className === "user-message" ? "user" : "model",
          parts: [{ text: msg.text }]
        });
      });
    }

    // Append current message
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const systemPrompt = `
You are AGNEX AI Agent, a helpful, polite, and technical customer support assistant for AGNEX Technology (website: www.agnex.tech).

Company Background:
* AGNEX Technology is a custom software engineering agency in Namakkal, Tamil Nadu, 637001, India.
* Office hours are Monday to Saturday, 9 AM - 6 PM.
* Contact Number: +91 9345402493, Contact Email: support@agnex.tech.

Services Offered:
1. Web Development: Business portals, high-conversion e-commerce engines, advanced dashboards (built for security and performance).
2. Mobile App Development: Native Android, native iOS, cross-platform apps, and interactive booking platforms.
3. Custom Software Development: Enterprise ticketing, facility life cycle portals, dynamic real-time inventory systems.

Pricing Guidelines:
* Basic business portals start from ₹25,000.
* Custom enterprise ERP & inventory systems start from ₹1,50,000.
* Exact project pricing is scoped dynamically based on client requirement details.

Guidelines:
* Respond strictly in the language queried by the user. If they write in Tamil (or using Tamil words like சேவை, விலை, நாமக்கல்), respond in clear Tamil. If they write in English, respond in English.
* Keep responses concise, helpful, and professional.
* Qualify leads: if they ask about pricing or custom software, politely ask for their specific project name, requirements, or contact info to schedule a free engineering consultation, and encourage them to fill out the Contact Form.
* Do not make up services or location details we do not offer.
    `;

    const apiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${env.GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: contents,
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
        generationConfig: {
          maxOutputTokens: 300,
          temperature: 0.7
        }
      })
    });

    if (!apiResponse.ok) {
      const errTxt = await apiResponse.text();
      console.warn("Gemini API non-200 response. Falling back to rules:", errTxt);
      return jsonResponse({ response: fallbackResponse() });
    }

    const resData = await apiResponse.json();
    const botText = resData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (botText) {
      return jsonResponse({ response: botText });
    } else {
      console.warn("Gemini API response content empty. Falling back to rules.");
      return jsonResponse({ response: fallbackResponse() });
    }

  } catch (err) {
    console.error("Gemini Chatbot exception. Falling back to rules:", err);
    return jsonResponse({ response: fallbackResponse() });
  }
}

// Get Dynamic Services Catalog
async function getServices(env) {
  if (env.SUPABASE_URL && env.SUPABASE_ANON_KEY) {
    try {
      const response = await fetch(`${env.SUPABASE_URL}/rest/v1/services?select=*&order=created_at.asc`, {
        method: "GET",
        headers: {
          "apikey": env.SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${env.SUPABASE_ANON_KEY}`
        }
      });
      if (response.ok) {
        const services = await response.json();
        return jsonResponse({ services });
      }
    } catch (err) {
      console.error("Supabase getServices Exception:", err);
    }
  }

  // Fallback to static services (returns empty list so index.html static markup is kept)
  return jsonResponse({ services: [] });
}

// Get Dynamic Blogs
async function getBlogs(env) {
  if (env.SUPABASE_URL && env.SUPABASE_ANON_KEY) {
    try {
      const response = await fetch(`${env.SUPABASE_URL}/rest/v1/blogs?select=*&is_published=eq.true&order=published_at.desc`, {
        method: "GET",
        headers: {
          "apikey": env.SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${env.SUPABASE_ANON_KEY}`
        }
      });
      if (response.ok) {
        const posts = await response.json();
        return jsonResponse({ posts });
      }
    } catch (err) {
      console.error("Supabase getBlogs Exception:", err);
    }
  }

  // Return null so frontend fallback manager renders static mock posts
  return jsonResponse({ posts: null });
}

// --- Helpers ---

// Escapes HTML tags to prevent injections in email delivery
function escapeHtml(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Local rules-based chatbot fallback engine
function runLocalChatbotRulesFallback(query, currentLang) {
  const cleanQuery = query.toLowerCase();
  const isTamil = currentLang === "ta" || /[அ-ஹ]/.test(query);

  for (const rule of LOCAL_CHATBOT_RULES) {
    const match = rule.regex.some(keyword => cleanQuery.includes(keyword.toLowerCase()));
    if (match) {
      return isTamil ? rule.responseTa : rule.responseEn;
    }
  }

  // Default handler response
  const ctaHtml = `<a href="#contact" style="color: #ff5500; text-decoration: underline;">Contact form</a>`;
  return isTamil
    ? `எங்களைத் தொடர்பு கொண்டதற்கு நன்றி! உங்கள் வினவல் குறித்து கீழே உள்ள தொடர்பு படிவத்தைப் பூர்த்தி செய்வதன் மூலம் எங்கள் பொறியாளர்களுடன் நேரடியாக விவாதிக்க பரிந்துரைக்கிறேன்.`
    : `Thank you for reaching out! Please share your query via our ${ctaHtml} or email us at support@agnex.tech.`;
}
