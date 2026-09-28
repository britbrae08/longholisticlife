(function () {
  "use strict";

  function target() {
    return document.getElementById("workshop-signup");
  }

  function scrollToForm(event) {
    var form = target();
    if (!form) return;

    if (event) event.preventDefault();

    var header = document.querySelector(".lhl-site-header");
    var headerHeight = header ? header.getBoundingClientRect().height : 0;
    var top = form.getBoundingClientRect().top + window.pageYOffset - headerHeight - 24;

    /*
     * Use window.scrollTo rather than fragment navigation. This preserves the
     * Chrome fix used elsewhere on the site and avoids the sticky-scroll
     * behavior previously triggered by hash jumps.
     */
    window.scrollTo({
      top: Math.max(0, top),
      left: 0,
      behavior: "smooth"
    });

    window.setTimeout(function () {
      var firstField = form.querySelector("input, select, textarea, button");
      if (!firstField || typeof firstField.focus !== "function") return;
      try {
        firstField.focus({ preventScroll: true });
      } catch (error) {
        firstField.focus();
      }
    }, 650);
  }

  document.addEventListener("click", function (event) {
    var source = event.target;
    var cta = source && source.closest ? source.closest("[data-workshop-cta]") : null;
    if (!cta) return;
    scrollToForm(event);
  });
})();
