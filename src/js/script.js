document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".navigation");
  const navLinks = document.querySelectorAll(".navigation__link");
  const body = document.body;

  const toggleMenu = (isOpen) => {
    burger.classList.toggle("burger--active", isOpen);
    nav.classList.toggle("navigation--open", isOpen);
    body.classList.toggle("no-scroll", isOpen);
  };

  if (burger && nav) {
    burger.addEventListener("click", () => {
      const isOpen = nav.classList.contains("navigation--open");
      toggleMenu(!isOpen);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => toggleMenu(false));
    });
  }

  const select = document.querySelector(".custom-select");
  const hiddenInput = document.querySelector("#system_type_input");
  const currentText = document.querySelector(".custom-select__current");
  const selectItems = document.querySelectorAll(".custom-select__item");

  if (select) {
    selectItems.forEach((item) => {
      item.setAttribute("tabindex", "0");
    });

    const handleSelectAction = (item) => {
      currentText.textContent = item.textContent.trim();
      if (hiddenInput) hiddenInput.value = item.dataset.value;
      select.classList.remove("custom-select--open");
    };

    select.addEventListener("click", (e) => {
      const header = e.target.closest(".custom-select__header");
      const item = e.target.closest(".custom-select__item");

      if (header) select.classList.toggle("custom-select--open");
      if (item) handleSelectAction(item);
    });

    select.addEventListener("keydown", (e) => {
      const item = e.target.closest(".custom-select__item");
      if (item && e.key === "Enter") {
        handleSelectAction(item);
      }
    });

    document.addEventListener("click", (e) => {
      if (!select.contains(e.target)) {
        select.classList.remove("custom-select--open");
      }
    });
  }

  const rangeInput = document.getElementById("range-input");
  const rangeValue = document.getElementById("range-value");

  if (rangeInput && rangeValue) {
    rangeInput.addEventListener("input", () => {
      rangeValue.textContent = `${rangeInput.value}%`;
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  const form = document.querySelector(".form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      console.log("Данные формы:", Object.fromEntries(formData));
    });
  }
});
