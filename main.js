/* =========================================================
   Rirakkussu Japan — Interactions
   ========================================================= */
(function () {
  "use strict";

  /* ---- Lazy background images (with graceful fallback) ---- */
  function loadImg(el) {
    var src = el.getAttribute("data-img");
    if (!src) return;
    var probe = new Image();
    probe.onload = function () {
      el.style.backgroundImage =
        'linear-gradient(135deg, rgba(184,149,69,.10), rgba(35,35,32,.10)), url("' + src + '")';
    };
    // If the photo fails to load, the CSS gradient placeholder stays in place.
    probe.src = src;
  }

  // Hero uses its own element
  var hero = document.querySelector(".hero-bg");
  if (hero) {
    var hsrc = hero.getAttribute("data-img");
    if (hsrc) {
      var hp = new Image();
      hp.onload = function () { hero.style.backgroundImage = 'url("' + hsrc + '")'; };
      hp.src = hsrc;
    }
  }

  var fills = document.querySelectorAll(".img-fill[data-img]");
  if ("IntersectionObserver" in window) {
    var imgObs = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { loadImg(e.target); obs.unobserve(e.target); }
      });
    }, { rootMargin: "200px" });
    fills.forEach(function (el) { imgObs.observe(el); });
  } else {
    fills.forEach(loadImg);
  }

  /* ---- Header scroll state ---- */
  var header = document.getElementById("siteHeader");
  function onScroll() {
    if (window.scrollY > 40) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav ---- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");
  function closeNav() {
    nav.classList.remove("open");
    document.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
  }
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    document.body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeNav);
  });

  /* ---- Reveal on scroll ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revObs = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { revObs.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Gallery carousel ---- */
  var track = document.getElementById("galleryTrack");
  var prev = document.getElementById("galPrev");
  var next = document.getElementById("galNext");
  if (track && prev && next) {
    function step() {
      var first = track.querySelector(".gallery-item");
      var w = first ? first.getBoundingClientRect().width + 18 : 320;
      return w * Math.max(1, Math.floor(track.clientWidth / w));
    }
    prev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: "smooth" }); });
    next.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: "smooth" }); });
  }

  /* ---- Contact form (client-side validation + simulated submit) ---- */
  var form = document.getElementById("contactForm");
  var note = document.getElementById("formNote");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var service = form.service.value;
      var message = form.message.value.trim();
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!name || !emailOk || !service || !message) {
        note.textContent = "Please complete the required fields with a valid email.";
        note.className = "form-note err";
        return;
      }
      var btn = form.querySelector("button[type=submit]");
      btn.disabled = true;
      btn.textContent = "Sending…";
      // Simulated submission. Wire this to your backend / email service / form provider.
      setTimeout(function () {
        note.textContent = "Thank you, " + name + ". We've received your request and will reply within one business day.";
        note.className = "form-note ok";
        form.reset();
        btn.disabled = false;
        btn.textContent = "Send My Request";
      }, 900);
    });
  }

  /* ---- Footer year ---- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
