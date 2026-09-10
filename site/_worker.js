const PRIMARY_ORIGIN = "https://longholisticlife.com";
const PRIMARY_HOST = "longholisticlife.com";
const REDIRECT_HOSTS = new Set([
  "www.longholisticlife.com",
  "longholistic.life",
  "www.longholistic.life",
]);
const DIRECTORY_PATHS = new Set([
  "/coaching",
  "/new-creation",
  "/workshops",
  "/about",
  "/learn",
  "/learn/faith-based-holistic-health-coaching",
  "/learn/whole-person-wellness-for-busy-christian-women",
  "/learn/sustainable-health-rhythms-busy-life",
]);

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${PRIMARY_ORIGIN}/#organization`,
      "name": "Long Holistic Life",
      "url": `${PRIMARY_ORIGIN}/`,
      "logo": `${PRIMARY_ORIGIN}/lhl-logo.png`,
      "email": "brittany@longholisticlife.com",
      "description": "Faith-centered whole-person wellness coaching and education for women, built around practical sustainable health rhythms.",
      "founder": { "@type": "Person", "name": "Brittany Long" }
    },
    {
      "@type": "WebSite",
      "@id": `${PRIMARY_ORIGIN}/#website`,
      "url": `${PRIMARY_ORIGIN}/`,
      "name": "Long Holistic Life",
      "publisher": { "@id": `${PRIMARY_ORIGIN}/#organization` },
      "inLanguage": "en-US"
    },
    {
      "@type": "WebPage",
      "@id": `${PRIMARY_ORIGIN}/#webpage`,
      "url": `${PRIMARY_ORIGIN}/`,
      "name": "Christian Holistic Health Coaching for Women | Long Holistic Life",
      "description": "Faith-based holistic health coaching and a free whole-person wellness guide for busy Christian women seeking sustainable health rhythms.",
      "isPartOf": { "@id": `${PRIMARY_ORIGIN}/#website` },
      "about": { "@id": `${PRIMARY_ORIGIN}/#organization` },
      "inLanguage": "en-US"
    },
    {
      "@type": "Service",
      "@id": `${PRIMARY_ORIGIN}/#coaching-service`,
      "name": "Faith-Based Holistic Health Coaching for Women",
      "serviceType": "Christian holistic health coaching",
      "provider": { "@id": `${PRIMARY_ORIGIN}/#organization` },
      "url": `${PRIMARY_ORIGIN}/coaching/`,
      "audience": {
        "@type": "Audience",
        "audienceType": "Busy Christian women seeking sustainable whole-person wellness support"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is the NEW CREATION guide really free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. It is a free digital resource from Long Holistic Life with no purchase required."
          }
        },
        {
          "@type": "Question",
          "name": "Is this another diet or exercise plan?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. NEW CREATION is a whole-person framework. It helps you consider nourishment, energy, rest, stress, movement, relationships, outlook, environment, faith, and sustainable rhythms together."
          }
        },
        {
          "@type": "Question",
          "name": "What if I have a medical condition or take medication?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Continue working with your licensed healthcare professional. The guide provides general education and reflection; it does not diagnose, treat, or replace individualized medical advice."
          }
        }
      ]
    }
  ]
};

class ReplaceTitle {
  element(element) {
    element.setInnerContent("Christian Holistic Health Coaching for Women | Long Holistic Life");
  }
}

class ReplaceDescription {
  element(element) {
    element.setAttribute(
      "content",
      "Faith-based holistic health coaching for busy Christian women. Build sustainable rhythms for nourishment, energy, stress, sleep, movement, relationships, and spiritual well-being."
    );
  }
}

class HomeHeadHandler {
  element(element) {
    element.append(
      `<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
<link rel="canonical" href="${PRIMARY_ORIGIN}/">
<link rel="stylesheet" href="/assets/content-seo.css">
<meta name="theme-color" content="#F7F4EE">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Long Holistic Life">
<meta property="og:title" content="Christian Holistic Health Coaching for Women | Long Holistic Life">
<meta property="og:description" content="Faith-based whole-person health coaching and a free NEW CREATION guide for busy Christian women who want sustainable wellness rhythms without another extreme plan.">
<meta property="og:url" content="${PRIMARY_ORIGIN}/">
<meta property="og:image" content="${PRIMARY_ORIGIN}/lhl-logo.png">
<meta property="og:image:alt" content="Long Holistic Life sunrise and pathway logo">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Christian Holistic Health Coaching for Women">
<meta name="twitter:description" content="Faith-based whole-person coaching and the NEW CREATION wellness framework for sustainable health rhythms.">
<meta name="twitter:image" content="${PRIMARY_ORIGIN}/lhl-logo.png">
<script type="application/ld+json">${JSON.stringify(homeSchema)}</script>`,
      { html: true }
    );
  }
}

class WelcomeHeadHandler {
  element(element) {
    element.prepend('<script src="/assets/welcome-top-fix-v4.js"></script>', { html: true });
    element.append(
      `<meta name="robots" content="noindex,follow,max-image-preview:large">
<link rel="canonical" href="${PRIMARY_ORIGIN}/welcome">
<meta name="theme-color" content="#F7F4EE">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Long Holistic Life">
<meta property="og:title" content="Your Guided NEW CREATION Experience | Long Holistic Life">
<meta property="og:description" content="Explore the interactive NEW CREATION web guides for women and men, then choose your next practical whole-person wellness rhythm.">
<meta property="og:url" content="${PRIMARY_ORIGIN}/welcome">
<meta property="og:image" content="${PRIMARY_ORIGIN}/lhl-logo.png">
<meta name="twitter:card" content="summary_large_image">`,
      { html: true }
    );
  }
}

class LogoImageHandler {
  element(element) {
    if (element.getAttribute("src") === "/lhl-logo.png") element.setAttribute("src", "/lhl-logo.webp");
    element.setAttribute("decoding", "async");
  }
}

class LogoPreloadHandler {
  element(element) {
    element.setAttribute("href", "/lhl-logo.webp");
    element.setAttribute("type", "image/webp");
  }
}

class FaviconHandler {
  element(element) {
    const rel = element.getAttribute("rel") || "";
    if (rel.includes("icon") && rel !== "apple-touch-icon") {
      element.setAttribute("href", "/favicon.svg");
      element.setAttribute("type", "image/svg+xml");
    }
  }
}

class HomeFooterHandler {
  element(element) {
    element.append(
      `<nav class="seo-home-links" aria-label="Explore Long Holistic Life">
<a href="/coaching/">Christian Health Coaching</a>
<a href="/new-creation/">NEW CREATION Framework</a>
<a href="/workshops/">Christian Wellness Workshops</a>
<a href="/about/">About</a>
<a href="/learn/">Christian Wellness Resources</a>
</nav>`,
      { html: true }
    );
  }
}

class SitewideCreditHandler {
  element(element) {
    element.append(
      `<style>
.faithcraft-credit{box-sizing:border-box;width:100%;padding:14px 20px;text-align:center;background:#F7F4EE;border-top:1px solid #E2E9DF;color:#33483B;font-family:Lato,Arial,sans-serif;font-size:13px;line-height:1.5}
.faithcraft-credit a{color:inherit;text-decoration:none}
@media(max-width:768px){.faithcraft-credit{padding-bottom:86px}}
</style>
<div class="faithcraft-credit">
<a href="https://faithcraft.agency/" target="_blank" rel="noopener noreferrer">Powered by FaithCraft.Agency</a>
</div>`,
      { html: true }
    );
  }
}

function redirect(url, status = 301) {
  return Response.redirect(url.toString(), status);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (REDIRECT_HOSTS.has(url.hostname)) {
      url.protocol = "https:";
      url.hostname = PRIMARY_HOST;
      return redirect(url);
    }

    if (url.pathname === "/index.html") {
      url.pathname = "/";
      return redirect(url);
    }

    if (url.pathname === "/welcome.html") {
      url.pathname = "/welcome";
      return redirect(url);
    }

    if (DIRECTORY_PATHS.has(url.pathname)) {
      url.pathname += "/";
      return redirect(url);
    }

    const response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("text/html")) return response;

    if (url.pathname === "/" || url.pathname === "") {
      return new HTMLRewriter()
        .on("title", new ReplaceTitle())
        .on('meta[name="description"]', new ReplaceDescription())
        .on("head", new HomeHeadHandler())
        .on('img[src="/lhl-logo.png"]', new LogoImageHandler())
        .on('link[rel="preload"][href="/lhl-logo.png"]', new LogoPreloadHandler())
        .on('link[rel*="icon"]', new FaviconHandler())
        .on("footer", new HomeFooterHandler())
        .on("body", new SitewideCreditHandler())
        .transform(response);
    }

    if (url.pathname === "/welcome" || url.pathname === "/welcome/") {
      return new HTMLRewriter()
        .on("head", new WelcomeHeadHandler())
        .on('link[rel*="icon"]', new FaviconHandler())
        .on("body", new SitewideCreditHandler())
        .transform(response);
    }

    return new HTMLRewriter()
      .on("body", new SitewideCreditHandler())
      .transform(response);
  },
};