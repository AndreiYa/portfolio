const cardsBtn = document.querySelectorAll(".reverse");
const cards = document.querySelectorAll(".card__flip");

cardsBtn.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    e.target.parentNode.parentNode.classList.add("transform");
  });
  cards.forEach((el) => {
    el.addEventListener("mouseleave", (e) => {
      e.target.classList.remove("transform");
    });
  });
});
