(function () {
  "use strict";

  var params = new URLSearchParams(window.location.search);
  var normalWelcomeEntry = !window.location.hash && !params.has("guide");

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

  var nativeScrollIntoView = Element.prototype.scrollIntoView;

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
