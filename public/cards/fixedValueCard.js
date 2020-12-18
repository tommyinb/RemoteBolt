$(function () {
  addMenuItem("Fixed Value", 1, createFixedValueCard);
});

function createFixedValueCard() {
  const card = createCard("FixedValue", "Fixed Value");
  card.addClass("fixed-value");

  const main = card.find(".main");
  main.append('<input name="name" value="name"/>');

  $('<input name="value" value="33.3"/>')
    .appendTo(main)
    .change(function () {
      updateServer();
    });

  const right = card.find(".ports.right");
  createPort("value", "Value", "number", 100).appendTo(right);

  return card;
}
