$(function () {
  addMenuItem("Add Value", 2, createAddValueCard);
});

function createAddValueCard() {
  const card = createCard("Add Value");
  card.addClass("add-value");

  const main = card.find(".main");
  main.append('<input class="value" value="1.7"/>');

  const left = card.find(".ports.left");
  createPort("Value", "number").appendTo(left);
  createPort("Adder", "number").appendTo(left);

  const right = card.find(".ports.right");
  createPort("Sum", "number").appendTo(right);

  return card;
}
