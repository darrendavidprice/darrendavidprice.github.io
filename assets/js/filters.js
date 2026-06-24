/* ============================================================
   filters.js — generic chip filtering for lists of .f-item
   ------------------------------------------------------------
   Markup contract:
     <div class="filterbar" data-controls="LISTID">
       <div class="filter-group" data-group="tags" data-mode="any">
         <span class="glabel">Filter</span>
         <button class="chip" data-value="dark-matter">Dark matter</button>
         ...
         <button class="chip reset">Reset</button>
       </div>
       <div class="filter-group" data-group="type" data-mode="include">
         <button class="chip active" data-value="invited" data-default="on">Invited talks</button>
         <button class="chip" data-value="internal" data-default="off">Working meetings</button>
         ...
       </div>
     </div>
     <ul id="LISTID">
       <li class="f-item" data-tags="dark-matter collider" data-type="invited"> ... </li>
     </ul>

   Group modes:
     "any"     chips start OFF; empty selection => show all; otherwise an
               item passes if it carries ANY selected value (union).
     "include" chips start per data-default; an item passes if its value is
               among the currently-active chips. (Used for talk types, so
               "internal" can default OFF and be revealed on demand.)
   An item is shown only if it passes EVERY group. A year heading with no
   visible items beneath it is hidden automatically.
   ============================================================ */
(function () {
  function values(el, attr) {
    return (el.getAttribute(attr) || "").trim().split(/\s+/).filter(Boolean);
  }

  function setup(bar) {
    var listId = bar.getAttribute("data-controls");
    var list = document.getElementById(listId);
    if (!list) return;
    var items = Array.prototype.slice.call(list.querySelectorAll(".f-item"));
    var groups = Array.prototype.slice.call(bar.querySelectorAll(".filter-group"));
    var countEl = bar.querySelector(".filter-count");

    function apply() {
      var shown = 0;
      items.forEach(function (item) {
        var pass = groups.every(function (g) {
          var mode = g.getAttribute("data-mode") || "any";
          var active = Array.prototype.slice
            .call(g.querySelectorAll(".chip.active"))
            .map(function (c) { return c.getAttribute("data-value"); })
            .filter(Boolean);
          var key = g.getAttribute("data-group") === "type" ? "data-type" : "data-tags";
          var iv = values(item, key);
          if (mode === "any") {
            if (active.length === 0) return true;
            return active.some(function (a) { return iv.indexOf(a) !== -1; });
          } else { // include
            return iv.some(function (v) { return active.indexOf(v) !== -1; });
          }
        });
        item.hidden = !pass;
        if (pass) shown++;
      });
      // hide empty year-groups, then empty sections (sections that wrap year-groups)
      Array.prototype.slice.call(list.querySelectorAll(".year-group")).forEach(function (yg) {
        var any = yg.querySelector(".f-item:not([hidden])");
        yg.hidden = !any;
      });
      Array.prototype.slice.call(list.querySelectorAll(".pub-section")).forEach(function (sec) {
        var any = sec.querySelector(".f-item:not([hidden])");
        sec.hidden = !any;
      });
      if (countEl) countEl.textContent = shown + " shown";
    }

    groups.forEach(function (g) {
      g.querySelectorAll(".chip").forEach(function (chip) {
        chip.addEventListener("click", function () {
          if (chip.classList.contains("reset")) {
            g.parentElement.querySelectorAll(".filter-group").forEach(function (gg) {
              gg.querySelectorAll(".chip").forEach(function (c) {
                if (c.classList.contains("reset")) return;
                c.classList.toggle("active", c.getAttribute("data-default") === "on");
              });
            });
          } else {
            chip.classList.toggle("active");
          }
          apply();
        });
        // initialise from data-default
        if (!chip.classList.contains("reset") &&
            chip.getAttribute("data-default") === "on" &&
            !chip.classList.contains("active")) {
          chip.classList.add("active");
        }
      });
    });

    apply();
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".filterbar[data-controls]").forEach(setup);
  });
})();
