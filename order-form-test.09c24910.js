document.addEventListener("DOMContentLoaded", ()=>{
    // Mobile Menu Module
    const MobileMenu = {
        init () {
            this.burger = document.querySelector(".burger");
            this.nav = document.querySelector(".navigation");
            this.navLinks = document.querySelectorAll(".navigation__link");
            this.body = document.body;
            if (this.burger && this.nav) {
                this.burger.addEventListener("click", ()=>this.toggle());
                this.navLinks.forEach((link)=>link.addEventListener("click", ()=>this.close()));
            }
        },
        toggle () {
            const isOpen = this.nav.classList.contains("navigation--open");
            this.setState(!isOpen);
        },
        open () {
            this.setState(true);
        },
        close () {
            this.setState(false);
        },
        setState (isOpen) {
            this.burger.classList.toggle("burger--active", isOpen);
            this.nav.classList.toggle("navigation--open", isOpen);
            this.body.classList.toggle("no-scroll", isOpen);
        }
    };
    // Custom Select Module
    const CustomSelect = {
        init () {
            this.select = document.querySelector(".custom-select");
            this.hiddenInput = document.querySelector("#system_type_input");
            this.currentText = document.querySelector(".custom-select__current");
            this.selectHeader = document.querySelector(".custom-select__header");
            this.selectItems = document.querySelectorAll(".custom-select__item");
            if (this.select) {
                this.selectItemsArray = Array.from(this.selectItems);
                this.currentIndex = -1;
                this.isOpen = false;
                this.selectItems.forEach((item)=>item.setAttribute("tabindex", "-1"));
                this.bindEvents();
            }
        },
        bindEvents () {
            this.select.addEventListener("click", (e)=>this.handleClick(e));
            this.select.addEventListener("keydown", (e)=>this.handleKeydown(e));
            // Привязываем контекст this с помощью стрелочной функции
            this.boundHandleClickOutside = (e)=>{
                if (!this.select.contains(e.target)) this.close();
            };
            document.addEventListener("click", this.boundHandleClickOutside);
        },
        handleClick (e) {
            const header = e.target.closest(".custom-select__header");
            const item = e.target.closest(".custom-select__item");
            if (header) this.toggle();
            else if (item) this.selectItem(item);
        },
        handleKeydown (e) {
            if (e.key === "Enter") {
                const item = e.target.closest(".custom-select__item");
                if (item) {
                    this.selectItem(item);
                    e.preventDefault();
                } else if (this.selectHeader.contains(e.target)) {
                    this.open();
                    e.preventDefault();
                }
            } else if (e.key === "Escape") {
                this.close();
                this.selectHeader.focus();
                e.preventDefault();
            } else if (this.isOpen) this.handleNavigation(e);
            else if (e.key === "ArrowDown" || e.key === " ") {
                this.open();
                e.preventDefault();
            }
        },
        handleNavigation (e) {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                const nextIndex = this.currentIndex < this.selectItemsArray.length - 1 ? this.currentIndex + 1 : 0;
                this.highlightItem(nextIndex);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                const prevIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.selectItemsArray.length - 1;
                this.highlightItem(prevIndex);
            } else if (e.key === "Home") {
                e.preventDefault();
                this.highlightItem(0);
            } else if (e.key === "End") {
                e.preventDefault();
                this.highlightItem(this.selectItemsArray.length - 1);
            }
        },
        toggle () {
            this.isOpen ? this.close() : this.open();
        },
        open () {
            this.select.classList.add("custom-select--open");
            this.selectHeader.setAttribute("aria-expanded", "true");
            this.isOpen = true;
            if (this.currentIndex >= 0) this.selectItemsArray[this.currentIndex].focus();
            else this.selectItemsArray[0]?.focus();
        },
        close () {
            this.select.classList.remove("custom-select--open");
            this.selectHeader.setAttribute("aria-expanded", "false");
            this.isOpen = false;
        },
        highlightItem (index) {
            if (index < 0 || index >= this.selectItemsArray.length) return;
            this.selectItemsArray.forEach((item)=>item.classList.remove("custom-select__item--active"));
            this.selectItemsArray[index].classList.add("custom-select__item--active");
            this.selectItemsArray[index].focus();
            this.currentIndex = index;
        },
        selectItem (item) {
            this.currentText.textContent = item.textContent.trim();
            if (this.hiddenInput) this.hiddenInput.value = item.dataset.value;
            this.currentIndex = this.selectItemsArray.indexOf(item);
            this.highlightItem(this.currentIndex);
            this.close();
        }
    };
    // Range Slider Module
    const RangeSlider = {
        init () {
            this.rangeInput = document.getElementById("range-input");
            this.rangeValue = document.getElementById("range-value");
            if (this.rangeInput && this.rangeValue) this.rangeInput.addEventListener("input", ()=>this.updateValue());
        },
        updateValue () {
            this.rangeValue.textContent = `${this.rangeInput.value}%`;
        }
    };
    // Smooth Scroll Module
    const SmoothScroll = {
        init () {
            document.querySelectorAll('a[href^="#"]').forEach((anchor)=>{
                anchor.addEventListener("click", (e)=>this.handleClick(e, anchor));
            });
        },
        handleClick (e, anchor) {
            const targetId = anchor.getAttribute("href");
            if (targetId === "#") return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }
    };
    // Form Handler Module
    const FormHandler = {
        init () {
            this.form = document.querySelector(".form");
            this.hiddenInput = document.querySelector("#system_type_input");
            if (this.form) this.form.addEventListener("submit", (e)=>this.handleSubmit(e));
        },
        validate () {
            const requiredFields = [
                'input[name="email"]',
                'input[name="username"]'
            ];
            let isValid = true;
            requiredFields.forEach((selector)=>{
                const field = this.form.querySelector(selector);
                if (field && !field.value.trim()) isValid = false;
            });
            if (this.hiddenInput && !this.hiddenInput.value) isValid = false;
            return isValid;
        },
        handleSubmit (e) {
            e.preventDefault();
            if (!this.validate()) {
                alert("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0437\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0432\u0441\u0435 \u043F\u043E\u043B\u044F \u0444\u043E\u0440\u043C\u044B");
                return;
            }
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData);
            console.log("\u0414\u0430\u043D\u043D\u044B\u0435 \u0444\u043E\u0440\u043C\u044B:", data);
        }
    };
    // Initialize all modules
    MobileMenu.init();
    CustomSelect.init();
    RangeSlider.init();
    SmoothScroll.init();
    FormHandler.init();
});

//# sourceMappingURL=order-form-test.09c24910.js.map
