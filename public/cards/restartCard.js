function createRestartCard() {
  const card = createCard("End");
  card.addClass("restart");

  const main = card.find(".main");
  main.text("Restart");

  const ports = card.find(".ports.left");
  createPort("From").appendTo(ports);

  return card;
}
