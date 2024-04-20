"use strict";

// Element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
  if (elem === sidebar) {
    const buttonText = elem.querySelector("span");
    const icon = elem.querySelector("ion-icon");
    buttonText.textContent = elem.classList.contains("active")
      ? "Hide Contacts"
      : "Show Contacts";
    icon.style.transform = elem.classList.contains("active")
      ? "rotate(180deg)"
      : "rotate(0deg)";
  }
};

// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// Custom select variables
const select = document.querySelector("[data-select]");
const selectValue = document.querySelector("[data-select-value]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// Filter variables
const filterListBtns = document.querySelectorAll(
  ".filter-list [data-filter-btn]"
);
const filterSelectBtns = document.querySelectorAll(
  ".select-list [data-select-item]"
);
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  filterListBtns.forEach((btn) => {
    btn.classList.toggle(
      "active",
      btn.innerText.toLowerCase() === selectedValue
    );
  });

  filterSelectBtns.forEach((btn) => {
    btn.classList.toggle(
      "active",
      btn.innerText.toLowerCase() === selectedValue
    );
  });

  filterItems.forEach((item) => {
    item.classList.toggle(
      "active",
      selectedValue === "all" || selectedValue === item.dataset.category
    );
  });

  // Update selectValue with the correct casing
  selectValue.innerText = selectedValue;

  // Close the filter list
  select.classList.remove("active");
};

// Add event in all filter list and select button items
const allFilterButtons = document.querySelectorAll(
  ".filter-list [data-filter-btn], .select-list [data-select-item]"
);
allFilterButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText =
      selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1);
    filterFunc(selectedValue);
  });
});

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Add event to all nav links
navigationLinks.forEach((link) => {
  link.addEventListener("click", function () {
    const selectedPage = this.innerHTML.toLowerCase();
    let isActive = false; // Define isActive outside the loop
    pages.forEach((page) => {
      isActive = selectedPage === page.dataset.page;
      page.classList.toggle("active", isActive);
    });
    navigationLinks.forEach((navLink) => {
      isActive = selectedPage === navLink.innerHTML.toLowerCase();
      navLink.classList.toggle("active", isActive);
    });
    window.scrollTo(0, 0);
  });
});

// POPUP
const popup = document.getElementById("popup");
const popupContentContainer = document.getElementById(
  "popup-content-container"
);

function showHtmlPopup(htmlFile, button) {
  fetch(htmlFile)
    .then((response) => response.text())
    .then((htmlContent) => {
      popupContentContainer.innerHTML = htmlContent;
      const rect = button.getBoundingClientRect();
      const buttonCenterX = rect.left + rect.width / 2;
      const buttonCenterY = rect.top + rect.height / 2;
      const scaleX = window.innerWidth / rect.width;
      const scaleY = window.innerHeight / rect.height;
      popup.style.display = "flex";
      popup.style.animation = "fadeInBackground 0.5s ease forwards";
      popupContentContainer.style.transformOrigin = `${buttonCenterX}px ${buttonCenterY}px`;
      popupContentContainer.style.transform = `scale(${1 / scaleX}, ${
        1 / scaleY
      })`;
      setTimeout(() => {
        popupContentContainer.style.transition = "transform 0.5s";
        popupContentContainer.style.transform = "scale(1, 1)";
      }, 50);
    });
  document.body.style.overflow = "hidden";
}

popup.addEventListener("click", (event) => {
  if (event.target === popup) {
    hideHtmlPopup();
  }
});

function hideHtmlPopup() {
  popup.style.animation = "fadeOutBackground 0.7s ease forwards";
  popupContentContainer.style.animation = "scaleDown 0.7s ease forwards";
  setTimeout(() => {
    popup.style.display = "none";
    popupContentContainer.style.transform = "scale(1)";
    popupContentContainer.style.transition = "none";
    popup.style.animation = "";
    popupContentContainer.style.animation = "";
  }, 500);
  document.body.style.overflow = "auto";
}

// Color mode
function setTheme(theme) {
  const themeToggle = document.querySelector(".theme-switch__checkbox");
  themeToggle.checked = theme === "dark-mode"; // Update the checked state of the toggle switch
  document.documentElement.className = theme;
}

const prefersDarkMode = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;
setTheme(prefersDarkMode ? "dark-mode" : "");

const themeToggle = document.querySelector(".theme-switch__checkbox");
themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    setTheme("dark-mode");
  } else {
    setTheme("");
  }
});
