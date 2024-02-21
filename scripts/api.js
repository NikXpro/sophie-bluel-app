const apiUrl = "http://localhost:5678/api/";

/**
 * Makes an asynchronous HTTP request to an API endpoint and returns the response data.
 * @param {string} type - The type of data to fetch from the API.
 * @returns {Promise<object>} - The response data from the API.
 * @throws {Error} - If there is an HTTP error or an error with the fetch operation.
 */
export async function getData(type = "") {
  try {
    const response = await fetch(apiUrl + type);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(
      `There was a problem with the fetch operation: ${error.message}`
    );
    throw error;
  }
}

/**
 * Sends a POST request to a specified API endpoint with the provided data.
 * @param {string} type - The API endpoint type.
 * @param {object} data - The data to be sent in the request body.
 * @returns {Promise<object>} - A Promise that resolves to the JSON response from the API.
 */
export async function postData(
  type = "",
  data = {},
  headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.token}`,
  }
) {
  try {
    const response = await fetch(apiUrl + type, {
      method: "POST",
      headers: headers,
      body: data,
    });

    if (!response.ok) {
      throw new Error("HTTP Error: " + response.status);
    }

    return response.json();
  } catch (error) {
    throw new Error(
      "An error occurred while making the POST request: " + error.message
    );
  }
}

/**
 * Sends a DELETE request to a specified API endpoint with the provided token.
 * @param {string} type - The API endpoint type.
 * @param {string} token - The token to be included in the request headers.
 * @returns {Promise<object>} - A Promise that resolves to the JSON response from the API.
 */
export async function deleteData(type = "") {
  try {
    const response = await fetch(apiUrl + type, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    });

    if (!response.ok) {
      throw new Error("HTTP Error: " + response.status);
    }

    return response.json();
  } catch (error) {
    throw new Error(
      "An error occurred while making the DELETE request: " + error.message
    );
  }
}
