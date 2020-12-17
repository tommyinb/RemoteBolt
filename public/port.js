function createPort(text) {
  const port = $(`<div id=${Math.floor(Math.random() * 100000)} class="port">${text}</div>`);

  port.mousedown(function () {
    const ports = port.closest(".ports");

    const linkings = $(".linkage[linking]");
    const linking = linkings.attr("linking");
    if (linking) {
      const card = ports.closest(".card");

      const startId = linkings.attr("from") || linkings.attr("to");
      const startPort = $(`#${startId}`);
      const startCard = startPort.closest(".card");
      if (startCard.is(card)) {
        linkings.remove();
      } else {
        switch (linking) {
          case "to":
            if (ports.is(".left")) {
              const id = port.attr("id");
              linkings.attr("to", id);

              linkings.removeAttr("linking");
            } else {
              linkings.remove();
            }
            break;

          case "from":
            if (ports.is(".right")) {
              const id = port.attr("id");
              linkings.attr("from", id);

              linkings.removeAttr("linking");
            } else {
              linkings.remove();
            }
            break;
        }
      }
    } else {
      if (ports.is(".left")) {
        const linkage = createLinkage(undefined, port);
        linkage.appendTo(".bolt");

        const id = Math.floor(Math.random() * 10000);
        linkage.attr("id", id);

        linkage.attr("linking", "from");
      } else {
        const linkage = createLinkage(port);
        linkage.appendTo(".bolt");

        const id = Math.floor(Math.random() * 10000);
        linkage.attr("id", id);

        linkage.attr("linking", "to");
      }
    }

    return false;
  });

  port.mouseup(function () {
    return false;
  });

  return port;
}

function findToPort(fromPort) {
  const fromId = fromPort.attr("id");

  const linkage = $(`.linkage[from="${fromId}"]`);
  if (linkage.length <= 0) {
    return undefined;
  }

  const toId = linkage.attr("to");
  if (!toId) {
    return undefined;
  }

  return $(`#${toId}`);
}
