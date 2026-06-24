/* ============================================================
   citations.js — decorate publication entries with live citation
   counts from the INSPIRE-HEP public REST API.
   ------------------------------------------------------------
   For each .pub[data-arxiv] we collect the arXiv id, build ONE
   batched query, and read metadata.citation_count. If anything
   fails (offline, API change, rate limit) the counts simply do
   not appear — the page degrades gracefully.

   Tier-2 upgrade (later): a scheduled GitHub Action can bake these
   numbers into _data so the page stays fully static. For now this
   runs client-side, once, after render.
   ============================================================ */
(function () {
  var API = "https://inspirehep.net/api/literature";

  document.addEventListener("DOMContentLoaded", function () {
    var pubs = Array.prototype.slice.call(document.querySelectorAll(".pub[data-arxiv]"));
    var ids = pubs
      .map(function (p) { return (p.getAttribute("data-arxiv") || "").trim(); })
      .filter(Boolean);
    if (!ids.length) return;

    // INSPIRE OR query: arxiv 2302.05458 or arxiv 2209.01177 ...
    var q = ids.map(function (id) { return "arxiv " + id; }).join(" or ");
    var url = API + "?q=" + encodeURIComponent(q) +
              "&fields=arxiv_eprints,citation_count,control_number&size=250";

    fetch(url, { headers: { Accept: "application/json" } })
      .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
      .then(function (data) {
        var byArxiv = {};
        (data.hits && data.hits.hits || []).forEach(function (hit) {
          var m = hit.metadata || {};
          var rec = m.control_number;
          var c = m.citation_count;
          (m.arxiv_eprints || []).forEach(function (e) {
            if (e && e.value) byArxiv[e.value] = { count: c, rec: rec };
          });
        });
        pubs.forEach(function (p) {
          var id = (p.getAttribute("data-arxiv") || "").trim();
          var hit = byArxiv[id];
          if (!hit || typeof hit.count !== "number") return;
          var el = p.querySelector(".pub-cite");
          if (!el) return;
          var label = hit.count + (hit.count === 1 ? " citation" : " citations");
          if (hit.rec) {
            el.innerHTML = '<a href="https://inspirehep.net/literature/' +
              hit.rec + '" rel="noopener">' + label + "</a>";
          } else {
            el.textContent = label;
          }
          el.setAttribute("data-loaded", "1");
        });
      })
      .catch(function () { /* silent: counts are progressive enhancement */ });
  });
})();
