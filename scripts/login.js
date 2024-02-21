import { postData } from "./api.js";

document
  .querySelector(".login form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    document.querySelector(".err-email").style.display = "none";
    document.querySelector(".err-password").style.display = "none";

    try {
      const data = await postData(
        "users/login",
        JSON.stringify({
          email: email,
          password: password,
        })
      );
      localStorage.setItem("id", data.userId);
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    } catch (error) {
      if (error.message.includes("404")) {
        console.log("User not found");
        document.querySelector(".err-email").style.display = "flex";
      } else if (error.message.includes("401")) {
        console.log("Password incorrect");
        document.querySelector(".err-password").style.display = "flex";
      } else {
        // handle other errors
      }
    }
  });
