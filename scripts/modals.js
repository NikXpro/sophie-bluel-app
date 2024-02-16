import { getData } from "./api.js";
import { createModalGallery } from "./gallery.js";

let modalActive = 0;

const modalsManager = [
  {
    header: {
      title: "Galerie photo",
      back: false,
    },
    body: {
      type: "gallery",
    },
    footer: {
      button: "Ajouter une photo",
    },
  },
  {
    header: {
      title: "Ajouter une photo",
      back: true,
    },
    body: {
      type: "form",
    },
    footer: {
      button: "Valider",
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

  modalActive = 0;
}

export function clearModal() {
  const gallery = document.querySelector(".modal");
  gallery.remove();
}

/**
 * Toggles between different steps in a modal.
 * @param {string} step - Represents the action to be performed. Can be either "next" or "back".
 */
export function switchModal(step) {
  if (step === "next") {
    modalActive = 1;
    // Go to the next page
  }

  if (step === "back") {
    modalActive = 0;
    // Go to the previous page
  }
  console.log(modalActive, step);

  setModal();
}

function setModal() {
  const closeButton = document.querySelector(".modal-header .close");
  closeButton.style.display = "flex";

  const backButton = document.querySelector(".modal-header .back");
  backButton.style.display = modalsManager[modalActive].header.back
    ? "flex"
    : "none";

  const modalTitle = document.querySelector(".modal h3");
  modalTitle.textContent = modalsManager[modalActive].header.title;

  const type = modalsManager[modalActive].body.type;

  if (type === "gallery") {
    const form = document.querySelector(".modal-body .form-modal");
    form.style.display = "none";
    const gallery = document.querySelector(".modal-body .gallery-modal");
    gallery.style.display = "flex";

    getData("works").then((data) => {
      createModalGallery(data);
    });
  } else if (type === "form") {
    const gallery = document.querySelector(".modal-body .gallery-modal");
    gallery.style.display = "none";
    const form = document.querySelector(".modal-body .form-modal");
    form.style.display = "flex";
  }

  const footerButton = document.querySelector(".modal-footer input");
  footerButton.value = modalsManager[modalActive].footer.button;
}

export function createModal() {
  const modalHTML = `
    <div class="modal">
      <div class="modal-header">
        <div class="icon">
          <img class="close" src="assets/icons/xmark.svg" alt="">
          <img class="back" src="assets/icons/arrow-left.svg" alt="">
        </div>
        <h3>Undefined</h3>
      </div>
      <div class="modal-body">
        <div class="gallery-modal">
        </div>
        <div class="form-modal"></div>
      </div>
      <div class="modal-footer">
        <div class="line"></div>
        <input type="submit" value="Ajouter une photo">
      </div>
    </div>
  `;

  const main = document.querySelector("main");
  main.insertAdjacentHTML("beforeend", modalHTML);

  const closeButton = document.querySelector(".modal-header .close");
  const backButton = document.querySelector(".modal-header .back");
  const footerButton = document.querySelector(".modal-footer input");

  closeButton.addEventListener("click", () => {
    toggleModal();
  });

  backButton.addEventListener("click", () => {
    switchModal("back");
  });

  footerButton.addEventListener("click", () => {
    switchModal("next");
  });

  setModal();
}
