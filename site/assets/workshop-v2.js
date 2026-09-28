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


(function () {
  "use strict";

  // November 15, 2026 at 7:00 PM Central Time.
  // By this date Central Time is CST (UTC-06:00).
  var eventTime = new Date("2026-11-15T19:00:00-06:00").getTime();
  var countdown = document.querySelector("[data-workshop-countdown]");
  if (!countdown) return;

  var daysEl = countdown.querySelector("[data-countdown-days]");
  var hoursEl = countdown.querySelector("[data-countdown-hours]");
  var minutesEl = countdown.querySelector("[data-countdown-minutes]");
  var secondsEl = countdown.querySelector("[data-countdown-seconds]");
  var messageEl = countdown.querySelector("[data-countdown-message]");

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function updateCountdown() {
    var now = Date.now();
    var distance = eventTime - now;

    if (distance <= 0) {
      countdown.classList.add("is-live");
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      messageEl.textContent = "The live workshop time has arrived.";
      return false;
    }

    var day = 24 * 60 * 60 * 1000;
    var hour = 60 * 60 * 1000;
    var minute = 60 * 1000;

    var days = Math.floor(distance / day);
    var hours = Math.floor((distance % day) / hour);
    var minutes = Math.floor((distance % hour) / minute);
    var seconds = Math.floor((distance % minute) / 1000);

    daysEl.textContent = String(days);
    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
    return true;
  }

  if (updateCountdown()) {
    var interval = window.setInterval(function () {
      if (!updateCountdown()) window.clearInterval(interval);
    }, 1000);
  }
})();
