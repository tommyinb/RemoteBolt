$(function () {
  addMenuItem("Compare Value", 3, createCompareValueCard);
});

function createCompareValueCard() {
  const card = createCard("CompareValue", "Compare Value");
  card.addClass("compare-value");

  const main = card.find(".main");
  const inputA = $(`<input name="a" class="larger" value="33.3"/>`).appendTo(main);
  const inputB = $(`<input name="b" value="30.1"/>`).appendTo(main);

  main.find("input").change(function () {
    refresh();
    updateServer();
  });

  main.find("input").on("refresh", refresh);
  function refresh() {
    inputA.toggleClass("larger", inputA.val() > inputB.val());
    inputB.toggleClass("larger", inputB.val() > inputA.val());
  }

  const left = card.find(".ports.left");
  createPort("fromA", "A", "number", 1).appendTo(left);
  createPort("from", "From", "flow", 10).appendTo(left);
  createPort("fromB", "B", "number", 1).appendTo(left);

  const right = card.find(".ports.right");
  createPort("toA", "A Larger", "flow", 10).appendTo(right);
  createPort("to", "Equal", "flow", 10).appendTo(right);
  createPort("toB", "B Larger", "flow", 10).appendTo(right);

  return card;
}
