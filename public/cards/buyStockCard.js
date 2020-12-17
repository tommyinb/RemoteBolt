$(function () {
  addMenuItem("Buy Stock", 1, createBuyStockCard);
});

function createBuyStockCard() {
  const card = createCard("Buy Stock");
  card.addClass("buy-stock");

  const main = card.find(".main");
  main.append(`<input class="stock" name="stock" value="0001"/>`);

  const priceText = $(`<div class="price" name="price">30.1</div>`).appendTo(main);

  const left = card.find(".ports.left");

  const from = createPort("From").appendTo(left);
  from.on("in", function () {
    card.addClass("active");
  });

  const pricePort = createPort("Price").appendTo(left);
  pricePort.on("in", function (_, price) {
    priceText.text(price);
  });

  const right = card.find(".ports.right");
  createPort("Success").appendTo(right);
  createPort("Failure").appendTo(right);

  return card;
}
