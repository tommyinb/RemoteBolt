$(function () {
  addMenuItem("Add Value", 2, createAddValueCard);
});

function createAddValueCard() {
  const card = createCard("AddValue", "Add Value");
  card.addClass("add-value");

  const main = card.find(".main");
  const value = $('<input name="value" value="1.7"/>')
    .appendTo(main)
    .change(function () {
      updateServer();
    });

  const left = card.find(".ports.left");
  createPort("from", "Value", "number", 1).appendTo(left);

  createPort("add", "Adder", "number", 1)
    .appendTo(left)
    .on("linked", function () {
      value.attr("readonly", true);
    })
    .on("unlinked", function () {
      value.removeAttr("readonly");
    });

  const right = card.find(".ports.right");
  createPort("to", "Sum", "number", 100).appendTo(right);

  return card;
}
