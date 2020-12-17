$(function () {
  addMenuItem("Wait", 4, createWaitCard);
});

function createWaitCard() {
  const card = createCard("Wait", "Wait");
  card.addClass("wait");

  const main = card.find(".main");
  $('<input class="time" name="time" value="10s"/>')
    .appendTo(main)
    .change(function () {
      updateServer();
    });

  const left = card.find(".ports.left");
  createPort("From", "flow").appendTo(left);

  const right = card.find(".ports.right");
  createPort("Next", "flow").appendTo(right);

  return card;
}
