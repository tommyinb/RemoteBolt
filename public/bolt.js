$(function () {
  createStartCard().appendTo(".bolt").addClass("critical").css("top", "150px");
});

let socket = null;
$(async function connectServer() {
  const id = Math.floor(Math.random() * 10000);
  $(".bolt").attr("id", id);

  await postData("/start");

  socket = new WebSocket(`ws://${location.host}/debug/${id}`);
  socket.onmessage = (e) => {
    const data = JSON.parse(e.data);
    for (const item of Object.values(data)) {
      const element = $(`#${item.id}`);
      if (element.is(".card")) {
        setCardData(element, item);
      } else if (element.is(".port")) {
        setPortData(element, item);
      }
    }
  };

  $(window).on("unload", function () {
    $.post(`/end/${id}`);
  });
});
function getBoltData() {
  const bolt = $(".bolt");
  const boltData = { id: bolt.attr("id") };

  bolt.find(".card").each(function () {
    const cardData = getCardData($(this));
    boltData[cardData.id] = cardData;
  });

  bolt.find(".port").each(function () {
    const portData = getPortData($(this));
    boltData[portData.id] = portData;
  });

  bolt.find(".linkage").each(function () {
    const linkageData = getLinkageData($(this));
    boltData[linkageData.id] = linkageData;
  });

  return boltData;
}
function getCardData(card) {
  return {
    id: card.attr("id"),
    type: card.attr("type"),
    offset: card.offset(),

    main: Object.fromEntries(
      card
        .find(".main [name]")
        .toArray()
        .map((t) => [$(t).attr("name"), $(t).val() || $(t).text()])
    ),

    ports: card
      .find(".ports .port")
      .toArray()
      .map((t) => $(t).attr("id")),

    states: (card.attr("state") || "").split(/,\s*/).filter((t) => t),
  };
}
function getPortData(port) {
  return {
    id: port.attr("id"),
    type: "port",
    name: port.attr("name"),
    card: port.closest(".card").attr("id"),
    text: port.text(),
    states: (port.attr("state") || "").split(/,\s*/).filter((t) => t),
  };
}
function getLinkageData(linkage) {
  return {
    id: linkage.attr("id"),
    type: "linkage",
    from: linkage.attr("from"),
    to: linkage.attr("to"),
  };
}

function setCardData(card, data) {
  const main = card.find(".main");
  for (const [name, value] of Object.entries(data.main)) {
    const field = main.find(`[name="${name}"]:not(.user)`);
    if (field.is("input")) {
      field.val(value);
      field.trigger("refresh");
    } else {
      field.text(value);
    }
  }

  card.attr("state", data.states.join(","));
}
function setPortData(port, data) {
  port.attr("state", data.states.join(","));
}

async function updateServer() {
  await postData("/update");
}
async function postData(url) {
  const data = getBoltData();

  await new Promise((resolve, reject) => {
    $.ajax({
      url,
      data: JSON.stringify(data),
      type: "POST",
      dataType: "json",
      contentType: "application/json;charset=utf-8",
      success: resolve,
      error: reject,
    });
  });
}

$(function loadPlay() {
  $(".play").click(function () {
    socket?.send("start");
  });
});
