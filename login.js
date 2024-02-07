document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "http://localhost:5678/api/users/login";
  const emailInput = document.getElementById("emailLogin");
  const passwordInput = document.getElementById("passwordLogin");
  const loginButton = document.getElementById("buttonLogin");
  const feedback = document.getElementById("feedback");

  loginButton.addEventListener("click", () => {
    const userData = {
      email: emailInput.value,
      password: passwordInput.value,
    };

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.status === 200) {
          window.location.href = "./admin.html";
          return response.json();
        } else if (response.status === 401) {
          throw new Error("identifiants incorrects");
        } else if (response.status === 404) {
          throw new Error("Utilisateur non trouvé");
        } else {
          throw new Error("Erreur inatendue.");
        }
      })
      .then((data) => {
        console.log(data);

        let keyId = data.userId;
        let tokenId = data.token;

        window.localStorage.setItem("userId", keyId);
        window.localStorage.setItem("token", tokenId);

        console.log(apiUrl);

        feedback.textContent = "Connexion réussie !";
      })
      .catch((error) => {
        console.error("Erreur :", error);
        feedback.textContent = error.message;
      });
  });
});

// S0phie

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiO…jU1fQ.TU2ah-GO7UpwkoZc2deyahKX_hxUV91fyVLNMkh_dYY
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
//   .eyJ1c2VySWQiOjEsImlhdCI6MTcwNzEyNTI1NSwiZXhwIjoxNzA3MjExNjU1fQ.TU2ah -
//   GO7UpwkoZc2deyahKX_hxUV91fyVLNMkh_dYY;
