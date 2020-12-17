$(function () {
  addMenuItem("Save Value", 2, createSaveValueCard);
});

function createSaveValueCard() {
  const card = createCard("SaveValue", "Save Value");
  card.addClass("save-value");

  const main = card.find(".main");
  main.append('<input class="name" value="name"/>');
  main.append('<div name="value">33.3</div>');

  const left = card.find(".ports.left");
  createPort("from", "From", "flow").appendTo(left);
  createPort("fromValue", "Value", "number").appendTo(left);

  const right = card.find(".ports.right");
  createPort("to", "Next", "flow").appendTo(right);
  createPort("toValue", "Value", "number").appendTo(right);

  return card;
}
