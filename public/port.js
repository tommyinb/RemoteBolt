function createPort(text, type) {
  const port = $(`<div id=${Math.floor(Math.random() * 100000)} class="port">${text}</div>`);

  if (type) {
    port.attr("type", type);
  }

  port.mousedown(function () {
    const ports = port.closest(".ports");

    const linkings = $(".linkage[linking]");
    if (linkings.length > 0) {
      (function completeLinkage() {
        const startId = linkings.attr("from") || linkings.attr("to");
        const startPort = $(`#${startId}`);

        const linking = linkings.attr("linking");
        const linkable = (function linkable() {
          if (linking === "from") {
            if (!ports.is(".right")) {
              return false;
            }
          } else {
            if (!ports.is(".left")) {
              return false;
            }
          }

          if (type) {
            const startType = startPort.attr("type");
            if (startType) {
              if (startType !== type) {
                return false;
              }
            }
          }

          const startCard = startPort.closest(".card");
          const endCard = ports.closest(".card");
          if (startCard.is(endCard)) {
            return false;
          }

          const startLinkable = { port: port, result: true };
          startPort.trigger("linkable", [startLinkable]);

          const endLinkable = { port: startPort, result: true };
          port.trigger("linkable", endLinkable);

          return startLinkable.result && endLinkable.result;
        })();

        if (linkable) {
          const id = port.attr("id");
          linkings.attr(linking, id);

          linkings.removeAttr("linking");
        } else {
          linkings.remove();
        }

        startPort.removeClass("linking");
      })();
    } else {
      (function startLinkage() {
        const left = ports.is(".left");

        const linkage = createLinkage(left ? undefined : port, left ? port : undefined);
        linkage.appendTo(".bolt");

        const id = Math.floor(Math.random() * 10000);
        linkage.attr("id", id);

        linkage.attr("linking", left ? "from" : "to");

        port.addClass("linking");
      })();
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
