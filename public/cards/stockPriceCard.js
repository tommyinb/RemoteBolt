$(function () {
  addMenuItem("Stock Price", 1, createStockPriceCard);
});

function createStockPriceCard() {
  const card = createCard("Stock Price");
  card.addClass("stock-price");

  const main = card.find(".main");
  main.append(`<input class="stock" value="0001"/>`);
  $(`<div class="price">30.1</div>`).appendTo(main);

  const ports = card.find(".ports.right");
  createPort("Price", "number").appendTo(ports);

  return card;
}
