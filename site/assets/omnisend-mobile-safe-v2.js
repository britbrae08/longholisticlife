(function () {
  "use strict";

  var FORM_ID = "omnisend-embedded-v2-69a8e7831746b2279aac2776";
  var FORM_SELECTOR = "#" + FORM_ID;
  var TYPING_CLASS = "lhl-form-typing";

  function formRoot() {
    return document.getElementById(FORM_ID);
  }

  function isInsideForm(element) {
    var root = formRoot();
    return Boolean(root && element && root.contains(element));
  }

  function isField(element) {
    return Boolean(
      element &&
      element.nodeType === 1 &&
      ((element.matches && element.matches("input, textarea, select")) || element.isContentEditable)
    );
  }

  function setTyping(active) {
    var method = active ? "add" : "remove";
    document.documentElement.classList[method](TYPING_CLASS);
    if (document.body) document.body.classList[method](TYPING_CLASS);
  }

  function installStyles() {
    if (document.getElementById("lhl-omnisend-mobile-safe-v2")) return;

    var style = document.createElement("style");
    style.id = "lhl-omnisend-mobile-safe-v2";
    style.textContent =
      "@media (max-width:720px){" +
      "body." + TYPING_CLASS + " .mobile-cta{display:none!important;pointer-events:none!important;}" +
      FORM_SELECTOR + " input," +
      FORM_SELECTOR + " textarea," +
      FORM_SELECTOR + " select{font-size:16px!important;}" +
      "}";

    (document.head || document.documentElement).appendChild(style);
  }

  document.addEventListener("focusin", function (event) {
    if (isField(event.target) && isInsideForm(event.target)) {
      setTyping(true);
    }
  }, true);

  document.addEventListener("focusout", function () {
    window.setTimeout(function () {
      if (!isInsideForm(document.activeElement)) setTyping(false);
    }, 200);
  }, true);

  document.addEventListener("submit", function (event) {
    if (isInsideForm(event.target)) setTyping(false);
  }, true);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", installStyles, { once: true });
  } else {
    installStyles();
  }
})();
