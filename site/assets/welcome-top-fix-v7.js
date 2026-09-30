(function () {
  "use strict";

  var params = new URLSearchParams(window.location.search);
  var normalWelcomeEntry = !window.location.hash && !params.has("guide");
  var nativeScrollIntoView = Element.prototype.scrollIntoView;

  if (normalWelcomeEntry) {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    var resetTop = function () {
      window.scrollTo(0, 0);
    };

    resetTop();
    window.addEventListener("pageshow", resetTop, { once: true });
    document.addEventListener("DOMContentLoaded", resetTop, { once: true });
    window.setTimeout(resetTop, 80);
    window.setTimeout(resetTop, 500);
  }

  /*
   * Chrome can intermittently trap scrolling after same-document hash jumps
   * on this generated welcome page. Use a real document navigation for the
   * two section-jump CTAs instead. Direct visits to these hashed URLs scroll
   * normally, so this reproduces the behavior of a manual refresh.
   */
  function goToSection(hash) {
    window.location.assign("/welcome/" + hash);
  }

  var BOOKING_URL = "https://scheduler.zoom.us/brittany-long-roller-i22l52/60-mins-with-brittany";

  function applyWelcomeBookingLayout() {
    var header = document.querySelector("header");
    if (header && !header.classList.contains("lhl-site-header")) {
      header.className = "lhl-site-header";
      header.innerHTML =
        '<div class="lhl-header-inner">' +
        '<a class="lhl-header-brand" href="/" aria-label="Long Holistic Life home"><img src="/lhl-logo.webp" alt="" width="58" height="58"><span><strong>Long Holistic Life</strong><small>Faith-centered whole-person wellness for women</small></span></a>' +
        '<nav class="lhl-header-nav" aria-label="Main navigation"><a href="/coaching/">Coaching</a><a href="/new-creation/">NEW CREATION</a><a class="lhl-header-workshop" href="/workshop">Workshop</a><a href="/about/">About</a><a class="lhl-header-cta" href="#book-a-call">Book a Call</a></nav>' +
        '</div>';
    }

    var footer = document.querySelector("footer");
    if (footer && !footer.classList.contains("lhl-site-footer")) {
      footer.className = "lhl-site-footer";
      footer.innerHTML =
        '<div class="lhl-footer-main">' +
        '<nav class="lhl-footer-nav" aria-label="Explore Long Holistic Life"><a href="/">Home</a><a href="/coaching/">Coaching</a><a href="/new-creation/">NEW CREATION</a><a href="/workshop">Workshop</a><a href="/about/">About</a><a href="/learn/">Resources</a></nav>' +
        '<div class="lhl-footer-brand-block"><a class="lhl-footer-logo" href="/" aria-label="Long Holistic Life home"><img src="/lhl-logo.webp" alt="" width="68" height="68"></a><a class="lhl-footer-brand-copy" href="/"><strong>Long Holistic Life</strong><span>Whole-person wellness for the body, mind, relationships, and spirit.</span></a></div>' +
        '<div class="lhl-footer-contact"><a class="lhl-footer-email" href="mailto:brittany@longholisticlife.com">brittany@longholisticlife.com</a><a class="lhl-footer-book" href="' +
        BOOKING_URL +
        '" target="_blank" rel="noopener noreferrer">Book a Call</a></div></div>' +
        '<div class="lhl-footer-credit"><a href="https://faithcraft.agency/" target="_blank" rel="noopener noreferrer">Powered by FaithCraft.Agency</a><span>© 2026 Long Holistic Life</span></div>';
    }

    var sections = Array.prototype.slice.call(
      document.querySelectorAll("section.consultation-section")
    );

    if (sections.length) {
      var section = sections[sections.length - 1];

      sections.slice(0, -1).forEach(function (duplicate) {
        duplicate.remove();
      });

      var actions = section.querySelector(".consultation-actions");
      if (actions) {
        actions.innerHTML =
          '<a id="book-a-call" class="contact-button lhl-welcome-book-call" href="' +
          BOOKING_URL +
          '" target="_blank" rel="noopener noreferrer"><b>Book a Call</b><small>Choose a time that works for you</small></a>' +
          '<p class="contact-microcopy">No pressure • No judgment • No obligation to purchase</p>';
      }

      if (footer && section.nextElementSibling !== footer) {
        footer.parentNode.insertBefore(section, footer);
      }
    }

    var headerCta =
      document.querySelector(".lhl-header-cta") ||
      document.querySelector(".welcome-header-link");
    if (headerCta) {
      headerCta.textContent = "Book a Call";
      headerCta.setAttribute("href", "#book-a-call");
    }

    var finalCall = document.querySelector(".welcome-final-cta a.welcome-primary-cta");
    if (finalCall) {
      finalCall.setAttribute("href", BOOKING_URL);
      finalCall.setAttribute("target", "_blank");
      finalCall.setAttribute("rel", "noopener noreferrer");
      finalCall.innerHTML = 'Book a Call <span aria-hidden="true">→</span>';
    }

    var mobileCall = document.querySelector("a.welcome-mobile-cta");
    if (mobileCall) {
      mobileCall.setAttribute("href", BOOKING_URL);
      mobileCall.setAttribute("target", "_blank");
      mobileCall.setAttribute("rel", "noopener noreferrer");
      mobileCall.innerHTML = 'Book a Call <span aria-hidden="true">→</span>';
    }
  }

  function scrollToBooking() {
    var section = document.querySelector("section.consultation-section");
    if (!section) return;

    var header = document.querySelector(".lhl-site-header");
    var offset = header ? header.getBoundingClientRect().height + 18 : 18;
    var top = section.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }

  function scheduleWelcomeBookingLayout() {
    window.setTimeout(function () {
      applyWelcomeBookingLayout();
      if (window.location.hash === "#book-a-call" || window.location.hash === "#consultation") {
        if (history && history.replaceState) history.replaceState(null, "", "/welcome");
        scrollToBooking();
      }
    }, 650);
    window.setTimeout(applyWelcomeBookingLayout, 1400);
  }

  if (document.readyState === "complete") {
    scheduleWelcomeBookingLayout();
  } else {
    window.addEventListener("load", scheduleWelcomeBookingLayout, { once: true });
  }

  function prepareLinks() {
    var guideLink = document.querySelector('a[href="#choose-your-guide"]');
    if (guideLink) guideLink.setAttribute("href", "/welcome/#choose-your-guide");

    var consultationLinks = document.querySelectorAll('a[href="#consultation"]');
    consultationLinks.forEach(function (link) {
      link.setAttribute("href", "/welcome/#consultation");
    });

    var finalRhythmLink = document.querySelector(".welcome-final-cta .welcome-primary-cta");
    if (finalRhythmLink) {
      finalRhythmLink.setAttribute("href", BOOKING_URL);
      finalRhythmLink.setAttribute("target", "_blank");
      finalRhythmLink.setAttribute("rel", "noopener noreferrer");
    }
  }

  document.addEventListener("DOMContentLoaded", prepareLinks, { once: true });

  document.addEventListener(
    "click",
    function (event) {
      var source = event.target;
      var link = source && source.closest ? source.closest("a") : null;
      if (!link) return;

      var href = link.getAttribute("href") || "";
      var isGuideJump =
        href === "#choose-your-guide" ||
        href === "/welcome/#choose-your-guide";

      var isBookingJump =
        href === "#book-a-call" ||
        href === "/welcome/#book-a-call" ||
        href === "/welcome#book-a-call" ||
        href === "#consultation" ||
        href === "/welcome/#consultation" ||
        href === "/welcome#consultation";

      if (!isGuideJump && !isBookingJump) return;

      event.preventDefault();
      event.stopPropagation();
      if (typeof event.stopImmediatePropagation === "function") {
        event.stopImmediatePropagation();
      }

      if (isGuideJump) {
        goToSection("#choose-your-guide");
      } else {
        if (history && history.replaceState) history.replaceState(null, "", "/welcome");
        scrollToBooking();
      }
    },
    true
  );

  Element.prototype.scrollIntoView = function (options) {
    var isLessonJumpButton =
      this.matches && this.matches(".mobile-lesson-jump button");

    if (isLessonJumpButton) {
      var scroller = this.parentElement;
      if (scroller) {
        var centeredLeft = this.offsetLeft - (scroller.clientWidth - this.offsetWidth) / 2;
        var left = Math.max(0, centeredLeft);
        var behavior =
          options && typeof options === "object" && options.behavior
            ? options.behavior
            : "auto";

        if (typeof scroller.scrollTo === "function") {
          scroller.scrollTo({ left: left, behavior: behavior });
        } else {
          scroller.scrollLeft = left;
        }
      }
      return;
    }

    return nativeScrollIntoView.apply(this, arguments);
  };
})();
