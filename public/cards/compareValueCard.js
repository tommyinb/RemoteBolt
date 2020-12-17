$(function () {
  addMenuItem("Compare Value", 3, createCompareValueCard);
});

function createCompareValueCard() {
  const card = createCard("Compare Value");
  card.addClass("compare-value");

  const main = card.find(".main");
  const inputA = $(`<input class="a larger" value="33.3"/>`).appendTo(main);
  const inputB = $(`<input class="b" value="30.1"/>`).appendTo(main);

  main.find("input").change(function () {
    inputA.toggleClass("larger", inputA.val() > inputB.val());
    inputB.toggleClass("larger", inputB.val() > inputA.val());
  });

  const left = card.find(".ports.left");
  createPort("A", "number").appendTo(left);
  createPort("From", "flow").appendTo(left);
  createPort("B", "number").appendTo(left);

  const right = card.find(".ports.right");
  createPort("A Larger", "flow").appendTo(right);
  createPort("Equal", "flow").appendTo(right);
  createPort("B Larger", "flow").appendTo(right);

  return card;
}
