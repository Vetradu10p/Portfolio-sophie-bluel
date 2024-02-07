const works = await fetch("http://localhost:5678/api/works");
const travaux = await works.json();

const categoriesAPI = await fetch("http://localhost:5678/api/categories");
const categories = await categoriesAPI.json();

// Création div pour contenir les boutons
const premierElement = document.querySelector(".title");
const dernierElement = document.querySelector(".gallery");

const divElement = document.createElement("div");
divElement.className = "container";

// premierElement.parentNode.insertBefore(divElement, dernierElement);
dernierElement.insertAdjacentElement("beforebegin", divElement);

// Afficher travaux
const sectionFiches = document.querySelector(".gallery");
const portfolioElement = document.querySelector(".gallery");
const modalImageElement = document.querySelector(".gallery_modal");

function afficherTravaux(travaux) {
  for (let i = 0; i < travaux.length; i++) {
    const projetElement = document.createElement("figure");
    const imageElement = document.createElement("img");
    imageElement.src = travaux[i].imageUrl;
    const titreElement = document.createElement("figcaption");
    titreElement.innerText = travaux[i].title;

    projetElement.appendChild(imageElement);
    projetElement.appendChild(titreElement);
    sectionFiches.appendChild(projetElement);

    afficherTravauxModal(imageElement);
  }

  const modalFooter = document.querySelector(".modal_footer");
  const ajouterPhotoBouton = document.createElement("button");
  ajouterPhotoBouton.textContent = "Ajouter une photo";

  ajouterPhotoBouton.addEventListener("click", () => {
    modalFooter.appendChild(ajouterPhotoBouton);
    formulaireImage();
  });

  modalFooter.appendChild(ajouterPhotoBouton);
}

function afficherTravauxModal(image) {
  const modalImageElement = document.querySelector(".gallery_modal");
  const imageModal = image.cloneNode(true);

  const iconContainer = document.createElement("div");
  iconContainer.classList.add("icon-container");
  iconContainer.style.position = "absolute";
  iconContainer.style.top = "0";
  iconContainer.style.right = "0";

  const trashIcon = document.createElement("img");
  trashIcon.src = "./assets/icons/trash.svg";
  trashIcon.alt = "icon trash";
  trashIcon.style.width = "20px";

  iconContainer.appendChild(trashIcon);

  const containerIconImage = document.createElement("div");
  containerIconImage.classList.add("image-container");
  containerIconImage.style.position = "relative";
  containerIconImage.style.display = "inline-block";

  containerIconImage.appendChild(imageModal);
  containerIconImage.appendChild(iconContainer);

  modalImageElement.appendChild(containerIconImage);
}

afficherTravaux(travaux);

//  Création bouton "Tous"
const allSpace = document.createElement("button");
allSpace.textContent = "Tous";

//  Fonction Trier "Tous"
allSpace.addEventListener("click", () => {
  sectionFiches.innerHTML = "";
  afficherTravaux(travaux);
});

// Création trier "Objets"
const objectButtonElement = document.createElement("button");
objectButtonElement.textContent = categories[0].name;

//  Fonction trier "Objets"
objectButtonElement.addEventListener("click", () => {
  sectionFiches.innerHTML = "";
  const filterObjects = travaux.filter(function (travaux) {
    return travaux.category.id === categories[0].id;
  });
  afficherTravaux(filterObjects);
});

//   Création bouton "Appartements"
const appartmentsSpace = document.createElement("button");
appartmentsSpace.textContent = categories[1].name;

//  Fonction trier "Appartement"
appartmentsSpace.addEventListener("click", () => {
  sectionFiches.innerHTML = "";
  const filteredAppartements = travaux.filter(function (travaux) {
    return travaux.category.id === categories[1].id;
  });
  afficherTravaux(filteredAppartements);
});

//  Création bouton "Hôtels & restaurants"
const hostelsSpace = document.createElement("button");
hostelsSpace.textContent = categories[2].name;

hostelsSpace.addEventListener("click", () => {
  sectionFiches.innerHTML = "";
  const filteredHostel = travaux.filter(function (travaux) {
    return travaux.category.id === categories[2].id;
  });
  afficherTravaux(filteredHostel);
});

// Affichage bouttons
document.querySelector(".container").appendChild(allSpace);
document.querySelector(".container").appendChild(objectButtonElement);
document.querySelector(".container").appendChild(appartmentsSpace);
document.querySelector(".container").appendChild(hostelsSpace);

// Selection boutons cliqué
const buttons = document.querySelectorAll("button");
function clickedButton(event) {
  buttons.forEach((button) => {
    button.classList.remove("selected");
  });
  event.target.classList.add("selected");
}
buttons.forEach((button) => {
  button.addEventListener("click", clickedButton);
});

function ajouterImage(imageUrl) {
  const nouvelleImage = document.createElement("img");
  nouvelleImage.src = imageUrl;

  const sectionFiches = document.querySelector(".gallery");
  sectionFiches.appendChild(nouvelleImage);
}
// Connexion
document.addEventListener("DOMContentLoaded", function () {
  const identifiants = window.localStorage.getItem("userId");
  const password = window.localStorage.getItem("token");

  function connexion(identifiants, password) {
    let status;

    if (identifiants != "" && password != "") {
      status = "connected";
      console.log(password);
    } else {
      status = "not connected";
    }
    const navbar = document.getElementById("navbar");

    if (status == "connected") {
      navbar.style.display = "block";
    } else {
      null;
    }
  }
});

function formulaireImage() {
  const galleryModal = document.querySelector(".gallery_modal");
  galleryModal.innerHTML = "";

  const formulaire = document.createElement("form");
  formulaire.enctype = "multipart/form-data";

  const inputFichier = document.createElement("input");
  inputFichier.type = "file";
  inputFichier.accept = "image/*";

  const inputTitre = document.createElement("input");
  inputTitre.type = "text";
  inputTitre.placeholder = "Titre";
  inputTitre.name = "titre";

  const inputCategorie = document.createElement("input");
  inputCategorie.type = "text";
  inputCategorie.placeholder = "Catégorie";
  inputCategorie.name = "categories";

  const boutonAjouter = document.createElement("button");
  boutonAjouter.textContent = "Valider";

  formulaire.appendChild(inputFichier);
  formulaire.appendChild(inputTitre);
  formulaire.appendChild(inputCategorie);
  formulaire.appendChild(boutonAjouter);

  galleryModal.appendChild(formulaire);

  boutonAjouter.addEventListener("click", async (event) => {
    event.preventDefault();
    const fichier = inputFichier.files[0];
    const titre = inputTitre.value;
    const categorie = inputCategorie.value;

    if (titre && categorie && fichier) {
      const formData = new FormData();
      formData.append("image", fichier);
      formData.append("titre", titre);
      formData.append("categorie", categorie);

      try {
        const response = await fetch("http://localhost:5678/api/works", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          console.log("Image téléchargée");
        } else {
          console.log(
            "Erreur de téléchargement de l'image: ",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Erreur lors du téléchargement de l'image: ", error);
      }
    }
  });
}
