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
   * Chrome has been intermittently trapping scrolling after an in-page
   * #choose-your-guide jump on this generated page. Direct visits with the
   * hash work normally, so make this CTA a real page navigation instead of
   * a same-document smooth scroll. The trailing-slash URL is intentionally
   * different from /welcome, which forces a fresh document navigation and
   * lets the browser land on the anchor normally.
   */
  document.addEventListener(
    "click",
    function (event) {
      var source = event.target;
      var link = source && source.closest
        ? source.closest('a[href="#choose-your-guide"]')
        : null;

      if (!link) return;

      event.preventDefault();
      event.stopPropagation();
      if (typeof event.stopImmediatePropagation === "function") {
        event.stopImmediatePropagation();
      }

      window.location.assign("/welcome/#choose-your-guide");
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
