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

getData("categories").then(data => {
  const categoryList = document.querySelector('.category');
  data.forEach(category => {
    const li = document.createElement('li');
    li.textContent = category.name;
    li.id = category.id;
    categoryList.appendChild(li);
  });

  const categoryElements = document.querySelectorAll('.category li');

  categoryElements.forEach(category => {
    category.addEventListener('click', (event) => {

      const selectedCategory = Number(event.target.id);
      
      const gallery = document.querySelector('.gallery');
      gallery.innerHTML = '';

      getData("works").then(data => {

        categoryElements.forEach(cat => {
          cat.classList.remove('active');
        });

        event.target.classList.add('active');
        
        if (selectedCategory === 0) {
          createGallery(data);
          return;
        }

        createGallery(data.filter(item => item.category.id === selectedCategory));
      });      
    });

  });
})

getData("works").then(data => {
  createGallery(data);
})
