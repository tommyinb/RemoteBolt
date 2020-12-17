function createCard(type, title) {
  const id = Math.floor(Math.random() * 100000);

  const card = $(`
    <div id=${id} class="card" type="${type}" style="top: 20px; left: 20px">
      <div class="title">${title}</div>
      <div class="cross">🗙</div>
      <div class="ports left"></div>
      <div class="main"></div>
      <div class="ports right"></div>
    </div>
  `);

  card.mousedown(function () {
    card.attr("dragging", true);
  });
  card.mouseup(function () {
    card.removeAttr("dragging");
  });

  card.find(".cross").click(function () {
    card.remove();

    card.find(".port").each(function () {
      const id = $(this).attr("id");
      $(`.linkage[from="${id}"]`).remove();
      $(`.linkage[to="${id}"]`).remove();
    });

    updateServer();
  });

  return card;
}

$(function moveCards() {
  let lastPosition = { x: 0, y: 0 };

  $("body")
    .mousedown(function (e) {
      lastPosition = { x: e.clientX, y: e.clientY };
    })
    .mousemove(function (e) {
      const currentMouse = { x: e.clientX, y: e.clientY };

      const dX = currentMouse.x - lastPosition.x;
      const dY = currentMouse.y - lastPosition.y;

      $(".card[dragging]").each(function () {
        const offset = $(this).offset();
        $(this).offset({ top: offset.top + dY, left: offset.left + dX });
      });

      lastPosition = currentMouse;
    });
});
