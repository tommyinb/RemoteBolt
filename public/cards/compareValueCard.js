function createCompareValueCard() {
  const card = createCard("Compare Value");
  card.addClass("compare-value");

  const main = card.find(".main");
  main.append(`<div class="a larger">33.3</div>`);
  main.append(`<div class="b">30.1</div>`);

  const left = card.find(".ports.left");
  createPort("A").appendTo(left);
  createPort("From").appendTo(left);
  createPort("B").appendTo(left);

  const right = card.find(".ports.right");
  createPort("A Larger").appendTo(right);
  createPort("Equal").appendTo(right);
  createPort("B Larger").appendTo(right);

  return card;
}
