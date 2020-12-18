$(function () {
  addMenuItem("Save Value", 2, createSaveValueCard);
});

function createSaveValueCard() {
  const card = createCard("SaveValue", "Save Value");
  card.addClass("save-value");

  const main = card.find(".main");
  main.append('<input class="name" value="name"/>');

  const value = $('<input name="value" value="33.3"/>')
    .appendTo(main)
    .change(function () {
      updateServer();
    });

  const left = card.find(".ports.left");
  createPort("from", "From", "flow", 10).appendTo(left);

  createPort("fromValue", "Value", "number", 1)
    .appendTo(left)
    .on("linked", function () {
      value.attr("readonly", true);
    })
    .on("unlinked", function () {
      value.removeAttr("readonly");
    });

  const right = card.find(".ports.right");
  createPort("to", "Next", "flow", 10).appendTo(right);
  createPort("toValue", "Value", "number", 100).appendTo(right);

  return card;
}
