(function () {
  /* =========================
     THEME TOGGLE (3 themes)
     light -> dark -> badge
  ========================== */
  const themes = ["light", "dark", "badge"];
  const key = "fa-theme";

  function applyTheme(t) {
    document.body.setAttribute("data-theme", t);

    // If you use Tailwind dark mode on other pages
    if (t === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }

  function getTheme() {
    return localStorage.getItem(key) || "dark";
  }

  function nextTheme() {
    const cur = document.body.getAttribute("data-theme") || getTheme();
    const idx = themes.indexOf(cur);
    const next = themes[(idx + 1) % themes.length];
    localStorage.setItem(key, next);
    applyTheme(next);
  }

  // Init theme
  applyTheme(getTheme());

  /* =========================
     ONE CLICK HANDLER ONLY
  ========================== */
  document.addEventListener("click", (e) => {
    // Theme toggle
    const themeBtn = e.target.closest("[data-theme-toggle]");
    if (themeBtn) {
      nextTheme();
      return;
    }

    // Password toggle (ICON ONLY)
    const passBtn = e.target.closest("[data-toggle-password]");
    if (!passBtn) return;

    const targetId = passBtn.getAttribute("data-toggle-password");
    const input = document.getElementById(targetId);
    if (!input) return;

    const isHidden = input.type === "password";
    input.type = isHidden ? "text" : "password";
    passBtn.setAttribute("aria-pressed", String(isHidden));

    // Toggle icons (must exist in HTML)
    const openIcon = passBtn.querySelector(".eye-open");
    const offIcon = passBtn.querySelector(".eye-off");
    if (openIcon && offIcon) {
      openIcon.classList.toggle("hidden", !isHidden);
      offIcon.classList.toggle("hidden", isHidden);
    }
  });
})();
