function createStartCard() {
  const card = createCard("Start", "Start");
  card.addClass("start");

  const main = card.find(".main");
  main.text("Entry");

  const ports = card.find(".ports.right");
  createPort("to", "Next", "flow", 10).appendTo(ports);

  return card;
}
