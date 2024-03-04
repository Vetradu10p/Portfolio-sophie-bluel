// La fonction est éxécutée quand le DOm est complètement chargé
document.addEventListener("DOMContentLoaded", () => {
  // API pour la connexion des utilisateurs
  const apiUrl = "http://localhost:5678/api/users/login";

  // Récupération des éléments du formulaire de connexion
  const emailInput = document.getElementById("emailLogin");
  const passwordInput = document.getElementById("passwordLogin");
  const loginButton = document.getElementById("buttonLogin");
  const feedback = document.getElementById("feedback");

  loginButton.addEventListener("click", () => {
    const userData = {
      email: emailInput.value,
      password: passwordInput.value,
    };

    // Envoie les informations d'identification à l'API pour vérification
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        // Gestion des différentes réponses de l'API.
        if (response.status === 200) {
          window.location.href = "./admin.html";
          return response.json();
        } else if (response.status === 401) {
          throw new Error("Identifiants incorrects");
        } else if (response.status === 404) {
          throw new Error("Utilisateur non trouvé");
        } else {
          throw new Error("Erreur inatendue.");
        }
      })
      .then((data) => {
        let keyId = data.userId;
        let tokenId = data.token;

        window.localStorage.setItem("userId", keyId);
        window.localStorage.setItem("token", tokenId);

        // Affichaeg du feedback
        feedback.textContent = "Connexion réussie !";
      })
      .catch((error) => {
        console.error("Erreur :", error);
        feedback.textContent = error.message;
      });
  });
});
