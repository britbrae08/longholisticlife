(function () {
  "use strict";

  var FORM_ID = "omnisend-embedded-v2-69a8e7831746b2279aac2776";
  var FORM_SELECTOR = "#" + FORM_ID;
  var TYPING_CLASS = "lhl-form-typing";
  var RESTORE_WINDOW_MS = 1800;

  var state = {
    root: null,
    observer: null,
    lastField: null,
    lastPointerInside: false,
    restoreUntil: 0,
    restoreTimer: null,
    formTapTimer: null
  };

  function now() {
    return Date.now();
  }

  function getRoot() {
    var root = document.getElementById(FORM_ID);
    if (root !== state.root) {
      if (state.observer) state.observer.disconnect();
      state.root = root;
      state.observer = null;
      if (root && window.MutationObserver) {
        state.observer = new MutationObserver(function () {
          if (state.lastField && now() <= state.restoreUntil) {
            scheduleRestore(40);
          }
        });
        state.observer.observe(root, { childList: true, subtree: true });
      }
    }
    return root;
  }

  function isEditable(element) {
    if (!element || element.nodeType !== 1) return false;
    if (element.matches && element.matches("input, textarea, select")) {
      return !element.disabled && element.getAttribute("aria-hidden") !== "true";
    }
    return Boolean(element.isContentEditable);
  }

  function isInsideForm(element) {
    var root = getRoot();
    return Boolean(root && element && root.contains(element));
  }

  function listFields(root) {
    return root
      ? Array.prototype.slice.call(root.querySelectorAll("input, textarea, select, [contenteditable='true']"))
      : [];
  }

  function snapshotField(field) {
    var root = getRoot();
    if (!root || !field) return null;
    var fields = listFields(root);
    var selectionStart = null;
    var selectionEnd = null;
    try {
      selectionStart = typeof field.selectionStart === "number" ? field.selectionStart : null;
      selectionEnd = typeof field.selectionEnd === "number" ? field.selectionEnd : null;
    } catch (_) {}

    return {
      index: Math.max(0, fields.indexOf(field)),
      tag: (field.tagName || "").toLowerCase(),
      type: (field.getAttribute && field.getAttribute("type")) || "",
      name: (field.getAttribute && field.getAttribute("name")) || "",
      id: field.id || "",
      placeholder: (field.getAttribute && field.getAttribute("placeholder")) || "",
      autocomplete: (field.getAttribute && field.getAttribute("autocomplete")) || "",
      ariaLabel: (field.getAttribute && field.getAttribute("aria-label")) || "",
      value: "value" in field ? field.value : "",
      selectionStart: selectionStart,
      selectionEnd: selectionEnd
    };
  }

  function scoreCandidate(field, saved, index) {
    var score = 0;
    var tag = (field.tagName || "").toLowerCase();
    var type = field.getAttribute("type") || "";
    var name = field.getAttribute("name") || "";
    var placeholder = field.getAttribute("placeholder") || "";
    var autocomplete = field.getAttribute("autocomplete") || "";
    var ariaLabel = field.getAttribute("aria-label") || "";

    if (tag === saved.tag) score += 4;
    if (saved.type && type === saved.type) score += 6;
    if (saved.name && name === saved.name) score += 10;
    if (saved.id && field.id === saved.id) score += 12;
    if (saved.placeholder && placeholder === saved.placeholder) score += 5;
    if (saved.autocomplete && autocomplete === saved.autocomplete) score += 5;
    if (saved.ariaLabel && ariaLabel === saved.ariaLabel) score += 5;
    if (index === saved.index) score += 3;
    return score;
  }

  function findReplacement(saved) {
    var root = getRoot();
    if (!root || !saved) return null;
    var fields = listFields(root).filter(isEditable);
    if (!fields.length) return null;

    var best = null;
    var bestScore = -1;
    fields.forEach(function (field, index) {
      var score = scoreCandidate(field, saved, index);
      if (score > bestScore) {
        best = field;
        bestScore = score;
      }
    });

    return best || fields[Math.min(saved.index, fields.length - 1)] || null;
  }

  function addTypingMode() {
    if (document.body) document.body.classList.add(TYPING_CLASS);
    document.documentElement.classList.add(TYPING_CLASS);
  }

  function removeTypingMode() {
    if (document.body) document.body.classList.remove(TYPING_CLASS);
    document.documentElement.classList.remove(TYPING_CLASS);
  }

  function remember(field) {
    state.lastField = snapshotField(field);
    state.restoreUntil = now() + RESTORE_WINDOW_MS;
    state.lastPointerInside = true;
    addTypingMode();
  }

  function cancelRestore() {
    state.restoreUntil = 0;
    state.lastPointerInside = false;
    if (state.restoreTimer) {
      clearTimeout(state.restoreTimer);
      state.restoreTimer = null;
    }
  }

  function restoreFocus() {
    state.restoreTimer = null;
    if (!state.lastField || !state.lastPointerInside || now() > state.restoreUntil) return;
    if (document.visibilityState === "hidden") return;

    var root = getRoot();
    if (!root) return;

    var active = document.activeElement;
    if (isEditable(active) && root.contains(active)) {
      state.lastField = snapshotField(active);
      return;
    }

    if (active && active !== document.body && active !== document.documentElement && !root.contains(active)) {
      return;
    }

    var replacement = findReplacement(state.lastField);
    if (!replacement) return;

    try {
      replacement.focus({ preventScroll: true });
    } catch (_) {
      try { replacement.focus(); } catch (__) { return; }
    }

    try {
      if (
        state.lastField.selectionStart !== null &&
        typeof replacement.setSelectionRange === "function"
      ) {
        replacement.setSelectionRange(state.lastField.selectionStart, state.lastField.selectionEnd);
      }
    } catch (_) {}

    state.restoreUntil = now() + 650;
    addTypingMode();
  }

  function scheduleRestore(delay) {
    if (state.restoreTimer) clearTimeout(state.restoreTimer);
    state.restoreTimer = setTimeout(restoreFocus, typeof delay === "number" ? delay : 70);
  }

  function installStyles() {
    if (document.getElementById("lhl-mobile-form-fix-styles")) return;
    var style = document.createElement("style");
    style.id = "lhl-mobile-form-fix-styles";
    style.textContent =
      "@media (max-width: 720px){" +
      "html." + TYPING_CLASS + "{scroll-behavior:auto!important;}" +
      "body." + TYPING_CLASS + " .mobile-cta{display:none!important;pointer-events:none!important;}" +
      FORM_SELECTOR + " input," + FORM_SELECTOR + " textarea," + FORM_SELECTOR + " select{font-size:16px!important;}" +
      "}";
    (document.head || document.documentElement).appendChild(style);
  }

  function installScriptDedupe() {
    if (!window.MutationObserver) return;
    var seen = Object.create(null);

    function inspectScript(script) {
      if (!script || script.tagName !== "SCRIPT") return;
      var src = script.src || "";
      if (!src || src.toLowerCase().indexOf("omnisend") === -1) return;
      if (seen[src]) {
        if (script.parentNode) script.parentNode.removeChild(script);
        return;
      }
      seen[src] = true;
    }

    Array.prototype.forEach.call(document.querySelectorAll("script[src]"), inspectScript);

    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        Array.prototype.forEach.call(mutation.addedNodes || [], function (node) {
          if (!node || node.nodeType !== 1) return;
          if (node.tagName === "SCRIPT") inspectScript(node);
          if (node.querySelectorAll) {
            Array.prototype.forEach.call(node.querySelectorAll("script[src]"), inspectScript);
          }
        });
      });
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  document.addEventListener(
    "pointerdown",
    function (event) {
      var root = getRoot();
      if (!root) return;

      if (root.contains(event.target)) {
        state.lastPointerInside = true;
        state.restoreUntil = now() + RESTORE_WINDOW_MS;
        addTypingMode();

        if (state.formTapTimer) clearTimeout(state.formTapTimer);
        state.formTapTimer = setTimeout(function () {
          var active = document.activeElement;
          if (isEditable(active) && root.contains(active)) remember(active);
        }, 80);
        return;
      }

      cancelRestore();
      removeTypingMode();
    },
    true
  );

  document.addEventListener(
    "focusin",
    function (event) {
      if (isEditable(event.target) && isInsideForm(event.target)) {
        remember(event.target);
      }
    },
    true
  );

  document.addEventListener(
    "input",
    function (event) {
      if (isEditable(event.target) && isInsideForm(event.target)) {
        state.lastField = snapshotField(event.target);
        state.restoreUntil = now() + RESTORE_WINDOW_MS;
      }
    },
    true
  );

  document.addEventListener(
    "focusout",
    function (event) {
      if (!isInsideForm(event.target)) return;
      if (now() <= state.restoreUntil) scheduleRestore(90);
      setTimeout(function () {
        var active = document.activeElement;
        if (!isInsideForm(active) && now() > state.restoreUntil) removeTypingMode();
      }, RESTORE_WINDOW_MS + 100);
    },
    true
  );

  document.addEventListener(
    "submit",
    function (event) {
      if (isInsideForm(event.target)) {
        cancelRestore();
        removeTypingMode();
      }
    },
    true
  );

  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") {
      cancelRestore();
      removeTypingMode();
    }
  });

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", function () {
      if (state.lastField && state.lastPointerInside && now() <= state.restoreUntil) {
        scheduleRestore(60);
      }
    });
  }

  function start() {
    installStyles();
    getRoot();
  }

  installScriptDedupe();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
