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
