import { postData } from "./api.js";
import { updateGallery } from "./gallery.js";
import { clearModal, createModal, toggleModal } from "./modals.js";

let formState = {
  image: false,
  title: false,
  category: false,
};

export function createrModalForm(category) {
  formState = {
    image: false,
    title: false,
    category: false,
  };

  const formDiv = document.querySelector(`.form-modal`);

  const submitButton = document.getElementById("submit");
  submitButton.disabled = true;

  const form = document.createElement("form");
  form.action = "#";
  form.method = "post";
  form.innerHTML = `
    <div class="file-container">
      <div class="preview"></div>
      <div class="input">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="76"
          height="76"
          viewBox="0 0 76 76"
          fill="none"
        >
          <path
            d="M63.5517 15.8879C64.7228 15.8879 65.681 16.8461 65.681 18.0172V60.5768L65.0156 59.7118L46.9165 36.2894C46.3176 35.5042 45.3727 35.0517 44.3879 35.0517C43.4031 35.0517 42.4715 35.5042 41.8594 36.2894L30.8136 50.5824L26.7546 44.8998C26.1557 44.0614 25.1975 43.569 24.1595 43.569C23.1214 43.569 22.1632 44.0614 21.5644 44.9131L10.9178 59.8183L10.319 60.6434V60.6034V18.0172C10.319 16.8461 11.2772 15.8879 12.4483 15.8879H63.5517ZM12.4483 9.5C7.75048 9.5 3.93103 13.3195 3.93103 18.0172V60.6034C3.93103 65.3012 7.75048 69.1207 12.4483 69.1207H63.5517C68.2495 69.1207 72.069 65.3012 72.069 60.6034V18.0172C72.069 13.3195 68.2495 9.5 63.5517 9.5H12.4483ZM23.0948 35.0517C23.9337 35.0517 24.7644 34.8865 25.5394 34.5655C26.3144 34.2444 27.0186 33.7739 27.6118 33.1807C28.2049 32.5876 28.6755 31.8834 28.9965 31.1083C29.3175 30.3333 29.4828 29.5027 29.4828 28.6638C29.4828 27.8249 29.3175 26.9943 28.9965 26.2192C28.6755 25.4442 28.2049 24.74 27.6118 24.1468C27.0186 23.5537 26.3144 23.0831 25.5394 22.7621C24.7644 22.4411 23.9337 22.2759 23.0948 22.2759C22.2559 22.2759 21.4253 22.4411 20.6503 22.7621C19.8752 23.0831 19.171 23.5537 18.5779 24.1468C17.9847 24.74 17.5142 25.4442 17.1931 26.2192C16.8721 26.9943 16.7069 27.8249 16.7069 28.6638C16.7069 29.5027 16.8721 30.3333 17.1931 31.1083C17.5142 31.8834 17.9847 32.5876 18.5779 33.1807C19.171 33.7739 19.8752 34.2444 20.6503 34.5655C21.4253 34.8865 22.2559 35.0517 23.0948 35.0517Z"
            fill="#B9C5CC"
          />
        </svg>
        <label for="images">
          <span>+ Ajouter photo</span>
          <input type="file" id="images" />
        </label>
        <p>jpg, png : 4mo max</p>
      </div>
    </div>
    <div class="fields info">
      <div class="field">
        <div class="title first">
          <label for="title">Titre</label>
        </div>
        <input type="text" name="text" id="text" required />
      </div>
      <div class="field">
        <div class="title">
          <label for="category">Catégorie</label>
        </div>
        <div class="select-container">
          <select name="category" id="category" required>
            <option value=""></option>
          </select>
          <div class="select-arrow"></div>
        </div>
      </div>
    </div>
  `;

  formDiv.appendChild(form);

  const categoryList = document.querySelector("#category");
  category.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    categoryList.appendChild(option);
  });

  const images = document.getElementById("images");

  images.addEventListener("change", (event) => {
    const file = event.target.files[0];

    const fileType = file.type;
    const fileSize = file.size / 1024 ** 2;

    if (fileType !== "image/jpeg" && fileType !== "image/png") {
      alert("Invalid file type. Please upload a JPEG or PNG file.");
      return;
    }

    if (fileSize > 4) {
      alert("File size is too large. Please upload a file smaller than 4MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.alt = file.name;
      document.querySelector(".preview").appendChild(img);
    };

    reader.readAsDataURL(file);

    const input = document.querySelector(".input");
    input.style.display = "none";

    const preview = document.querySelector(".preview");
    preview.style.display = "flex";
    formState.image = true;
  });

  function updateSubmitButton() {
    const button = document.querySelector("#submitButton");
    const allFormStatesTrue = Object.values(formState).every(
      (state) => state === true
    );
    const submitButton = document.getElementById("submit");
    if (allFormStatesTrue) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  }

  const titleInput = document.getElementById("text");
  const categoryInput = document.getElementById("category");
  const image = document.getElementById("images");

  titleInput.addEventListener("input", () => {
    formState.title = titleInput.value.trim() !== "";
    updateSubmitButton();
  });

  categoryInput.addEventListener("change", () => {
    formState.category = categoryInput.value !== "";
    updateSubmitButton();
  });

  image.addEventListener("change", () => {
    formState.image = image.value !== "";
    updateSubmitButton();
  });
}

export async function addGalleryItem(event) {
  document.querySelector(".form-modal form");
  event.preventDefault();

  const image = document.querySelector("#images").files[0];
  const text = document.querySelector("#text").value;
  const category = Number(document.querySelector("#category").value);

  if (!image) {
    alert("Please select an image to upload.");
    return;
  }
  if (!text) {
    alert("Please enter a title for the image.");
    return;
  }
  if (!category) {
    alert("Please select a category for the image.");
    return;
  }

  const formData = new FormData();
  formData.append("image", image);
  formData.append("title", text);
  formData.append("category", category);
  try {
    const data = await postData("works", formData, {
      Authorization: `Bearer ${localStorage.token}`,
    });

    console.log("Image uploaded successfully");
    toggleModal();
    clearModal();
    createModal();
    updateGallery(null, "main");
  } catch (error) {
    if (error.message.includes("400")) {
      console.log("Bad request");
    } else if (error.message.includes("401")) {
      console.log("Unauthorized");
    } else if (error.message.includes("500")) {
      console.log("Internal server error");
    } else {
      console.log("Other error");
      // handle other errors
    }
  }
}
