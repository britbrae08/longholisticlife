(function () {
  "use strict";

  var FORM_ID = "omnisend-embedded-v2-69a8e7831746b2279aac2776";
  var FORM_SELECTOR = "#" + FORM_ID;
  var TYPING_CLASS = "lhl-form-typing";

  function isInsideForm(element) {
    var root = document.getElementById(FORM_ID);
    return Boolean(root && element && root.contains(element));
  }

  function isEditable(element) {
    if (!element || element.nodeType !== 1) return false;
    return Boolean(
      (element.matches && element.matches("input, textarea, select")) ||
      element.isContentEditable
    );
  }

  function addTypingMode() {
    document.documentElement.classList.add(TYPING_CLASS);
    if (document.body) document.body.classList.add(TYPING_CLASS);
  }

  function removeTypingMode() {
    document.documentElement.classList.remove(TYPING_CLASS);
    if (document.body) document.body.classList.remove(TYPING_CLASS);
  }

  function installStyles() {
    if (document.getElementById("lhl-mobile-form-fix-styles")) return;

    var style = document.createElement("style");
    style.id = "lhl-mobile-form-fix-styles";
    style.textContent =
      "@media (max-width:720px){" +
      "html." + TYPING_CLASS + "{scroll-behavior:auto!important;}" +
      "body." + TYPING_CLASS + " .mobile-cta{display:none!important;pointer-events:none!important;}" +
      FORM_SELECTOR + " input," +
      FORM_SELECTOR + " textarea," +
      FORM_SELECTOR + " select{font-size:16px!important;touch-action:manipulation!important;}" +
      "}";

    (document.head || document.documentElement).appendChild(style);
  }

  document.addEventListener(
    "focusin",
    function (event) {
      if (isEditable(event.target) && isInsideForm(event.target)) {
        addTypingMode();
      }
    },
    true
  );

  document.addEventListener(
    "focusout",
    function () {
      setTimeout(function () {
        if (!isInsideForm(document.activeElement)) {
          removeTypingMode();
        }
      }, 150);
    },
    true
  );

  document.addEventListener(
    "submit",
    function (event) {
      if (isInsideForm(event.target)) removeTypingMode();
    },
    true
  );

  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") removeTypingMode();
  });

  function start() {
    installStyles();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
