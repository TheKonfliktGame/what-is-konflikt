(function () {
  var TARGET = new Date('2026-10-15T20:15:00+02:00').getTime();
  var $ = function (id) { return document.getElementById(id); };
  var pad = function (n) { return String(n).padStart(2, '0'); };

  $('year').textContent = new Date().getFullYear();

  // Visitor's local time for the playtest
  try {
    var local = new Intl.DateTimeFormat(undefined, {
      weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', timeZoneName: 'short'
    }).format(new Date(TARGET));
    var el = $('local-time');
    el.textContent = 'In your time zone: ' + local;
    el.hidden = false;
  } catch (e) {}

  var panel = document.querySelector('.panel');
  var heroLive = $('hero-live');

  function tick() {
    var rem = TARGET - Date.now();

    if (rem <= 0) {
      ['days', 'hours', 'minutes', 'seconds'].forEach(function (id) { $(id).textContent = '00'; });
      $('countdown-status').textContent = 'The playtest has started';
      $('hero-live-text').textContent = 'The closed EU playtest is live now';
      panel.classList.add('is-live');
      heroLive.classList.add('is-live');
      return;
    }

    var d = Math.floor(rem / 86400000);
    var h = Math.floor(rem / 3600000) % 24;
    var m = Math.floor(rem / 60000) % 60;
    var s = Math.floor(rem / 1000) % 60;

    $('days').textContent = pad(d);
    $('hours').textContent = pad(h);
    $('minutes').textContent = pad(m);
    $('seconds').textContent = pad(s);
    $('countdown-status').textContent = 'Time to playtest start';

    var short = (d > 0 ? d + 'd ' : '') + pad(h) + 'h ' + pad(m) + 'm ' + pad(s) + 's';
    $('hero-live-text').innerHTML = 'Closed EU playtest starts in <b>' + short + '</b>';

    setTimeout(tick, 1000 - (Date.now() % 1000));
  }
  tick();

  // Reveal on scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }
})();
