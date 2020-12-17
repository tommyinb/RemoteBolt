function createAddValueCard() {
  const card = createCard("Add Value");
  card.addClass("add-value");

  const main = card.find(".main");
  main.append('<input class="name" value="name"/>');
  main.append('<input class="value" value="1.7"/>');

  const left = card.find(".ports.left");
  createPort("Value").appendTo(left);

  const right = card.find(".ports.right");
  createPort("Added").appendTo(right);

  return card;
}
