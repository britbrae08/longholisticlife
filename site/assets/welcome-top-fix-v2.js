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
   * Keep the #choose-your-guide URL, but bypass the app router for this
   * same-page jump. The router's hash navigation can leave Chrome treating
   * the guide section as the active scroll target. We update the URL with
   * history.pushState (which does not scroll), then perform exactly one
   * native scroll to the section. After that, normal page scrolling remains
   * completely under the visitor's control.
   */
  document.addEventListener(
    "click",
    function (event) {
      var source = event.target;
      var link = source && source.closest
        ? source.closest('a[href="#choose-your-guide"]')
        : null;

      if (!link) return;

      var target = document.getElementById("choose-your-guide");
      if (!target) return;

      event.preventDefault();
      event.stopPropagation();
      if (typeof event.stopImmediatePropagation === "function") {
        event.stopImmediatePropagation();
      }

      if (window.history && typeof window.history.pushState === "function") {
        window.history.pushState(window.history.state, "", "#choose-your-guide");
      } else {
        window.location.hash = "choose-your-guide";
      }

      nativeScrollIntoView.call(target, {
        behavior: "smooth",
        block: "start"
      });
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
