$(function () {
  addMenuItem("Stock Price", 1, createStockPriceCard);
});

function createStockPriceCard() {
  const card = createCard("Stock Price");
  card.addClass("stock-price");

  const main = card.find(".main");
  main.append(`<input class="stock" value="0001"/>`);

  const priceText = $(`<div class="price">30.1</div>`).appendTo(main);

  const ports = card.find(".ports.right");
  const pricePort = createPort("Price").appendTo(ports);

  setInterval(() => {
    const toPort = findToPort(pricePort);
    const price = parseFloat(priceText.text());
    toPort?.trigger("in", price);
  }, 1000);

  return card;
}
