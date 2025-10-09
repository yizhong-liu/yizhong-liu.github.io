(function () {
  // Run after DOM ready. Use jQuery-ready if available on site, otherwise fallback
  var onReady = window.jQuery ? jQuery : function (cb) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", cb);
    } else {
      cb();
    }
  };

  onReady(function () {
    // Find all h2 sections and wrap their subsequent siblings until next h2
    var article = document.querySelector(".page__content") || document.querySelector("main, article, .page") || document.body;
    if (!article) return;

    var headings = Array.prototype.slice.call(article.querySelectorAll("h2"));
    if (!headings.length) return;

    headings.forEach(function (h2) {
      // Create wrapper
      var wrapper = document.createElement("div");
      wrapper.className = "section-collapsible";
      wrapper.setAttribute("aria-expanded", "true");

      // Header row containing the original h2 and an icon
      var header = document.createElement("div");
      header.className = "section-collapsible__header";

      var icon = document.createElement("span");
      icon.className = "section-collapsible__icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = "▾";

      // Move the existing h2 into header
      h2.parentNode.insertBefore(wrapper, h2);
      header.appendChild(h2);
      header.appendChild(icon);
      wrapper.appendChild(header);

      // Content container collects siblings until next h2
      var content = document.createElement("div");
      content.className = "section-collapsible__content";

      // Move every sibling after wrapper into content until we hit the next h2
      while (wrapper.nextSibling) {
        var sib = wrapper.nextSibling;
        if (sib.nodeType === 1 && sib.tagName.toLowerCase() === "h2") break;
        content.appendChild(sib); // appending moves the node
      }
      wrapper.appendChild(content);

      // Toggle behavior
      header.addEventListener("click", function () {
        var isExpanded = wrapper.getAttribute("aria-expanded") === "true";
        wrapper.setAttribute("aria-expanded", String(!isExpanded));
        if (isExpanded) {
          content.setAttribute("hidden", "");
        } else {
          content.removeAttribute("hidden");
        }
      });
    });
  });
})();


