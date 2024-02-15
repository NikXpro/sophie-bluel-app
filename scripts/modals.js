let modalActive = 0;

const modalsManager = [
  {
    header: {
      title: "Modifier",
      back: true,
      close: true,
    },
  },
];

/**
 * Toggles the display of an overlay and a modal element on a web page.
 */
export function toggleModal() {
  const overlay = document.querySelector(".overlay");
  const modal = document.querySelector(".modal");

  const isDisplayed =
    overlay.style.display === "block" && modal.style.display === "flex";

  overlay.style.display = isDisplayed ? "none" : "block";
  modal.style.display = isDisplayed ? "none" : "flex";
}

/**
 * Toggles between different steps in a modal.
 * @param {string} step - Represents the action to be performed. Can be either "next" or "back".
 */
export function switchModal(step) {
  if (modalActive <= 0 || modalActive >= 1) {
    modalActive = 0;
    toggleModal();
    return;
  }

  if (step === "next") {
    modalActive++;
    // Go to the next page
  }

  if (step === "back") {
    modalActive--;
    // Go to the previous page
  }
}
