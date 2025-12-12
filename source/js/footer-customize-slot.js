// Repositions custom footer snippets into left/center/right slots.
(() => {
  const SLOT_ATTR = "data-footer-slot";
  const SLOT_CLASS = "footer-customize-slot";

  const getTargets = infoContainer => {
    const directCenters = Array.from(infoContainer.children).filter(node => {
      const cls = node.className || "";
      return (
        node.classList?.contains("text-center") &&
        !node.classList.contains("customize-info") &&
        !cls.includes("lg:left-") &&
        !cls.includes("lg:right-")
      );
    });

    const left =
      infoContainer.querySelector('.lg\\:left-\\[20px\\]') ||
      infoContainer.querySelector('[class*="lg:left-[20px]"]');
    const right =
      infoContainer.querySelector('.lg\\:right-\\[20px\\]') ||
      infoContainer.querySelector('[class*="lg:right-[20px]"]');

    return {
      left,
      center:
        infoContainer.querySelector('.customize-info + .text-center') ||
        directCenters[0] ||
        infoContainer.querySelector(':scope > .text-center') ||
        left?.parentElement?.querySelector('.text-center'),
      right
    };
  };

  const apply = () => {
    const infoContainer = document.querySelector('.footer .info-container');
    if (!infoContainer) return;

    infoContainer
      .querySelectorAll(`.${SLOT_CLASS}`)
      .forEach(node => node.remove());

    const customize = infoContainer.querySelector('.customize-info');
    if (!customize) return;

    const slotItems = Array.from(customize.querySelectorAll(`[${SLOT_ATTR}]`));
    if (!slotItems.length) {
      customize.style.display = "";
      return;
    }

    const targets = getTargets(infoContainer);

    slotItems.forEach(item => {
      const slot = item.getAttribute(SLOT_ATTR)?.trim().toLowerCase();
      const target = targets[slot];
      if (!slot || !target) return;

      const clone = item.cloneNode(true);
      clone.classList.add(SLOT_CLASS, "my-1");
      target.appendChild(clone);
    });

    customize.style.display = "none";
  };

  const init = () => {
    // Delay slightly to wait for footer DOM in SPA transitions.
    window.requestAnimationFrame(apply);
  };

  if (document.readyState === "complete" || document.readyState === "interactive") {
    init();
  } else {
    document.addEventListener("DOMContentLoaded", init);
  }

  document.addEventListener("swup:contentReplaced", init);
})();
