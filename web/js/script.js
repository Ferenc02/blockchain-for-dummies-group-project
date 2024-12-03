

//Faq Javascript for boxes open and close.
document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const faqItem = button.parentElement;
    const answer = faqItem.querySelector(".faq-answer");
    const isExpanded = button.getAttribute("aria-expanded") === "true";

    // Toggle expanded state
    button.setAttribute("aria-expanded", !isExpanded);
    answer.setAttribute("aria-hidden", isExpanded);

    // Toggle active class for styling
    faqItem.classList.toggle("active");

    // Collapse other FAQ items
    document.querySelectorAll(".faq-item").forEach((item) => {
      if (item !== faqItem) {
        const otherButton = item.querySelector(".faq-question");
        const otherAnswer = item.querySelector(".faq-answer");

        item.classList.remove("active");
        otherButton.setAttribute("aria-expanded", "false");
        otherAnswer.setAttribute("aria-hidden", "true");
      }
    });
  });
});