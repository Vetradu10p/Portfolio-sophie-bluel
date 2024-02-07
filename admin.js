async function init() {
  connectornotconnect();

  let allinfo = await fetchinfo();

  displayallworks(allinfo);

  // pareille pour catégory

  listevent();

  //sendmodal();
}

init();

function connectornotconnect() {
  // on va chercher le token dans le localstorage
  // on le test si pas bon redirection page accueil.
}

function listevent() {
  const modal = document.querySelector(".modal");
  const btnAddPhoto = document.querySelector(".addPhoto");

  btnAddPhoto.addEventListener("click", ajouterPhoto);

  const btnappearmodal = document.querySelectorAll(".editionMode");

  btnappearmodal.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      modal.style.display = "block";
      document.addEventListener("click", closeModal);
    });
  });
}

function closeModal(event) {
  const modal = document.querySelector(".modal");
  const addPhotoButton = document.querySelector(".addPhoto");

  if (
    !modal.contains(event.target) &&
    !event.target.closest(".editionMode") &&
    event.target !== addPhotoButton
  ) {
    modal.style.display = "none";
    document.removeEventListener("click", closeModal);
  }
}

function fetchinfo() {
  return fetch("http://localhost:5678/api/works")
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
}

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
            <i class="trash fa-solid fa-trash-can" onclick="supprimerTravail(event, ${info.id})"></i>
            </div>
        </figure>
    `
    );
  }
}

function formAjouterPhoto() {
  const formulaireImage = document.createElement("div");
  formulaireImage.className = "formulaire";
  formulaireImage.innerHTML = `
        <h2>Ajout photo</h2>

        <form action="/upload" method="post" enctype="multipart/form-data">
        <label for="imageUpload">+ Ajouter photo</label>
        <input type= "file" id="imageUpload" name="imageUpload" accept=".jpg, .jpeg, .png" required>

        <label for="title">Titre</label>
        <input type="text" id="title" name="title" required>

        <label for="category">Catégorie</label>
        <input type="text" id="category" name="category" required>

        <input type="submit" value="Valider">
        </form>
        `;

  return formulaireImage;
}

function ajouterPhoto(event) {
  event.preventDefault();
  event.stopPropagation();

  console.log("Ajouter une photo clicked");

  const galleryModal = document.querySelector(".gallery_modal");
  const containerModal = document.querySelector(".container_modal_footer");
  const hrELement = document.querySelector(".modal hr");

  const formulaire = formAjouterPhoto();

  galleryModal.innerHTML = "";

  if (hrELement) {
    hrELement.remove();
  }

  if (containerModal) {
    containerModal.remove();
  }

  galleryModal.appendChild(formulaire);
}
