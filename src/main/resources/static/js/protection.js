(() => {
  "use strict";
  const isEditable = (el) => !!(el && el.closest(
    'input, textarea, select, [contenteditable="true"], [data-allow-copy], .selectable'
  ));

  document.addEventListener("contextmenu", (e) => {
    if (!isEditable(e.target)) e.preventDefault();
  });
  document.addEventListener("copy", (e) => {
    if (!isEditable(e.target)) e.preventDefault();
  });
  document.addEventListener("cut", (e) => {
    if (!isEditable(e.target)) e.preventDefault();
  });
  document.addEventListener("dragstart", (e) => {
    if (e.target && e.target.closest("img")) e.preventDefault();
  });
  document.addEventListener("keydown", (e) => {
    if (isEditable(e.target)) return;
    const key = (e.key || "").toLowerCase();
    const mod = e.ctrlKey || e.metaKey;
    const blocked = e.key === "F12" ||
      (mod && e.shiftKey && ["i", "j", "c"].includes(key)) ||
      (mod && !e.shiftKey && key === "u");
    if (blocked) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);
})();
