let cars = [
  { id: 1, title: "Turbo", price: 500, img: "./assets/img/1048313.png" },
  { id: 2, title: "Fury", price: 1000, img: "./assets/img/1048315.png" },
  { id: 3, title: "Fenix", price: 1500, img: "./assets/img/1048320.png" },
];

const toHTML = (car) => `
    <div class="col">
        <div class="card">
            <img src="${car.img}" alt="${car.title}" class="card-img-top" style="height: 300px;" />
            <div class="card-body">
                <h5 class="card-title">${car.title}</h5>
                <a href="#" class="btn btn-primary" data-btn="price" data-id="${car.id}">Посмотреть цену</a>
                <a href="#" class="btn btn-danger" data-btn="remove" data-id="${car.id}">Удалить</a>
            </div>
          </div>
    </div>
    `;

function render() {
  const html = cars.map(toHTML).join("");
  document.querySelector("#cars").innerHTML = html;
}

render();

const priceModal = $.modal({
  title: "Стоимость",
  closable: true,
  width: "400px",
  footerButtons: [
    {
      text: "Закрыть",
      type: "primary",
      handler() {
        priceModal.close();
      },
    },
  ],
});

document.addEventListener("click", (event) => {
  event.preventDefault(); // чтобы не появлялся хэш в конце url
  const btnType = event.target.dataset.btn;
  const id = +event.target.dataset.id; //+ для преобразования строки в число
  const car = cars.find((car) => car.id === id);

  if (btnType === "price") {
    priceModal.setContent(`
        <p>Цена на ${car.title}: <strong>${car.price}</strong></p>
        `);
    priceModal.open();
    console.log(id);
  } else if (btnType === "remove") {
    $.confirm({
      title: "Вы уверены?",
      content: `<p>Вы удаляете машину: <strong>${car.title}</strong></p>`,
    })
      .then(() => {
        cars = cars.filter((car) => car.id !== id);
        render();
      })
      .catch(() => console.log("cancel"));
  }
});
