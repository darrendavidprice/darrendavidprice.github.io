/* misc.js — small site-wide utilities */

(function () {
  'use strict';

  /* ── Mobile navigation toggle ────────────────────────────────────────
     The .nav-toggle button sets aria-expanded on itself and toggles the
     .is-open class on .site-nav. CSS handles show/hide and animation.
     Clicking a nav link or pressing Escape closes the menu.
  ──────────────────────────────────────────────────────────────────── */
  function initNavToggle() {
    var btn = document.querySelector('.nav-toggle');
    var nav = document.getElementById('site-nav');
    if (!btn || !nav) return;

    function openMenu() {
      nav.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
      btn.classList.add('is-open');
    }

    function closeMenu() {
      nav.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      btn.classList.remove('is-open');
    }

    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      if (expanded) { closeMenu(); } else { openMenu(); }
    });

    // Close on nav link click (single-page-style navigation)
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        btn.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !btn.contains(e.target)) {
        closeMenu();
      }
    });
  }

  /* ── Copy-to-clipboard buttons ──────────────────────────────────────
     Usage: <button class="copy-btn" data-target="element-id">Copy</button>
  ──────────────────────────────────────────────────────────────────── */
  function initCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var targetId = btn.getAttribute('data-target');
        var el = targetId ? document.getElementById(targetId) : null;
        if (!el) return;

        var text = (el.textContent || el.innerText || '').trim();

        if (!navigator.clipboard) {
          var ta = document.createElement('textarea');
          ta.value = text;
          ta.style.position = 'fixed';
          ta.style.left = '-9999px';
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand('copy'); } catch (e) { /* silent */ }
          document.body.removeChild(ta);
          flashButton(btn, 'Copied');
          return;
        }

        navigator.clipboard.writeText(text).then(function () {
          flashButton(btn, 'Copied');
        }).catch(function () {
          flashButton(btn, 'Error');
        });
      });
    });
  }

  function flashButton(btn, label) {
    var original = btn.textContent;
    btn.textContent = label;
    btn.disabled = true;
    setTimeout(function () {
      btn.textContent = original;
      btn.disabled = false;
    }, 1800);
  }

  /* ── Init ────────────────────────────────────────────────────────── */
  function init() {
    initNavToggle();
    initCopyButtons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
