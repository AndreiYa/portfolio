export const pageSwitch = (headerSelector, contentSelector, navSelector, classActive) => {
  const header = document.querySelector(headerSelector);
  const content = document.querySelectorAll(contentSelector);
  const nav = document.querySelectorAll(navSelector);

  function hideContent() {
    content.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show");
    });

    nav.forEach((item) => {
      item.classList.remove(classActive);
    });
  }

  function showContent(i = 0) {
    content[i].classList.remove("hide");
    content[i].classList.add("show");
    nav[i].classList.add(classActive);
  }

  hideContent();
  showContent();

  header.addEventListener("click", (e) => {
    const { target } = e;
    if (target.classList.contains(navSelector.replace(/\./, "")) || target.parentNode.classList.contains(navSelector.replace(/\./, ""))) {
      nav.forEach((item, i) => {
        if (target === item || target.parentNode === target) {
          hideContent();
          if (classActive === "show") {
            showContent(i + 1);
          } else {
            showContent(i);
          }

          const navBtn = document.querySelector(".nav__btn");
          const navWrapper = document.querySelector(".nav__wrapper");

          navBtn.classList.remove("open");
          navWrapper.classList.remove("active");
          navBtn.classList.add("close");
        }
      });
    }
  });
};

pageSwitch(".nav__wrapper", ".section", ".menu__item", "active");
pageSwitch(".card__wrapper", ".section", ".main__card", "show");
pageSwitch(".card__wrapper", ".section", ".pic__wrapper", "show");
pageSwitch(".card__wrapper", ".section", ".card__title", "show");

export default pageSwitch;
