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

const unifiedHeader = `
<div class="lhl-header-inner">
  <a class="lhl-header-brand" href="/" aria-label="Long Holistic Life home">
    <img src="/lhl-logo.webp" alt="" width="58" height="58">
    <span>
      <strong>Long Holistic Life</strong>
      <small>Faith-centered whole-person wellness for women</small>
    </span>
  </a>
  <nav class="lhl-header-nav" aria-label="Main navigation">
    <a href="/coaching/">Coaching</a>
    <a href="/new-creation/">NEW CREATION</a>
    <a class="lhl-header-workshop" href="/workshop">Workshop</a>
    <a href="/about/">About</a>
    <a class="lhl-header-cta" href="/#free-guide">Get the Free Guide</a>
  </nav>
</div>`;

const welcomeHeader = unifiedHeader.replace(
  'class="lhl-header-cta" href="/#free-guide">Get the Free Guide</a>',
  'class="lhl-header-cta" href="#book-a-call">Book a Call</a>'
);

const unifiedFooter = `
<div class="lhl-footer-main">
  <nav class="lhl-footer-nav" aria-label="Explore Long Holistic Life">
    <a href="/">Home</a>
    <a href="/coaching/">Coaching</a>
    <a href="/new-creation/">NEW CREATION</a>
    <a href="/workshop">Workshop</a>
    <a href="/about/">About</a>
    <a href="/learn/">Resources</a>
  </nav>

  <div class="lhl-footer-brand-block">
    <a class="lhl-footer-logo" href="/" aria-label="Long Holistic Life home">
      <img src="/lhl-logo.webp" alt="" width="68" height="68">
    </a>
    <a class="lhl-footer-brand-copy" href="/">
      <strong>Long Holistic Life</strong>
      <span>Whole-person wellness for the body, mind, relationships, and spirit.</span>
    </a>
  </div>

  <div class="lhl-footer-contact">
    <a class="lhl-footer-email" href="mailto:brittany@longholisticlife.com">brittany@longholisticlife.com</a>
    <a class="lhl-footer-book" href="https://scheduler.zoom.us/brittany-long-roller-i22l52/60-mins-with-brittany" target="_blank" rel="noopener noreferrer">Book a Call</a>
  </div>
</div>
<div class="lhl-footer-credit">
  <a href="https://faithcraft.agency/" target="_blank" rel="noopener noreferrer">Powered by FaithCraft.Agency</a>
  <span>© 2026 Long Holistic Life</span>
</div>`;

const welcomeConsultationSection = `
<section class="consultation-section" id="consultation">
  <div class="consultation-card">
    <div class="consultation-copy">
      <p class="welcome-eyebrow">Your next step is personal</p>
      <h2>Stop Guessing. Find Your Next Rhythm.</h2>
      <p>During your complimentary call, Brittany will listen, help clarify the gap between where you are and how you want to feel, and explore whether coaching fits your next season.</p>
      <p class="consultation-promise">You do not need perfect habits, a diagnosis, or a completed guide before reaching out.</p>
    </div>
    <div class="consultation-actions">
      <a id="book-a-call" class="contact-button lhl-welcome-book-call" href="https://scheduler.zoom.us/brittany-long-roller-i22l52/60-mins-with-brittany" target="_blank" rel="noopener noreferrer">
        <b>Book a Call</b>
        <small>Choose a time that works for you</small>
      </a>
      <p class="contact-microcopy">No pressure • No judgment • No obligation to purchase</p>
    </div>
  </div>
</section>`;

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

class BrandHeadHandler {
  element(element) {
    element.append(
      `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/sitewide-brand-v2.css">`,
      { html: true }
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
    element.prepend('<script src="/assets/welcome-top-fix-v5.js"></script><script src="/assets/women-consult-invites.js" defer></script>', { html: true });
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
      element.setAttribute("href", "/favicon.png");
      element.setAttribute("type", "image/png");
    }
  }
}

class UnifiedHeaderHandler {
  element(element) {
    element.setAttribute("class", "lhl-site-header");
    element.setInnerContent(unifiedHeader, { html: true });
  }
}

class WelcomeHeaderHandler {
  element(element) {
    element.setAttribute("class", "lhl-site-header");
    element.setInnerContent(welcomeHeader, { html: true });
  }
}

class RemoveWelcomeConsultationHandler {
  element(element) {
    element.remove();
  }
}

class WelcomeFooterHandler {
  element(element) {
    element.before(welcomeConsultationSection, { html: true });
    element.setAttribute("class", "lhl-site-footer");
    element.setInnerContent(unifiedFooter, { html: true });
  }
}

class WelcomeFinalCallHandler {
  element(element) {
    element.setAttribute("href", "https://scheduler.zoom.us/brittany-long-roller-i22l52/60-mins-with-brittany");
    element.setAttribute("target", "_blank");
    element.setAttribute("rel", "noopener noreferrer");
    element.setInnerContent('Book a Call <span aria-hidden="true">→</span>', { html: true });
  }
}

class WelcomeMobileCallHandler {
  element(element) {
    element.setAttribute("href", "https://scheduler.zoom.us/brittany-long-roller-i22l52/60-mins-with-brittany");
    element.setAttribute("target", "_blank");
    element.setAttribute("rel", "noopener noreferrer");
    element.setInnerContent('Book a Call <span aria-hidden="true">→</span>', { html: true });
  }
}

class UnifiedFooterHandler {
  element(element) {
    element.setAttribute("class", "lhl-site-footer");
    element.setInnerContent(unifiedFooter, { html: true });
  }
}

function redirect(url, status = 301) {
  return Response.redirect(url.toString(), status);
}

function applySiteChrome(rewriter) {
  return rewriter
    .on("head", new BrandHeadHandler())
    .on("header", new UnifiedHeaderHandler())
    .on("footer", new UnifiedFooterHandler())
    .on('link[rel*="icon"]', new FaviconHandler());
}

const WORKSHOP_PAYMENT_LINK_ID = "plink_1UKkRHLw0gD5inNPqPXXE4Ja";
const WORKSHOP_EVENT_NAME = "NEW CREATION Workshop Purchased";
const WORKSHOP_PAID_TAG = "Workshop Paid – Nov 22 2026";
const OMNISEND_API_VERSION = "2026-03-15";

function hexToBytes(hex) {
  if (!hex || hex.length % 2 !== 0 || !/^[0-9a-f]+$/i.test(hex)) return null;
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes;
}

async function verifyStripeSignature(rawBody, signatureHeader, secret) {
  if (!signatureHeader || !secret) return false;

  const parts = signatureHeader.split(",").map((part) => part.trim());
  const timestampPart = parts.find((part) => part.startsWith("t="));
  const signatures = parts
    .filter((part) => part.startsWith("v1="))
    .map((part) => part.slice(3));

  if (!timestampPart || signatures.length === 0) return false;

  const timestamp = Number(timestampPart.slice(2));
  if (!Number.isFinite(timestamp)) return false;

  // Stripe recommends rejecting signatures outside a short replay window.
  const toleranceSeconds = 300;
  if (Math.abs(Math.floor(Date.now() / 1000) - timestamp) > toleranceSeconds) {
    return false;
  }

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );
  const signedPayload = encoder.encode(`${timestamp}.${rawBody}`);

  for (const signature of signatures) {
    const signatureBytes = hexToBytes(signature);
    if (!signatureBytes) continue;
    if (await crypto.subtle.verify("HMAC", key, signatureBytes, signedPayload)) {
      return true;
    }
  }

  return false;
}

function stripeEventCacheRequest(eventID) {
  return new Request(
    `${PRIMARY_ORIGIN}/__stripe-webhook-cache/${encodeURIComponent(eventID)}`,
    { method: "GET" }
  );
}

async function wasStripeEventProcessed(eventID) {
  try {
    if (!globalThis.caches?.default) return false;
    return Boolean(await globalThis.caches.default.match(stripeEventCacheRequest(eventID)));
  } catch {
    return false;
  }
}

async function markStripeEventProcessed(eventID) {
  try {
    if (!globalThis.caches?.default) return;
    await globalThis.caches.default.put(
      stripeEventCacheRequest(eventID),
      new Response("processed", {
        headers: { "Cache-Control": "public, max-age=604800" },
      })
    );
  } catch {
    // Best-effort duplicate protection. Stripe signature verification remains authoritative.
  }
}

async function handleWorkshopStripeWebhook(request, env) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", {
      status: 405,
      headers: { Allow: "POST" },
    });
  }

  if (!env.STRIPE_WEBHOOK_SECRET || !env.OMNISEND_API_KEY) {
    console.error("Workshop webhook secrets are not configured.");
    return new Response("Webhook configuration incomplete", { status: 500 });
  }

  const rawBody = await request.text();
  const signatureHeader = request.headers.get("Stripe-Signature");
  const validSignature = await verifyStripeSignature(
    rawBody,
    signatureHeader,
    env.STRIPE_WEBHOOK_SECRET
  );

  if (!validSignature) {
    return new Response("Invalid Stripe signature", { status: 400 });
  }

  let stripeEvent;
  try {
    stripeEvent = JSON.parse(rawBody);
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  if (stripeEvent.type !== "checkout.session.completed") {
    return new Response("Event ignored", { status: 200 });
  }

  if (stripeEvent.id && (await wasStripeEventProcessed(stripeEvent.id))) {
    return new Response("Event already processed", { status: 200 });
  }

  const session = stripeEvent.data?.object;
  if (!session || session.object !== "checkout.session") {
    return new Response("Checkout session missing", { status: 400 });
  }

  // This Stripe account sells other products too. Only the NEW CREATION
  // Workshop Payment Link is allowed to trigger this Omnisend event.
  if (session.payment_link !== WORKSHOP_PAYMENT_LINK_ID) {
    return new Response("Non-workshop checkout ignored", { status: 200 });
  }

  // Do not send purchase confirmations for a Checkout Session that is not paid.
  if (session.payment_status !== "paid") {
    return new Response("Workshop checkout not paid yet", { status: 200 });
  }

  const email = session.customer_details?.email || session.customer_email || "";
  const phone = session.customer_details?.phone || "";

  if (!email && !phone) {
    console.error("Paid workshop Checkout Session has no email or phone.", session.id);
    return new Response("Purchaser contact information missing", { status: 422 });
  }

  const contact = {
    tags: [WORKSHOP_PAID_TAG],
  };
  if (email) contact.email = email;
  if (phone) contact.phone = phone;

  const eventTime = stripeEvent.created
    ? new Date(stripeEvent.created * 1000).toISOString()
    : new Date().toISOString();

  const omnisendPayload = {
    eventName: WORKSHOP_EVENT_NAME,
    origin: "api",
    eventTime,
    contact,
    properties: {
      stripeEventID: stripeEvent.id || "",
      stripeCheckoutSessionID: session.id || "",
      stripePaymentLinkID: session.payment_link || "",
      amountTotal:
        typeof session.amount_total === "number" ? session.amount_total / 100 : 0,
      currency: (session.currency || "usd").toUpperCase(),
      paymentStatus: session.payment_status || "",
      workshop: "NEW CREATION Whole-Person Reset Workshop",
      workshopDate: "November 22, 2026",
    },
  };

  const omnisendResponse = await fetch("https://api.omnisend.com/api/events", {
    method: "POST",
    headers: {
      Authorization: `Omnisend-API-Key ${env.OMNISEND_API_KEY}`,
      "Omnisend-Version": OMNISEND_API_VERSION,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(omnisendPayload),
  });

  if (!omnisendResponse.ok) {
    const errorText = await omnisendResponse.text();
    console.error(
      "Omnisend workshop event failed:",
      omnisendResponse.status,
      errorText.slice(0, 1000)
    );
    return new Response("Omnisend delivery failed", { status: 502 });
  }

  if (stripeEvent.id) await markStripeEventProcessed(stripeEvent.id);

  return new Response("Workshop purchase sent to Omnisend", { status: 200 });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/stripe-workshop") {
      return handleWorkshopStripeWebhook(request, env);
    }

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

    if (url.pathname === "/workshop.html" || url.pathname === "/workshop/") {
      url.pathname = "/workshop";
      return redirect(url);
    }

    if (
      url.pathname === "/workshops" ||
      url.pathname === "/workshops/" ||
      url.pathname === "/workshops/index.html"
    ) {
      url.pathname = "/workshop";
      return redirect(url);
    }

    if (url.pathname === "/workshop/booked.html" || url.pathname === "/workshop/booked/") {
      url.pathname = "/workshop/booked";
      return redirect(url);
    }

    if (DIRECTORY_PATHS.has(url.pathname)) {
      url.pathname += "/";
      return redirect(url);
    }

    if (url.pathname === "/workshop/booked") {
      const assetUrl = new URL(request.url);
      assetUrl.pathname = "/workshop/booked-page.txt";

      const rawBookedPage = await env.ASSETS.fetch(
        new Request(assetUrl.toString(), request)
      );

      if (!rawBookedPage.ok) return rawBookedPage;

      const bookedHeaders = new Headers(rawBookedPage.headers);
      bookedHeaders.set("content-type", "text/html; charset=UTF-8");
      bookedHeaders.delete("location");

      const bookedResponse = new Response(await rawBookedPage.text(), {
        status: 200,
        headers: bookedHeaders,
      });

      let rewriter = new HTMLRewriter();
      rewriter = applySiteChrome(rewriter);
      return rewriter.transform(bookedResponse);
    }

    const response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("text/html")) return response;

    if (url.pathname === "/" || url.pathname === "") {
      let rewriter = new HTMLRewriter()
        .on("title", new ReplaceTitle())
        .on('meta[name="description"]', new ReplaceDescription())
        .on("head", new HomeHeadHandler())
        .on('img[src="/lhl-logo.png"]', new LogoImageHandler())
        .on('link[rel="preload"][href="/lhl-logo.png"]', new LogoPreloadHandler());
      rewriter = applySiteChrome(rewriter);
      return rewriter.transform(response);
    }

    if (url.pathname === "/welcome" || url.pathname === "/welcome/") {
      let rewriter = new HTMLRewriter()
        .on("head", new WelcomeHeadHandler())
        .on("header", new WelcomeHeaderHandler())
        .on("section.consultation-section", new RemoveWelcomeConsultationHandler())
        .on(".welcome-final-cta a.welcome-primary-cta", new WelcomeFinalCallHandler())
        .on("a.welcome-mobile-cta", new WelcomeMobileCallHandler())
        .on("footer", new WelcomeFooterHandler())
        .on('link[rel*="icon"]', new FaviconHandler());
      return rewriter.transform(response);
    }

    let rewriter = new HTMLRewriter();
    rewriter = applySiteChrome(rewriter);
    return rewriter.transform(response);
  },
};
