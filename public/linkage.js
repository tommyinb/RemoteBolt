function createLinkage(from, to) {
  const linkage = $(`<div class="linkage"></div>`);
  if (from) {
    linkage.attr("from", $(from).attr("id"));
  }
  if (to) {
    linkage.attr("to", $(to).attr("id"));
  }

  createCurve().appendTo(linkage);

  refreshLinkage(linkage);

  return linkage;
}

$(function () {
  setInterval(() => {
    $(".linkage").each(function () {
      refreshLinkage($(this));
    });
  }, 20);
});
function refreshLinkage(linkage) {
  const curve = linkage.find(".curve");

  const fromId = linkage.attr("from");
  if (fromId) {
    const from = $(`#${fromId}`);
    const fromOffset = from.offset();
    const fromWidth = from.outerWidth();
    const fromHeight = from.outerHeight();

    curve.attr("x1", fromOffset.left + fromWidth);
    curve.attr("y1", fromOffset.top + fromHeight / 2);
  }

  const toId = linkage.attr("to");
  if (toId) {
    const to = $(`#${toId}`);
    const toOffset = to.offset();
    const toHeight = to.outerHeight();

    curve.attr("x2", toOffset.left);
    curve.attr("y2", toOffset.top + toHeight / 2);
  }

  const { x, y } = redrawCurve(curve);
  linkage.offset({ left: x, top: y });
}

$(function loadRemoval() {
  const window = $(".bolt");

  window.mousemove(function (e) {
    $(".linkage").each(function () {
      const linkage = $(this);
      linkage.toggleClass("active", !linkage.attr("linking") && moused(linkage, e));
    });
  });
  function moused(linkage, e) {
    const offset = linkage.offset();

    const curve = linkage.find(".curve");
    const { x, y } = getCurvedPoint(curve, 0.5);

    return Math.abs(e.pageX - offset.left - x) <= 40 && Math.abs(e.pageY - offset.top - y) <= 40;
  }

  window.mouseup(function (e) {
    const linkages = $(".linkage").filter(function () {
      return moused($(this), e);
    });

    linkages.remove();
  });
});

$(function loadLinking() {
  const body = $("body");

  let mousePosition = { x: 0, y: 0 };
  body.mousemove(function (e) {
    mousePosition = { x: e.clientX, y: e.clientY };
  });
  setInterval(() => {
    $('.linkage[linking="from"] .curve').each(function () {
      $(this).attr("x1", mousePosition.x);
      $(this).attr("y1", mousePosition.y);
    });

    $('.linkage[linking="to"] .curve').each(function () {
      $(this).attr("x2", mousePosition.x);
      $(this).attr("y2", mousePosition.y);
    });
  }, 20);

  body.mouseup(function () {
    $(".linkage[linking]").remove();
  });
});
