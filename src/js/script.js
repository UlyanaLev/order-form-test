document.addEventListener("DOMContentLoaded", () => {
  const select = document.querySelector(".custom-select");
  const header = document.querySelector(".custom-select__header");
  const items = document.querySelectorAll(".custom-select__item");
  const currentText = document.querySelector(".custom-select__current");
  const hiddenInput = document.querySelector("#system_type_input");

  const rangeInput = document.getElementById("range-input");
  const rangeValue = document.getElementById("range-value");

  if (header) {
    header.addEventListener("click", () => {
      select.classList.toggle("custom-select--open");
    });
  }

  items.forEach((item) => {
    item.addEventListener("click", () => {
      currentText.innerText = item.innerText;
      hiddenInput.value = item.getAttribute("data-value");
      select.classList.remove("custom-select--open");
    });
  });

  document.addEventListener("click", (e) => {
    if (select && !select.contains(e.target)) {
      select.classList.remove("custom-select--open");
    }
  });

  if (rangeInput && rangeValue) {
    rangeInput.addEventListener("input", (e) => {
      rangeValue.textContent = e.target.value + "%";
    });
  }
});
