const apiUrl = "http://localhost:5678/api/";

async function getData(type) {
  try {
    const response = await fetch(apiUrl + type);
    if (!response.ok) {
      throw new Error("Erreur HTTP: " + response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Il y a eu un problème avec l\'opération fetch: ' + error.message);
    throw error;
  }
}

function createGallery(data) {
  const gallery = document.querySelector('.gallery');
  data.forEach(item => {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = item.imageUrl;
    img.alt = item.title;
    const figcaption = document.createElement('figcaption');
    figcaption.textContent = item.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  });
}

getData("works").then(data => {
  createGallery(data);
})
