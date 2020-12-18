$(function () {
  const menu = $(".menu");

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

function addMenuItem(text, group, create) {
  const item = $(`<div class="item" group="${group}">${text}</div>`);
  item.click(function (e) {
    menu.removeClass("active");

    const card = create();
    card.appendTo(".bolt");

    card.offset({
      left: e.pageX - 50,
      top: e.pageY - 10,
    });

    updateServer();
  });

  const menu = $(".menu");
  const afters = menu.find(".item").filter(function () {
    return parseInt($(this).attr("group")) > group;
  });
  if (afters.length > 0) {
    item.insertBefore(afters.first());
  } else {
    item.appendTo(menu);
  }

  return item;
}
