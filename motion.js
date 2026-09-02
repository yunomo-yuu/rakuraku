(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reducedMotion.matches) return;

  const groups = [
    ".rooms",
    ".path-grid",
    ".tool-groups",
    ".book-grid",
    ".care-grid",
    ".calm-grid"
  ];
  const items = [];

  groups.forEach((selector) => {
    const group = document.querySelector(selector);
    if (!group) return;

    [...group.children].forEach((item, index) => {
      item.classList.add("motion-reveal");
      item.style.setProperty("--reveal-delay", `${Math.min(index, 4) * 90}ms`);
      items.push(item);
    });
  });

  document.querySelectorAll(
    ".path-section > .section-head, .tools > .section-head, .books > .section-head, .care-tools > .section-head, .privacy-note"
  ).forEach((item) => {
    item.classList.add("motion-reveal");
    items.push(item);
  });

  document.documentElement.classList.add("motion-ready");

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.08,
    rootMargin: "0px 0px -7% 0px"
  });

  items.forEach((item) => observer.observe(item));
})();
