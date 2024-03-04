// // Initiale initialise l'application en vérifiant d'abord la connexion de l'utilisateur,
// puis en récupérant les données des œuvres et des catégories depuis l'API,
// en les affichant dans l'interface utilisateur, en configurant les événements associés et en activant la modale d'envoi.
async function init() {
  connectornotconnect();

  let allinfo = await fetchinfo();

  displayallworks(allinfo);

  let allcategories = await fetchcategories();

  displaycategories(allcategories);

  listevent();

  sendmodal();
}
init();

// Pour vérifier si l'utilisateur est connecté ou pas
function connectornotconnect() {
  let token = localStorage.getItem("token");

  if (token) {
  } else {
    window.location.href = "./assets/js/index.html";
  }
}

document.getElementById("logout").addEventListener("click", function () {
  window.location.href = "./assets/js/index.html";
  localStorage.clear();
});

// Pour récuprérer les informations sur toutes les oeuvres
function fetchinfo() {
  return fetch("http://localhost:5678/api/works")
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
}

// Pour récupérer les informations sur toutes les catégories
function fetchcategories() {
  return fetch("http://localhost:5678/api/categories")
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
}

// Pour afficher toutes les oeuvres dans la galerie et dans la modale
function displayallworks(allinfo) {
  let gallery = document.querySelector(".gallery");
  let galleryModal = document.querySelector(".gallery_modal");

  gallery.innerHTML = "";
  galleryModal.innerHTML = "";

  for (const info of allinfo) {
    gallery.insertAdjacentHTML(
      "beforeend",
      `
              <figure>
                  <img src="${info.imageUrl}" alt="${info.title}">
                  <figcaption>${info.title}</figcaption>
              </figure>
          `
    );
    galleryModal.insertAdjacentHTML(
      "beforeend",
      `
          <figure class="figure">
              <img src="${info.imageUrl}" alt="${info.title}">
              <div class="trash-container">
              <i class="trash fa-solid fa-trash-can" onclick="DeleteWorks(event, ${info.id})"></i>
              </div>
          </figure>
      `
    );
  }
}

// Pour afficher toutes les catégories
function displaycategories(allinfo) {
  let categorie = document.querySelector(".categorieselect");
  categorie.innerHTML = "";
  for (const info of allinfo) {
    categorie.insertAdjacentHTML(
      "beforeend",
      `
            <option value="${info.id}">
            ${info.name}
            </option>
            `
    );
  }
}

// Pour configurer les évènements associés aux éléments de l'interface utilisateur
function listevent() {
  const modale1 = document.querySelector(".modale");
  const btnmodale = document.querySelector(".editionMode");
  const btnmodale2 = document.querySelector(".editionMode2");

  const modalback = document.querySelector(".modalback");
  const gostep1 = document.getElementById("retourstep1");
  const gostep2 = document.querySelector(".AddPhoto");
  const btnfermermodale = document.getElementById("fermermodale");
  const step1 = document.querySelector(".step1");
  const step2 = document.querySelector(".step2");

  btnmodale.addEventListener("click", (e) => {
    e.preventDefault();
    modale1.style.display = "block";
    modalback.style.display = "block";
  });

  btnmodale2.addEventListener("click", (e) => {
    e.preventDefault();
    modale1.style.display = "block";
    modalback.style.display = "block";
  });

  modalback.addEventListener("click", function () {
    modale1.style.display = "none";
    modalback.style.display = "none";
    step2.style.display = "none";
    step1.style.display = "block";
  });

  btnfermermodale.addEventListener("click", function () {
    modale1.style.display = "none";
    modalback.style.display = "none";
    step2.style.display = "none";
    step1.style.display = "block";
  });

  gostep2.addEventListener("click", function () {
    step1.style.display = "none";
    step2.style.display = "block";
  });

  gostep1.addEventListener("click", function () {
    step2.style.display = "none";
    step1.style.display = "block";
  });
}

const loadFile = function (event) {
  document.querySelector(".uploadImage").classList.add("previewImage");

  document.querySelector("#output").innerHTML =
    "<img src='" +
    URL.createObjectURL(event.target.files[0]) +
    "' alt='image' width='100%'>";

  let imagesend = document.querySelector("#ImageSend").files[0];
  this.imagesend = imagesend;
};

// Pour désactiver le bouton valider si tous les champs du formulaire ne sont pas remplis
function btndisabled() {
  let title = document.getElementById("titre").value;
  let categorie = document.getElementById("categorie").value;
  let btnsendmodal = document.getElementById("AddWork");
  this.title = title;
  this.categorie = categorie;
  if (!imagesend || !title || !categorie) {
    btnsendmodal.disabled = true;
  } else {
    btnsendmodal.disabled = false;
  }
}

// Pour supprimer une oeuvre
function DeleteWorks(event, id) {
  event.stopPropagation();
  event.preventDefault();

  let token = localStorage.getItem("token");
  let figure = event.target.closest(".figure");

  fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "*/*",
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      if (response.ok) {

        figure.remove();

        const modale1 = document.querySelector(".modale");
        const modalback = document.querySelector(".modalback");

        modale1.style.display = "none";
        modalback.style.display = "none";

        init();
      } else {
        console.log("Erreur lors de la suppression");
      }
    })
    .catch((error) => {
      console.log("Erreur lors de la tentative de suppression");
    });
}



// Pour envoyer les informations du formulaire vers l'API
function sendmodal() {
  const clickSubmitForm = document.querySelector("#addWorkForm");

  clickSubmitForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const title = document.getElementById("titre").value;
    const categorie = document.getElementById("categorie").value;
    const image = document.getElementById("ImageSend").files[0];
    let token = window.localStorage.getItem("token");

    if (!image || !title || !categorie) {
      document.getElementById("errormodal").innerText =
        "Veuillez renseigner les bonnes valeurs";
      return false;
    }

    if (image.size > 4 * 1024 * 1024) {
      document.getElementById("errormodal").innerHTML =
        "La taille de l'image dépasse 4 Mo, vérifiez la taille de votre image";
      return false;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", categorie);
    formData.append("image", image);

    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      body: formData,
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (response.status === 201) {
      const modale1 = document.querySelector(".modale");
      const modalback = document.querySelector(".modalback");

      const gostep1 = document.querySelector(".step1");
      const gostep2 = document.querySelector(".step2");

      modale1.style.display = "none";
      modalback.style.display = "none";
      
      gostep2.style.display = "none";
      gostep1.style.display = "block";

      clickSubmitForm.reset();

       // Réinitialiser l'image du form 


      init();
      
    } else {
      console.error("Erreur pour ajouter une image");
    }
  });
}
