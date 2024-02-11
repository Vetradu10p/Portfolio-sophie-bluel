async function init() {
  connectornotconnect();

  let allinfo = await fetchinfo();

  displayallworks(allinfo);

  let allcategories = await fetchcategories();

  displaycategories(allcategories);

  listevent();

  //   DeleteWorks();
  sendmodal();
}

init();

function connectornotconnect() {
  let token = localStorage.getItem("token");

  if (token) {
    console.log("le token est présent");
  } else {
    window.location.href = "./index.html";
  }
}

document.getElementById("logout").addEventListener("click", function () {
  window.location.href = "./index.html";
  localStorage.clear();
});

function fetchinfo() {
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

function displaycategories(allinfo) {
  let categorie = document.querySelector(".categorieselect");

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

  const trashIcons = document.querySelectorAll(".trash");
  trashIcons.forEach((trashIcon) => {
    trashIcon.addEventListener("click", (event) => {
      const workId = trashIcon.dataset.workId;
      DeleteWorks(event, workId);
    });
  });

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

function DeleteWorks(event, id) {
  event.stopPropagation();

  const confirmation = confirm("Confirmez vous la suppression de ce travail ?");
  let token = localStorage.getItem("token");

  if (confirmation) {
    fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Supprimé");
          init();
        } else {
          console.log("Erreur lors de la suppression");
        }
      })
      .catch((error) => {
        console.log("Erreur lors de la tentative de suppression");
      });
  }
}

let form = document.querySelector(".add");

function sendmodal() {
  form.removeEventListener("submit", submitHandler);
  form.addEventListener("submit", submitHandler);

  async function submitHandler(event) {
    event.preventDefault();

    const title = document.getElementById("titre").value;
    const categorie = document.getElementById("categorie").value;
    const image = document.getElementById("ImageSend").files[0];

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", categorie);
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (response.ok) {
        console.log("Image ajoutée");
        init();
      } else {
        console.error("Erreur pour ajouter une image");
      }
    } catch (error) {
      console.error("Erreur de la tentative pour ajouter une image:", error);
    }
  }
}
