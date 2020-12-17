$(function () {
  const menu = $(".menu");

  const window = $(".bolt");
  function addItem(text, create) {
    const item = $(`<div class="item">${text}</div>`);
    item.click(function () {
      menu.removeClass("active");

      const card = create();
      card.appendTo(window);

      updateServer();
    });

    item.appendTo(menu);

    return item;
  }

  addItem("Compare Value", createCompareValueCard);
  addItem("Save Value", createSaveValueCard);
  addItem("Add Value", createAddValueCard);
  addItem("Fixed Value", createFixedValueCard);
  addItem("Wait", createWaitCard);
  addItem("Restart", createRestartCard);

  const body = $("body");
  body.dblclick(function (e) {
    menu.addClass("active");

    menu.offset({
      left: e.clientX,
      top: e.clientY,
    });
  });
  body.mouseup(function (e) {
    if (menu.hasClass("active")) {
      menu.removeClass("active");

      e.preventDefault();
      return false;
    }
  });
});
