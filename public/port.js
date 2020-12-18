function createPort(name, text, type, limit) {
  const id = Math.floor(Math.random() * 100000);
  const port = $(`<div id=${id} name="${name}" class="port" limit=${limit}>${text}</div>`);

  if (type) {
    port.attr("type", type);
  }

  port.mousedown(function () {
    const linkings = $(".linkage[linking]");
    if (linkings.length <= 0) {
      startLinking(port);
    } else {
      completeLinking(linkings, port);
    }

    return false;
  });

  port.mouseup(function () {
    return false;
  });

  return port;
}
function startLinking(port) {
  if (port.hasClass("limited")) {
    return;
  }

  const left = port.closest(".ports").is(".left");

  const linkage = createLinkage(left ? undefined : port, left ? port : undefined);
  linkage.appendTo(".bolt");

  const id = Math.floor(Math.random() * 10000);
  linkage.attr("id", id);

  linkage.attr("linking", left ? "from" : "to");

  port.addClass("linking");
}
function completeLinking(linkings, port) {
  const startId = linkings.attr("from") || linkings.attr("to");
  const startPort = $(`#${startId}`);

  const linking = linkings.attr("linking");
  const linkable = (function linkable() {
    if (port.hasClass("limited")) {
      return false;
    }

    const ports = port.closest(".ports");

    if (linking === "from") {
      if (!ports.is(".right")) {
        return false;
      }
    } else {
      if (!ports.is(".left")) {
        return false;
      }
    }

    const portType = port.attr("type");
    const startType = startPort.attr("type");
    if (portType !== startType) {
      return false;
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

    setPortLimited(startPort);
    setPortLimited(port);

    startPort.trigger("linked", [port]);
    port.trigger("linked", [startPort]);

    updateServer();
  } else {
    linkings.remove();
  }

  startPort.removeClass("linking");
}
function setPortLimited(port) {
  const id = port.attr("id");
  const left = port.closest(".ports").is(".left");
  const linkages = $(left ? `.linkage[to="${id}"]` : `.linkage[from="${id}"]`);

  const limitText = port.attr("limit");
  const limitValue = parseInt(limitText);

  port.toggleClass("limited", linkages.length >= limitValue);
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
