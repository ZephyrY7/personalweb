"use strict";

// Element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
  const buttonText = elem.querySelector("span");
  const icon = elem.querySelector("ion-icon");
  buttonText.textContent = elem.classList.contains("active") ? "Hide Contacts" : "Show Contacts";
  icon.style.transform = elem.classList.contains("active") ? "rotate(180deg)" : "rotate(0deg)";
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
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// Add event in all select items
select.addEventListener("click", function (event) {
  if (event.target.matches("[data-select-item]")) {
    let selectedValue = event.target.innerText.toLowerCase();
    selectValue.innerText = event.target.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  }
});

// Filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// Add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Add event to all nav links
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// POPUP
let clickPosition = { x: 0, y: 0 };
const popup = document.getElementById("popup");
const popupContentContainer = document.getElementById(
  "popup-content-container"
);

function showHtmlPopup(htmlFile, button) {
  // Load content from the specified HTML file
  fetch(htmlFile)
    .then((response) => response.text())
    .then((htmlContent) => {
      popupContentContainer.innerHTML = htmlContent;

      // Calculate the position and size of the button
      const rect = button.getBoundingClientRect();
      const buttonCenterX = rect.left + rect.width / 2;
      const buttonCenterY = rect.top + rect.height / 2;
      const scaleX = window.innerWidth / rect.width;
      const scaleY = window.innerHeight / rect.height;

      // Set initial position and size of the popup
      popup.style.display = "flex";
      popup.style.animation = "fadeInBackground 0.5s ease forwards";
      popupContentContainer.style.transformOrigin = `${buttonCenterX}px ${buttonCenterY}px`;
      popupContentContainer.style.transform = `scale(${1 / scaleX}, ${
        1 / scaleY
      })`;

      // Apply animation
      setTimeout(() => {
        popupContentContainer.style.transition = "transform 0.5s";
        popupContentContainer.style.transform = "scale(1, 1)";
      }, 50); // Delay the animation slightly for smoother effect
    });

  document.body.style.overflow = "hidden";
}

// Close the popup when clicking on the overlay
popup.addEventListener("click", (event) => {
  if (event.target === popup) {
    hideHtmlPopup();
  }
});

function hideHtmlPopup() {
  // Apply the fadeOut animation to both the popup and popup content
  popup.style.animation = "fadeOutBackground 0.7s ease forwards";
  popupContentContainer.style.animation = "scaleDown 0.7s ease forwards";

  // Reset the popup after the animation completes
  setTimeout(() => {
    popup.style.display = "none";
    popupContentContainer.style.transform = "scale(1)";
    popupContentContainer.style.transition = "none";
    popup.style.animation = ""; // Reset background animation
    popupContentContainer.style.animation = ""; // Reset content animation
  }, 500); // Wait for the animation to complete (500ms)

  document.body.style.overflow = "auto";
}
