const works = await fetch("http://localhost:5678/api/works");
const travaux = await works.json();

const categoriesAPI = await fetch("http://localhost:5678/api/categories");
const categories = await categoriesAPI.json();

const portfolioElement = document.querySelector("#portfolio");

function afficherTravaux(travaux) {
  for (let i = 0; i < travaux.length; i++) {
    const projet = travaux[i];

    const sectionFiches = document.querySelector(".gallery");
    const projetElement = document.createElement("figure");
    const imageElement = document.createElement("img");
    imageElement.src = projet.imageUrl;
    const titreElement = document.createElement("figcaption");
    titreElement.innerText = projet.title;

    sectionFiches.appendChild(projetElement);
    projetElement.appendChild(imageElement);
    projetElement.appendChild(titreElement);
  }
}

//  Création bouton "Tous"
const allSpace = document.createElement("button");
allSpace.textContent = "Tous";

//  Fonction Trier "Tous"
allSpace.addEventListener("click", () => {
  portfolioElement.innerHTML = "";
  afficherTravaux(allSpace);
});

// Création trier "Objets"
const objectButtonElement = document.createElement("button");
objectButtonElement.textContent = categories[0].name;

//  Fonction trier "Objets"
objectButtonElement.addEventListener("click", () => {
  portfolioElement.innerHTML = "";
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
  portfolioElement.innerHTML = "";
  const filteredAppartements = travaux.filter(function (travaux) {
    return travaux.category.id === categories[1].id;
  });
  afficherTravaux(filteredAppartements);
});

//   Création bouton "Hôtels & restaurants"
const hostelsSpace = document.createElement("button");
hostelsSpace.textContent = categories[2].name;

hostelsSpace.addEventListener("click", () => {
  portfolioElement.innerHTML = "";
  const filteredHostel = travaux.filter(function (travaux) {
    return travaux.category.id === categories[2].id;
  });
  afficherTravaux(filteredHostel);
});

// Affichage boutton "Tous"
document.querySelector("#portfolio").appendChild(allSpace);
document.querySelector("#portfolio").appendChild(objectButtonElement);
document.querySelector("#portfolio").appendChild(appartmentsSpace);
document.querySelector("#portfolio").appendChild(hostelsSpace);
