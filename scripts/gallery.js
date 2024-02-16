import { deleteData, getData } from "./api.js";

/**
 * Creates a gallery of images and captions based on the provided data.
 * @param {Array} data - An array of objects representing the data for each image in the gallery.
 * Each object should have properties `imageUrl` (string) and `title` (string).
 */
export function createMainGallery(data) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  data.forEach((item) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    img.src = item.imageUrl;
    img.alt = item.title;
    figcaption.textContent = item.title;

    figure.append(img, figcaption);
    gallery.appendChild(figure);
  });
}

/**
 * Creates a modal gallery in the HTML document.
 * @param {Array} data - An array of objects representing gallery items.
 */
export function createModalGallery(data) {
  const gallery = document.querySelector(".gallery-modal");
  gallery.innerHTML = "";

  const modal = document.querySelector(".modal");
  if (modal.style.display === "none") {
    console.log("Modal is not active");
    return;
  }

  if (!gallery) {
    console.log("Gallery is not active");
    return;
  }

  data.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";
    card.id = item.id;

    const img = document.createElement("img");
    img.src = item.imageUrl;
    img.alt = item.title;

    const deleteButton = document.createElement("div");
    deleteButton.className = "delete";
    deleteButton.style.cursor = "pointer";

    const deleteIcon = document.createElement("img");
    deleteIcon.src = "assets/icons/trash-can-solid.svg";
    deleteIcon.alt = "Delete";

    deleteButton.appendChild(deleteIcon);
    card.appendChild(img);
    card.appendChild(deleteButton);
    gallery.appendChild(card);

    deleteButton.addEventListener("click", () => {
      card.remove();
      console.log("Deleted " + card.id);
      deleteData("works/" + card.id);
      updateGallery();
    });
  });
}

/**
 * Updates the gallery based on the provided filter and type.
 * Fetches data from the server, filters it based on the provided filter,
 * and then calls the appropriate functions to create the main and modal galleries.
 *
 * @param {number|null} filtr - The filter to be applied to the data. Represents the category id of the items to be included in the gallery.
 * @param {string|null} type - The type of gallery to be created. Can be either "main" or "modal".
 * @returns {Promise<void>} - A promise that resolves once the gallery has been updated.
 */
export async function updateGallery(filtr, type) {
  try {
    const data = await getData("works");
    const filteredData = filtr
      ? data.filter((item) => item.category.id === filtr)
      : data;

    if (type === undefined || type === "main") {
      createMainGallery(filteredData);
    }

    if (type === undefined || type === "modal") {
      createModalGallery(filteredData);
    }
  } catch (error) {
    console.error("Error updating gallery:", error);
  }
}
