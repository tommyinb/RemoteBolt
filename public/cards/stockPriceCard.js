$(function () {
  addMenuItem("Stock Price", 1, createStockPriceCard);
});

function createStockPriceCard() {
  const card = createCard("StockPrice", "Stock Price");
  card.addClass("stock-price");

  const main = card.find(".main");
  $(`<input class="user" name="stock" value="0001"/>`)
    .appendTo(main)
    .change(function () {
      updateServer();
    });

  $(`<div name="price">30.1</div>`).appendTo(main);

  const ports = card.find(".ports.right");
  createPort("price", "Price", "number").appendTo(ports);

  return card;
}
