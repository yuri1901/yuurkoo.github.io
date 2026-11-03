(() => {
  const products = [
    {
      name: "Керамічна чашка",
      description: "Ручна робота для повільної ранкової кави.",
      price: "420 грн",
      image: "../Images/Palace of Kornyakt.png",
    },
    {
      name: "Постер «Львів»",
      description: "Лаконічна ілюстрація міста для вашої стіни.",
      price: "280 грн",
      image: "../Images/Black Stone Building.png",
    },
    {
      name: "Текстильний шопер",
      description: "Містка торба для щоденних міських маршрутів.",
      price: "360 грн",
      image: "../Images/City Arsenal.png",
    },
    {
      name: "Вінтажна листівка",
      description: "Маленький паперовий спогад із великою історією.",
      price: "95 грн",
      image: "../Images/Gunpowder Tower.png",
    },
    {
      name: "Нотатник мандрівника",
      description: "Папір для маршрутів, думок і нових адрес.",
      price: "240 грн",
      image: "../Images/Palace of Potockys.png",
    },
    {
      name: "Свічка «Вечір»",
      description: "Тепле світло, яке нагадує про старе місто.",
      price: "310 грн",
      image: "../Images/Bernadine Church.png",
    },
  ];

  const perPage = 3;
  let currentPage = 1;
  const productGrid = document.querySelector("#productGrid");
  const pagination = document.querySelector("#pagination");
  const totalPages = Math.ceil(products.length / perPage);

  function renderProducts(page) {
    const start = (page - 1) * perPage;
    const visibleProducts = products.slice(start, start + perPage);
    productGrid.innerHTML = visibleProducts
      .map(
        (product) => `
      <div class="col-md-6 col-lg-4">
        <article class="product-card d-flex flex-column">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <div class="card-body d-flex flex-column flex-grow-1">
            <h3 class="card-title">${product.name}</h3>
            <p class="card-text">${product.description}</p>
            <div class="d-flex align-items-center justify-content-between gap-3 mt-auto">
              <span class="product-price">${product.price}</span>
              <button type="button" class="btn btn-outline-success btn-sm" data-product="${product.name}">Обрати</button>
            </div>
          </div>
        </article>
      </div>
    `,
      )
      .join("");
    document.querySelector("#currentPageLabel").textContent = page;
    document.querySelector("#totalPagesLabel").textContent = totalPages;
    renderPagination();
  }

  function renderPagination() {
    pagination.innerHTML = `
      <li class="page-item ${currentPage === 1 ? "disabled" : ""}"><button class="page-link" type="button" data-page="${currentPage - 1}" aria-label="Попередня сторінка">‹</button></li>
      ${Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        return `<li class="page-item ${page === currentPage ? "active" : ""}"><button class="page-link" type="button" data-page="${page}" ${page === currentPage ? 'aria-current="page"' : ""}>${page}</button></li>`;
      }).join("")}
      <li class="page-item ${currentPage === totalPages ? "disabled" : ""}"><button class="page-link" type="button" data-page="${currentPage + 1}" aria-label="Наступна сторінка">›</button></li>
    `;
  }

  pagination.addEventListener("click", (event) => {
    const button = event.target.closest("[data-page]");
    if (!button || button.parentElement.classList.contains("disabled")) return;
    currentPage = Number(button.dataset.page);
    renderProducts(currentPage);
    document.querySelector("#catalog").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  productGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-product]");
    if (!button) return;
    button.textContent = "Додано ✓";
    button.classList.replace("btn-outline-success", "btn-success");
  });

  document.querySelector("#feedbackForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    form.classList.add("was-validated");
    const fields = [...form.querySelectorAll("input, select, textarea")];
    fields.forEach((field) => {
      field.classList.toggle("is-valid", field.checkValidity());
      field.classList.toggle("is-invalid", !field.checkValidity());
    });
    const status = document.querySelector("#formStatus");
    if (!form.checkValidity()) {
      status.textContent = "Перевірте, будь ласка, заповнення полів.";
      return;
    }
    status.textContent = "Дякуємо! Повідомлення підготовлено до відправлення.";
  });

  renderProducts(currentPage);
})();
