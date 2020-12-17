$(function () {
  addMenuItem("Sell Stock", 1, createSellStockCard);
});

function createSellStockCard() {
  const card = createCard("Sell Stock");
  card.addClass("sell-stock");

  const main = card.find(".main");
  main.append(`<input class="stock" value="0001"/>`);
  main.append(`<div class="price">30.1</div>`);

  const left = card.find(".ports.left");
  createPort("From").appendTo(left);
  createPort("Price").appendTo(left);

  const right = card.find(".ports.right");
  createPort("Success").appendTo(right);
  createPort("Failure").appendTo(right);

  return card;
}
