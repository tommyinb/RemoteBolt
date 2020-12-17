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
  createPort("From", "flow").appendTo(left);
  createPort("Price", "number").appendTo(left);

  const right = card.find(".ports.right");
  createPort("Success", "flow").appendTo(right);
  createPort("Failure", "flow").appendTo(right);

  return card;
}
