const works = await fetch("http://localhost:5678/api/works");
const travaux = await works.json();

const categoriesAPI = await fetch("http://localhost:5678/api/categories");
const categories = await categoriesAPI.json();

function afficherTravaux(travaux) {
  for (let i = 0; i < travaux.length; i++) {
    const projet = travaux[i];

    const sectionFiches = document.querySelector(".gallery");

    const projetElement = document.createElement("figure");
    const imageElement = document.createElement("img");
    imageElement.src = projet.imageUrl;

    const titreElement = document.createElement("figcaption");
    titreElement.innerText = projet.name;

    sectionFiches.appendChild(projetElement);
    projetElement.appendChild(imageElement);
    projetElement.appendChild(titreElement);
  }

  const allSpace = document.createElement("button");
  const h2Element = document.createElement("h2");
  h2Element.textContent = "Tous";

  allSpace.appendChild(h2Element);

  allSpace.addEventListener("click", function () {
    const allCategory = [];

    for (let i = 0; i < travaux.length; i++) {
      const categoryId = travaux[i].category.id;

      allCategory.push(categoryId);
    }
    console.log(allCategory);
  });

  document.body.appendChild(allSpace);
}

afficherTravaux(travaux);
