$(function () {
  addMenuItem("Restart", 5, createRestartCard);
});

function createRestartCard() {
  const card = createCard("Restart", "End");
  card.addClass("restart");

  const main = card.find(".main");
  main.text("Restart");

  const ports = card.find(".ports.left");
  createPort("from", "From", "flow", 10)
    .appendTo(ports)
    .on("linkable", function (_, linkable) {
      const fromCard = linkable.port.closest(".card");
      linkable.result = !fromCard.is(".start");
    });

  return card;
}
