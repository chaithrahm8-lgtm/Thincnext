// Unified Menu Logic

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  // 1. Toggle menu on hamburger click
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation(); 
      mobileMenu.classList.toggle('active');
    });
    
    mobileMenu.addEventListener('click', (e) => {
      e.stopPropagation(); 
    });
  }

  // 2. NEW: Close mobile menu automatically if screen is resized to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
      if (mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
      }
    }
  });

  // ... (rest of your desktop dropdown and global click logic)


// --- Desktop Dropdown Logic ---
const setupDropdown = (btnId, menuId, arrowId) => {
    const btn = document.getElementById(btnId);
    const menu = document.getElementById(menuId);
    const arrow = document.getElementById(arrowId);

    if (!btn || !menu) return;

    btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isClosed = menu.classList.contains("invisible");
    closeAllDesktopMenus();

    if (isClosed) {
        menu.classList.remove("opacity-0", "invisible", "translate-y-2");
        if (arrow) arrow.classList.add("rotate-180");
    }
    });

    menu.addEventListener("click", (e) => {
    e.stopPropagation();
    });
};

const closeAllDesktopMenus = () => {
    const dropdowns = [
    { menu: "services-menu", arrow: "services-arrow" },
    { menu: "offer-menu", arrow: "offer-arrow" },
    ];

    dropdowns.forEach((item) => {
    const m = document.getElementById(item.menu);
    const a = document.getElementById(item.arrow);
    if (m) {
        m.classList.add("opacity-0", "invisible", "translate-y-2");
        if (a) a.classList.remove("rotate-180");
    }
    });
};

setupDropdown("services-btn", "services-menu", "services-arrow");
setupDropdown("offer-btn", "offer-menu", "offer-arrow");

// --- Global Click: Close Everything ---
document.addEventListener("click", () => {
    closeAllDesktopMenus();
    if (mobileMenu && mobileMenu.classList.contains("active")) {
    mobileMenu.classList.remove("active");
    }
});
});



//Navbar Scroll Effect
window.addEventListener("scroll", () => {
  const nav = document.getElementById("navbar");
  if (window.scrollY > 20) {
    nav.classList.add("py-2");
    nav.classList.remove("py-4");
  } else {
    nav.classList.add("py-4");
    nav.classList.remove("py-2");
  }
});