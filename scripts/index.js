import { getData } from "./api.js";
import { switchModal, toggleModal } from "./modals.js";

const selectors = [
  { selector: "banner", text: "Mode édition", color: "#ffffff" },
  {
    selector: "project",
    text: "Modifier",
    color: "#000000",
    clickHandler: () => {
      toggleModal();
    },
  },
];

/**
 * Creates a gallery of images and their captions based on the provided data.
 *
 * @param {Array} data - An array of objects representing the images to be displayed in the gallery.
 * Each object should have `imageUrl` and `title` properties.
 */
function createGallery(data) {
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

getData("categories").then((data) => {
  const categoryList = document.querySelector(".category");
  data.forEach((category) => {
    const li = document.createElement("li");
    li.textContent = category.name;
    li.id = category.id;
    categoryList.appendChild(li);
  });

  const categoryElements = document.querySelectorAll(".category li");

  categoryElements.forEach((category) => {
    category.addEventListener("click", (event) => {
      const selectedCategory = Number(event.target.id);

      const gallery = document.querySelector(".gallery");
      gallery.innerHTML = "";

      getData("works").then((data) => {
        categoryElements.forEach((cat) => {
          cat.classList.remove("active");
        });

        event.target.classList.add("active");

        if (selectedCategory === 0) {
          createGallery(data);
          return;
        }

        createGallery(
          data.filter((item) => item.category.id === selectedCategory)
        );
      });
    });
  });
});

/**
 * Clears and hides all elements with the class "edit".
 */
function clearEditElements() {
  const editElements = document.querySelectorAll(".edit");
  editElements.forEach((element) => {
    element.innerHTML = "";
    element.style.display = "none";
  });
}

/**
 * Adds edit elements to the DOM based on the `selectors` array.
 * @param {Array} selectors - The array of selectors.
 */
function addEditElements() {
  selectors.forEach((item) => {
    const { selector, text } = item;
    const editDiv = document.querySelector(`.edit.${selector}`);

    if (editDiv) {
      editDiv.style.display = "flex";

      const div = document.createElement("div");
      div.className = "title";
      editDiv.appendChild(div);

      const icon = document.createElement("div");
      icon.className = "icon";
      icon.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path id="Vector" d="M13.5229 1.68576L13.8939 2.05679C14.1821 2.34503 14.1821 2.81113 13.8939 3.0963L13.0016 3.99169L11.5879 2.57808L12.4803 1.68576C12.7685 1.39751 13.2346 1.39751 13.5198 1.68576H13.5229ZM6.43332 7.73578L10.5484 3.61759L11.9621 5.03121L7.84387 9.14633C7.75494 9.23525 7.64455 9.29964 7.52496 9.33337L5.73111 9.84546L6.2432 8.05162C6.27693 7.93203 6.34133 7.82164 6.43025 7.73271L6.43332 7.73578ZM11.4408 0.646245L5.39074 6.6932C5.12397 6.95998 4.93078 7.28808 4.82959 7.64685L3.9526 10.7133C3.879 10.9708 3.94953 11.2468 4.13965 11.4369C4.32977 11.627 4.60574 11.6976 4.86332 11.624L7.92973 10.747C8.29156 10.6427 8.61967 10.4495 8.88338 10.1858L14.9334 4.13888C15.7951 3.27722 15.7951 1.87894 14.9334 1.01728L14.5624 0.646245C13.7007 -0.215415 12.3024 -0.215415 11.4408 0.646245ZM2.69844 1.84214C1.20816 1.84214 0 3.05031 0 4.54058V12.8812C0 14.3715 1.20816 15.5796 2.69844 15.5796H11.0391C12.5293 15.5796 13.7375 14.3715 13.7375 12.8812V9.44683C13.7375 9.039 13.4094 8.71089 13.0016 8.71089C12.5937 8.71089 12.2656 9.039 12.2656 9.44683V12.8812C12.2656 13.5589 11.7167 14.1078 11.0391 14.1078H2.69844C2.02076 14.1078 1.47188 13.5589 1.47188 12.8812V4.54058C1.47188 3.86291 2.02076 3.31402 2.69844 3.31402H6.13281C6.54065 3.31402 6.86875 2.98591 6.86875 2.57808C6.86875 2.17025 6.54065 1.84214 6.13281 1.84214H2.69844Z" fill="white"/>
      </svg>`;
      const svgElement = icon.querySelector("svg");
      svgElement.querySelector("path").setAttribute("fill", item.color);

      div.appendChild(icon);

      const textElement = document.createElement("p");
      textElement.textContent = text;

      div.appendChild(textElement);

      if (item.clickHandler) {
        div.classList.add("clickable");
        div.addEventListener("click", item.clickHandler);
      }
    }
  });
}

/**
 * Resets the logout button by changing its text content to "login" and updating its href attribute to "login.html"
 * after a delay of 500 milliseconds.
 */
async function resetLogout() {
  const logout = document.querySelector("#login a");
  logout.textContent = "login";

  await new Promise((resolve) => setTimeout(resolve, 500));

  logout.href = "login.html";
}

document.addEventListener("DOMContentLoaded", (event) => {
  getData("works").then((data) => {
    createGallery(data);
  });

  if (localStorage.token) {
    const logout = document.querySelector("#login a");
    logout.href = "#";
    logout.textContent = "logout";
    addEditElements();
    const debug = document.querySelector(".debug");
    debug.textContent = "Token: " + localStorage.token;

    logout.addEventListener("click", () => {
      clearEditElements();
      resetLogout();
      debug.textContent = "";
      debug.style.display = "none";

      localStorage.removeItem("token");
    });

    const close = document.querySelector(".modal .close");
    close.addEventListener("click", () => {
      toggleModal();
    });

    const back = document.querySelector(".modal .back");
    back.addEventListener("click", () => {
      switchModal("back");
    });
  }
});
