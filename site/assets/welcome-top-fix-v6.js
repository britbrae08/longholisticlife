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
    var footer = document.querySelector("footer");
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

  function scheduleWelcomeBookingLayout() {
    window.setTimeout(applyWelcomeBookingLayout, 650);
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
      finalRhythmLink.setAttribute("href", "/welcome/#consultation");
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

      var isConsultationJump =
        href === "#consultation" ||
        href === "/welcome/#consultation" ||
        link.matches(".welcome-final-cta .welcome-primary-cta");

      if (!isGuideJump && !isConsultationJump) return;

      event.preventDefault();
      event.stopPropagation();
      if (typeof event.stopImmediatePropagation === "function") {
        event.stopImmediatePropagation();
      }

      if (isGuideJump) {
        goToSection("#choose-your-guide");
      } else {
        goToSection("#consultation");
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
