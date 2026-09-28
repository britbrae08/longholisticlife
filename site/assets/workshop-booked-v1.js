(function () {
  "use strict";

  // Sunday, November 15, 2026 at 7:00 PM Central Standard Time (UTC-06:00).
  var eventTime = new Date("2026-11-15T19:00:00-06:00").getTime();
  var countdown = document.querySelector("[data-booked-countdown]");
  if (!countdown) return;

  var daysEl = countdown.querySelector("[data-booked-days]");
  var hoursEl = countdown.querySelector("[data-booked-hours]");
  var minutesEl = countdown.querySelector("[data-booked-minutes]");
  var secondsEl = countdown.querySelector("[data-booked-seconds]");
  var messageEl = countdown.querySelector("[data-booked-message]");

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function updateCountdown() {
    var distance = eventTime - Date.now();

    if (distance <= 0) {
      countdown.classList.add("is-live");
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      messageEl.textContent = "Your live NEW CREATION workshop time has arrived.";
      return false;
    }

    var day = 24 * 60 * 60 * 1000;
    var hour = 60 * 60 * 1000;
    var minute = 60 * 1000;

    daysEl.textContent = String(Math.floor(distance / day));
    hoursEl.textContent = pad(Math.floor((distance % day) / hour));
    minutesEl.textContent = pad(Math.floor((distance % hour) / minute));
    secondsEl.textContent = pad(Math.floor((distance % minute) / 1000));
    return true;
  }

  if (updateCountdown()) {
    var interval = window.setInterval(function () {
      if (!updateCountdown()) window.clearInterval(interval);
    }, 1000);
  }
})();