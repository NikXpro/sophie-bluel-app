import { deleteData, getData } from "./api.js";

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

    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  });
}

export function createModalGallery(data) {
  const gallery = document.querySelector(".gallery-modal");
  gallery.innerHTML = "";

  const modal = document.querySelector(".modal");
  if (modal.style.display === "none") {
    console.log("modal is not active");
    return;
  }

  if (!gallery) {
    console.log("gallery is not active");
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

export async function updateGallery(filtr, type) {
  console.log(type);
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
