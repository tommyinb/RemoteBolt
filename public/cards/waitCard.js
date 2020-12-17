function createWaitCard() {
  const card = createCard("Wait");
  card.addClass("wait");

  const main = card.find(".main");
  main.append('<input class="value" value="10s"/>');

  const left = card.find(".ports.left");
  createPort("From").appendTo(left);

  const right = card.find(".ports.right");
  createPort("Next").appendTo(right);

  return card;
}
