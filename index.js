async function init() {
  let allworks = await Fetchinfo();

  displayallworks(allworks);

  let allcategories = await fetchcategories();

  displaycategories(allcategories);

  eventcategories();
}

init();

function Fetchinfo() {
  return fetch("http://localhost:5678/api/works")
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
}

function fetchcategories() {
  return fetch("http://localhost:5678/api/categories")
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
}

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

function eventcategories() {
  let btnall = document.querySelector(".btnall");

  btnall.addEventListener("click", async (e) => {
    let allinfo = await Fetchinfo();

    displayallworks(allinfo);
  });

  let button = document.querySelectorAll(".button");
  for (const btn of button) {
    btn.addEventListener("click", async (e) => {
      let allinfo = await Fetchinfo();
      const filterarray = Object.values(allinfo).filter(
        (info) => info.categoryId == btn.id
      );

      displayallworks(filterarray);
    });
  }
}
