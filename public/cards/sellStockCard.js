$(function () {
  addMenuItem("Sell Stock", 1, createSellStockCard);
});

function createSellStockCard() {
  const card = createCard("SellStock", "Sell Stock");
  card.addClass("sell-stock");

  const main = card.find(".main");
  main.append(`
    <input class="user" name="stock" value="0001"/>

    <div class="price">
      <input name="price" value="30.1"/>
    </div>
  `);

  main.find("input").change(function () {
    updateServer();
  });

  const left = card.find(".ports.left");
  createPort("from", "From", "flow").appendTo(left);
  createPort("price", "Price", "number").appendTo(left);

  const right = card.find(".ports.right");
  createPort("to", "Success", "flow").appendTo(right);
  createPort("fail", "Failure", "flow").appendTo(right);

  return card;
}
