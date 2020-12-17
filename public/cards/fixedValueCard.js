$(function () {
  addMenuItem("Fixed Value", 2, createFixedValueCard);
});

function createFixedValueCard() {
  const card = createCard("FixedValue", "Fixed Value");
  card.addClass("fixed-value");

  const main = card.find(".main");
  main.append('<input name="name" value="name"/>');
  main.append('<input name="value" value="33.3"/>');

  const right = card.find(".ports.right");
  createPort("value", "Value", "number").appendTo(right);

  return card;
}
