const works = await fetch("http://localhost:5678/api/works");
const travaux = await works.json();

const categoriesAPI = await fetch("http://localhost:5678/api/categories");
const categories = await categoriesAPI.json();

// Création div pour contenir les boutons
const premierElement = document.querySelector(".title");
const dernierElement = document.querySelector(".gallery");

const divElement = document.createElement("div");
divElement.className = "container";

premierElement.parentNode.insertBefore(divElement, dernierElement);

// Afficher travaux
const sectionFiches = document.querySelector(".gallery");
const portfolioElement = document.querySelector(".gallery");

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
  }
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

// Connexion
document.addEventListener("DOMContentLoaded", function () {
  const identifiants = window.localStorage.getItem("userId");
  const password = window.localStorage.getItem("token");

  function connexion(identifiants, password) {
    let status;

    if (identifiants != "" && password != "") {
      status = "connected";
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

// Modal + Formulaire
