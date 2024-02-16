import { getData } from "./api.js";

export function createMainGallery(data) {
  const gallery = document.querySelector(".gallery");

  data.forEach((item) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    img.src = item.imageUrl;
    img.alt = item.title;
    figcaption.textContent = item.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  });
}

export function createModalGallery(data) {
  const gallery = document.querySelector(".gallery-modal");

  data.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";
    card.id = item.id;
    const img = document.createElement("img");
    img.src = item.imageUrl;
    img.alt = item.title;
    const deleteButton = document.createElement("div");
    deleteButton.className = "delete";
    const deleteIcon = document.createElement("img");
    deleteIcon.src = "assets/icons/trash-can-solid.svg";
    deleteIcon.alt = "Delete";

    deleteButton.appendChild(deleteIcon);
    card.appendChild(img);
    card.appendChild(deleteButton);
    gallery.appendChild(card);
  });
}

export function updateGallery(filtr) {
  getData("works").then((data) => {
    if (filtr) {
      createMainGallery(data.filter((item) => item.category.id === filtr));
      return;
    }

    const stockData = getData("works");

    createMainGallery(data);
  });
}
