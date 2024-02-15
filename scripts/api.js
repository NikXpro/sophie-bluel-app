const apiUrl = "http://localhost:5678/api/";

export async function getData(type) {
  try {
    const response = await fetch(apiUrl + type);
    if (!response.ok) {
      throw new Error("Erreur HTTP: " + response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      "Il y a eu un problème avec l'opération fetch: " + error.message
    );
    throw error;
  }
}

export async function postData(type = "", data = {}) {
  const response = await fetch(apiUrl + type, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erreur HTTP: " + response.status);
  }

  return response.json();
}
