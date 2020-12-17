$(function () {
  addMenuItem("Add Value", 2, createAddValueCard);
});

function createAddValueCard() {
  const card = createCard("AddValue", "Add Value");
  card.addClass("add-value");

  const main = card.find(".main");
  main.append('<input name="value" value="1.7"/>');

  const left = card.find(".ports.left");
  createPort("from", "Value", "number").appendTo(left);
  createPort("add", "Adder", "number").appendTo(left);

  const right = card.find(".ports.right");
  createPort("to", "Sum", "number").appendTo(right);

  return card;
}
