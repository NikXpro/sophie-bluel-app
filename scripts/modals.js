import { addGalleryItem, createrModalForm } from "./add.js";
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
      clickHandler: (data) => {
        switchModal("next");
      },
    },
  },
  {
    header: {
      title: "Ajout photo",
      back: true,
    },
    body: {
      type: "form",
    },
    footer: {
      button: "Valider",
      clickHandler: (data) => {
        addGalleryItem(data);
      },
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

/**
 * Removes the modal element from the DOM.
 */
export function clearModal() {
  const modal = document.querySelector(".modal");
  if (modal) {
    modal.remove();
  }
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
  const submitButton = document.getElementById("submit");
  submitButton.disabled = false;
  setModal();
}

/**
 * Updates the modal based on the current value of `modalActive` variable.
 * @returns {void}
 */
function setModal() {
  // Get references to the close and back buttons in the modal header
  const closeButton = document.querySelector(".modal-header .close");
  const backButton = document.querySelector(".modal-header .back");

  // Set the display property of the close button to "flex" to make it visible
  closeButton.style.display = "flex";

  // Set the display property of the back button based on the value of `modalsManager[modalActive].header.back`
  backButton.style.display = modalsManager[modalActive].header.back
    ? "flex"
    : "none";

  // Get a reference to the modal title element and set its text content
  const modalTitle = document.querySelector(".modal h3");
  modalTitle.textContent = modalsManager[modalActive].header.title;

  // Get the value of `modalsManager[modalActive].body.type`
  const type = modalsManager[modalActive].body.type;

  const gallery = document.querySelector(".modal-body .gallery-modal");
  const form = document.querySelector(".modal-body .form-modal");
  gallery.innerHTML = "";
  form.innerHTML = "";

  // Hide the form and show the gallery if the type is "gallery"
  if (type === "gallery") {
    form.style.display = "none";
    gallery.style.display = "flex";

    // Fetch data from the server using the `getData` function with the argument "works"
    getData("works").then((data) => {
      // Call the `createModalGallery` function with the fetched data to populate the gallery
      createModalGallery(data);
    });
  }
  // Hide the gallery and show the form if the type is "form"
  else if (type === "form") {
    gallery.style.display = "none";
    form.style.display = "flex";

    getData("categories").then((data) => {
      // Call the `createrModalForm` function with the fetched data to category
      createrModalForm(data);
    });
  }

  // Get a reference to the footer button and set its value
  const footerButton = document.querySelector(".modal-footer input");
  footerButton.value = modalsManager[modalActive].footer.button;
}

/**
 * Dynamically creates a modal HTML structure and adds it to the DOM.
 * Attaches event listeners to the close, back, and footer buttons.
 * Calls the `setModal` function to initialize the modal content.
 */
export function createModal() {
  // Define the modal HTML structure
  const modalHTML = `
    <div class="modal">
      <div class="modal-header">
        <div class="icon">
          <img class="close" src="assets/icons/xmark.svg" alt="" />
          <img class="back" src="assets/icons/arrow-left.svg" alt="" />
        </div>
        <h3>Undefined</h3>
      </div>
      <div class="modal-body">
        <div class="gallery-modal"></div>
        <div class="form-modal"></div>
      </div>
      <div class="modal-footer">
        <div class="line"></div>
        <input type="submit" value="Ajouter une photo" id="submit" />
      </div>
    </div>
  `;
  // TODO: Use Dialog Element instead of custom modal
  // Insert the modal HTML as the last child of the `main` element in the DOM
  const main = document.querySelector("main");
  main.insertAdjacentHTML("beforeend", modalHTML);

  // Get references to the close, back, and footer buttons
  const closeButton = document.querySelector(".modal-header .close");
  const backButton = document.querySelector(".modal-header .back");
  const footerButton = document.querySelector(".modal-footer input");
  const overlay = document.querySelector(".overlay");

  // Attach event listeners to the buttons
  closeButton.addEventListener("click", toggleModal);
  backButton.addEventListener("click", () => switchModal("back"));
  footerButton.addEventListener("click", (event) =>
    modalsManager[modalActive].footer.clickHandler(event)
  );
  overlay.addEventListener("click", toggleModal);

  // Initialize the modal content
  setModal();
}
