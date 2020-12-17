function createFixedValueCard() {
  const card = createCard("Fixed Value");
  card.addClass("fixed-value");

  const main = card.find(".main");
  main.append('<input class="name" value="name"/>');
  main.append('<input class="value" value="33.3"/>');

  const right = card.find(".ports.right");
  createPort("Value").appendTo(right);

  return card;
}
