(function () {
  "use strict";

  var mobileQuery = window.matchMedia("(max-width: 680px)");
  var guideVisible = false;
  var controls;
  var guideObserver;
  var panelObserver;

  function sourceNav() {
    return document.querySelector("#guided-track-panel .guided-lesson-nav");
  }

  function syncControls() {
    if (!controls) return;
    var nav = sourceNav();
    var actions = nav
      ? Array.prototype.slice.call(nav.querySelectorAll("button, a"))
      : [];
    var previous = controls.querySelector(".mobile-previous");
    var next = controls.querySelector(".mobile-next");
    var shouldShow = Boolean(mobileQuery.matches && guideVisible && actions.length > 1);

    controls.classList.toggle("is-visible", shouldShow);
    document.body.classList.toggle("mobile-in-guide", shouldShow);

    if (!actions.length) return;
    previous.disabled = Boolean(actions[0].disabled);
    previous.setAttribute("aria-disabled", String(Boolean(actions[0].disabled)));
    next.textContent = actions[1].textContent.trim();
  }

  function createControls() {
    if (controls) return;

    controls = document.createElement("div");
    controls.className = "mobile-lesson-controls";
    controls.setAttribute("aria-label", "Lesson navigation");
    controls.innerHTML =
      '<button class="mobile-previous" type="button">Previous</button>' +
      '<button class="mobile-next" type="button">Next letter</button>';

    controls.querySelector(".mobile-previous").addEventListener("click", function () {
      var nav = sourceNav();
      var action = nav && nav.querySelectorAll("button, a")[0];
      if (action && !action.disabled) action.click();
    });

    controls.querySelector(".mobile-next").addEventListener("click", function () {
      var nav = sourceNav();
      var action = nav && nav.querySelectorAll("button, a")[1];
      if (action) action.click();
    });

    document.body.appendChild(controls);
  }

  function createQuickStart() {
    if (document.querySelector(".mobile-quick-start")) return;
    var header = document.querySelector(".welcome-header");
    if (!header) return;

    var quickStart = document.createElement("nav");
    quickStart.className = "mobile-quick-start";
    quickStart.setAttribute("aria-label", "Start a NEW CREATION guide");
    quickStart.innerHTML =
      '<p>Choose your guided experience</p>' +
      '<a class="mobile-women-start" href="/welcome?guide=women#guided-experience">' +
      '<span>Start the women’s experience</span><span aria-hidden="true">→</span></a>' +
      '<a class="mobile-men-start" href="/welcome?guide=men#guided-experience">' +
      '<span>Start the men’s experience</span><span aria-hidden="true">→</span></a>';
    header.insertAdjacentElement("afterend", quickStart);
  }

  function centerJumpButtonHorizontally(button, behavior) {
    var scroller = button && button.parentElement;
    if (!scroller) return;

    var centeredLeft = button.offsetLeft - (scroller.clientWidth - button.offsetWidth) / 2;
    var left = Math.max(0, centeredLeft);

    if (typeof scroller.scrollTo === "function") {
      scroller.scrollTo({ left: left, behavior: behavior || "smooth" });
    } else {
      scroller.scrollLeft = left;
    }
  }

  function syncTrack(grid, jump) {
    var source = Array.prototype.slice.call(grid.querySelectorAll("button"));
    var buttons = Array.prototype.slice.call(jump.querySelectorAll("button"));
    buttons.forEach(function (button, index) {
      var selected = source[index] && source[index].classList.contains("is-active");
      var completed = source[index] && source[index].classList.contains("is-complete");
      button.classList.toggle("is-active", Boolean(selected));
      button.classList.toggle("is-complete", Boolean(completed));
      if (selected) {
        button.setAttribute("aria-current", "step");
        centerJumpButtonHorizontally(button, "smooth");
      } else {
        button.removeAttribute("aria-current");
      }
    });
    syncControls();
  }

  function enhanceTrack() {
    var panel = document.getElementById("guided-track-panel");
    if (!panel) return;
    var grid = panel.querySelector(".guided-letter-grid");
    var lesson = panel.querySelector(".guided-lesson-window");
    if (!grid || !lesson) return;

    if (panel.dataset.mobileEnhanced === "true") {
      var existingJump = panel.querySelector(".mobile-lesson-jump");
      if (existingJump) syncTrack(grid, existingJump);
      return;
    }

    panel.dataset.mobileEnhanced = "true";
    var source = Array.prototype.slice.call(grid.querySelectorAll("button"));
    var reveal = document.createElement("button");
    reveal.type = "button";
    reveal.className = "mobile-show-all";
    reveal.setAttribute("aria-expanded", "false");
    reveal.textContent = "View all 11 NEW CREATION lessons";

    reveal.addEventListener("click", function () {
      var expanded = grid.classList.toggle("is-expanded");
      reveal.setAttribute("aria-expanded", String(expanded));
      reveal.textContent = expanded
        ? "Show the first 6 lessons"
        : "View all 11 NEW CREATION lessons";
    });

    var jump = document.createElement("nav");
    jump.className = "mobile-lesson-jump";
    jump.setAttribute("aria-label", "Jump to a NEW CREATION lesson");

    source.forEach(function (button, index) {
      var letter = button.querySelector(".guided-letter");
      var name = button.querySelector(".guided-letter-name");
      var jumpButton = document.createElement("button");
      jumpButton.type = "button";
      jumpButton.textContent = letter ? letter.textContent.trim() : String(index + 1);
      jumpButton.setAttribute(
        "aria-label",
        name ? "Open " + name.textContent.trim() : "Open lesson " + String(index + 1)
      );
      jumpButton.addEventListener("click", function () {
        button.click();
      });
      jump.appendChild(jumpButton);
    });

    grid.insertAdjacentElement("afterend", reveal);
    reveal.insertAdjacentElement("afterend", jump);

    var observer = new MutationObserver(function () {
      syncTrack(grid, jump);
    });
    observer.observe(grid, {
      attributes: true,
      attributeFilter: ["class", "aria-current"],
      childList: true,
      subtree: true
    });

    syncTrack(grid, jump);
  }

  function observeGuidedSection() {
    if (guideObserver) return;
    var section = document.querySelector(".guided-experience");
    if (!section || !("IntersectionObserver" in window)) return;

    document.body.classList.add("mobile-enhanced");
    guideObserver = new IntersectionObserver(
      function (entries) {
        guideVisible = Boolean(entries[0] && entries[0].isIntersecting);
        syncControls();
      },
      { threshold: 0.12 }
    );
    guideObserver.observe(section);
  }

  function observeTrackUpdates() {
    if (panelObserver) return;
    var panel = document.getElementById("guided-track-panel");
    if (!panel) return;

    panelObserver = new MutationObserver(function () {
      window.requestAnimationFrame(function () {
        enhanceTrack();
        syncControls();
      });
    });
    panelObserver.observe(panel, { childList: true, subtree: true });
  }

  function start() {
    createQuickStart();
    createControls();
    observeGuidedSection();
    observeTrackUpdates();
    enhanceTrack();
    syncControls();
  }

  function scheduleStart() {
    window.setTimeout(start, 850);
    window.setTimeout(start, 1800);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleStart, { once: true });
  } else {
    scheduleStart();
  }

  if (mobileQuery.addEventListener) {
    mobileQuery.addEventListener("change", syncControls);
  }
})();
