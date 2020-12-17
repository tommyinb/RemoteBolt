$(function () {
  addMenuItem("Wait", 4, createWaitCard);
});

function createWaitCard() {
  const card = createCard("Wait");
  card.addClass("wait");

  const main = card.find(".main");
  main.append('<input class="value" value="10s"/>');

  const left = card.find(".ports.left");
  createPort("From", "flow").appendTo(left);

  const right = card.find(".ports.right");
  createPort("Next", "flow").appendTo(right);

  return card;
}
