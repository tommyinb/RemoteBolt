$(function () {
  addMenuItem("Save Value", 2, createSaveValueCard);
});

function createSaveValueCard() {
  const card = createCard("Save Value");
  card.addClass("save-value");

  const main = card.find(".main");
  main.append('<input class="name" value="name"/>');
  main.append('<div class="value">33.3</div>');

  const left = card.find(".ports.left");
  createPort("From", "flow").appendTo(left);
  createPort("Value", "number").appendTo(left);

  const right = card.find(".ports.right");
  createPort("Next", "flow").appendTo(right);
  createPort("Value", "number").appendTo(right);

  return card;
}
