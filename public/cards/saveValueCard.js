function createSaveValueCard() {
  const card = createCard("Save Value");
  card.addClass("save-value");

  const main = card.find(".main");
  main.append('<input class="name" value="name"/>');
  main.append('<div class="value">33.3</div>');

  const left = card.find(".ports.left");
  createPort("From").appendTo(left);
  createPort("Value").appendTo(left);

  const right = card.find(".ports.right");
  createPort("Next").appendTo(right);
  createPort("Value").appendTo(right);

  return card;
}
