// Element toggle function
const toggleActive = (elem, activeText, inactiveText) => {
  elem.classList.toggle("active");
  if (elem === sidebar) {
    const buttonText = elem.querySelector("span");
    const icon = elem.querySelector("ion-icon");
    buttonText.textContent = elem.classList.contains("active")
      ? activeText
      : inactiveText;
    icon.style.transform = elem.classList.contains("active")
      ? "rotate(180deg)"
      : "rotate(0deg)";
  }
};

// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", () =>
  toggleActive(sidebar, "Hide Contacts", "Show Contacts")
);

// Custom select variables
const select = document.querySelector("[data-select]");
select.addEventListener("click", () => toggleActive(select));

// Filter variables
const filterListBtns = document.querySelectorAll(
  ".filter-list [data-filter-btn]"
);
const filterSelectBtns = document.querySelectorAll(
  ".select-list [data-select-item]"
);
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = (selectedValue) => {
  const toggleActiveFilter = (btn) =>
    btn.classList.toggle(
      "active",
      btn.innerText.toLowerCase() === selectedValue
    );
  filterListBtns.forEach(toggleActiveFilter);
  filterSelectBtns.forEach(toggleActiveFilter);

  filterItems.forEach((item) =>
    item.classList.toggle(
      "active",
      selectedValue === "all" || selectedValue === item.dataset.category
    )
  );

  // Update selectValue with the correct casing
  document.querySelector("[data-select-value]").innerText = selectedValue;

  // Close the filter list
  select.classList.remove("active");
};

// Add event in all filter list and select button items
document
  .querySelectorAll(
    ".filter-list [data-filter-btn], .select-list [data-select-item]"
  )
  .forEach((btn) =>
    btn.addEventListener("click", () => filterFunc(btn.innerText.toLowerCase()))
  );

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Add event to all nav links
navigationLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const selectedPage = link.innerHTML.toLowerCase();
    pages.forEach((page) =>
      page.classList.toggle("active", selectedPage === page.dataset.page)
    );
    navigationLinks.forEach((navLink) =>
      navLink.classList.toggle(
        "active",
        selectedPage === navLink.innerHTML.toLowerCase()
      )
    );
    window.scrollTo(0, 0);
  });
});

// POPUP
const popup = document.getElementById("popup");
const popupContentContainer = document.getElementById(
  "popup-content-container"
);

const showHtmlPopup = async (htmlFile, button) => {
  const response = await fetch(htmlFile);
  const htmlContent = await response.text();
  popupContentContainer.innerHTML = htmlContent;
  const { left, top, width, height } = button.getBoundingClientRect();
  const [buttonCenterX, buttonCenterY] = [left + width / 2, top + height / 2];
  const [scaleX, scaleY] = [
    window.innerWidth / width,
    window.innerHeight / height,
  ];
  Object.assign(popup.style, {
    display: "flex",
    animation: "fadeInBackground 0.5s ease forwards",
  });
  Object.assign(popupContentContainer.style, {
    transformOrigin: `${buttonCenterX}px ${buttonCenterY}px`,
    transform: `scale(${1 / scaleX}, ${1 / scaleY})`,
  });
  setTimeout(() => {
    Object.assign(popupContentContainer.style, {
      transition: "transform 0.5s",
      transform: "scale(1, 1)",
    });
  }, 50);
  document.body.style.overflow = "hidden";
};

popup.addEventListener("click", (event) => {
  if (event.target === popup) {
    hideHtmlPopup();
  }
});

const hideHtmlPopup = () => {
  Object.assign(popup.style, {
    animation: "fadeOutBackground 0.7s ease forwards",
  });
  Object.assign(popupContentContainer.style, {
    animation: "scaleDown 0.7s ease forwards",
  });
  setTimeout(() => {
    Object.assign(popup.style, { display: "none", animation: "" });
    Object.assign(popupContentContainer.style, {
      transform: "scale(1)",
      transition: "none",
      animation: "",
    });
  }, 500);
  document.body.style.overflow = "auto";
};

// Cache DOM elements
const themeToggle = document.querySelector(".theme-switch__checkbox");

// Function to get CSS variable value
const getCssVarValue = (varName) =>
  getComputedStyle(document.documentElement).getPropertyValue(varName).trim();

// Function to set theme
const setTheme = (theme) => {
  themeToggle.checked = theme === "dark-mode";
  document.documentElement.className = theme;
};

// Check user's preferred color scheme
const prefersDarkMode = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

// Set initial theme based on user's preference
setTheme(prefersDarkMode ? "dark-mode" : "light-mode");

// Add event listener to theme toggle switch
themeToggle.addEventListener("change", () =>
  setTheme(themeToggle.checked ? "dark-mode" : "light-mode")
);
