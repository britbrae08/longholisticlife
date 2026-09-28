(function () {
  "use strict";

  function getFormTarget() {
    return document.getElementById("workshop-signup");
  }

  function scrollToWorkshopForm(event) {
    var target = getFormTarget();
    if (!target) return;

    if (event) event.preventDefault();

    var header = document.querySelector(".seo-header");
    var headerHeight = header ? header.getBoundingClientRect().height : 0;
    var top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 18;

    /*
     * Deliberately use window.scrollTo instead of changing location.hash.
     * This avoids the fragment-navigation behavior that previously caused
     * sticky scrolling on the welcome page in Chrome.
     */
    window.scrollTo({
      top: Math.max(0, top),
      left: 0,
      behavior: "smooth"
    });

    window.setTimeout(function () {
      var firstField = target.querySelector("input, select, textarea, button");
      if (firstField && typeof firstField.focus === "function") {
        try {
          firstField.focus({ preventScroll: true });
        } catch (e) {
          firstField.focus();
        }
      }
    }, 650);
  }

  document.addEventListener("click", function (event) {
    var source = event.target;
    var cta = source && source.closest
      ? source.closest("[data-workshop-cta]")
      : null;

    if (!cta) return;
    scrollToWorkshopForm(event);
  });
})();
