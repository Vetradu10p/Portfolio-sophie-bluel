// Fonction  initialise l'application en récupérant les données des œuvres et des catégories depuis l'API
async function init() {
  let allworks = await Fetchinfo();

  displayallworks(allworks);

  let allcategories = await fetchcategories();

  displaycategories(allcategories);

  eventcategories();
}

init();

// Récupère toutes les informations sur les travaux
function Fetchinfo() {
  return fetch("http://localhost:5678/api/works")
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
}

// Récupère toutes les catégories des travaux
function fetchcategories() {
  return fetch("http://localhost:5678/api/categories")
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
}

// Affiche toutes les oeuvres
function displayallworks(allworks) {
  let gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  for (const info of allworks) {
    gallery.insertAdjacentHTML(
      "beforeend",
      `
          <figure>
            <img src="${info.imageUrl}" alt="${info.title}">
            <figcaption>${info.title}</figcaption>
          </figure>
          `
    );
  }
}

// Ajouter des boutons aux catégories
function displaycategories(allinfo) {
  let buttons = document.querySelector(".buttons");

  for (const info of allinfo) {
    buttons.insertAdjacentHTML(
      "beforeend",
      `
          <li>
          <button class="button" id="${info.id}">${info.name}</button>
          </li>
          `
    );
  }
}

// Configurer les évènements associés aux catégories
function eventcategories() {
  let btnall = document.querySelector(".btnall");
  let buttons = document.querySelectorAll(".button");

  btnall.addEventListener("click", async (e) => {
    let allinfo = await Fetchinfo();

    displayallworks(allinfo);

    buttons.forEach((button) => {
      button.classList.remove("selected");
    });

    btnall.querySelector("button").classList.add("selected");
  });

  for (const btn of buttons) {
    btn.addEventListener("click", async (e) => {
      deselectPreviousButton();

      let allinfo = await Fetchinfo();
      const filterarray = Object.values(allinfo).filter(
        (info) => info.categoryId == btn.id
      );

      displayallworks(filterarray);
      btn.classList.add("selected");
    });
  }

  // Pour désélectionner tous les boutons de catégorie
  function deselectPreviousButton() {
    document.querySelectorAll(".button.selected").forEach((button) => {
      button.classList.remove("selected");
    });
  }
}
