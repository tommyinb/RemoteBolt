$(function () {
  addMenuItem("Wait", 4, createWaitCard);
});

function createWaitCard() {
  const card = createCard("Wait", "Wait");
  card.addClass("wait");

  const main = card.find(".main");
  $('<input class="time" name="time" value="10"/>')
    .appendTo(main)
    .change(function () {
      updateServer();
    });

  const left = card.find(".ports.left");
  createPort("from", "From", "flow", 10).appendTo(left);

  const right = card.find(".ports.right");
  createPort("to", "Next", "flow", 10).appendTo(right);

  return card;
}
