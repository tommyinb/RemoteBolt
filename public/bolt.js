$(function () {
  createStartCard().appendTo(".bolt").addClass("critical").css("top", "150px");
});

$(async function connectServer() {
  // const id = Math.floor(Math.random() * 10000);
  // $(".bolt").attr("id", id);
  // const data = getBoltData();
  // await $.ajax({
  //   type: "POST",
  //   url: "/start",
  //   data: JSON.stringify(data),
  //   dataType: "json",
  //   contentType: "application/json;charset=utf-8",
  // }).promise();
  // const socket = new WebSocket(`ws://${location.host}/debug/3`);
  // socket.onmessage = (e) => {
  //   console.log(e);
  // };
  // $(window).unload(() => $.post(`/end/${id}`));
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
  const id = card.attr("id");

  const type = card.find(".title").text();

  const offset = card.offset();

  const mains = card.find(".main [name]");
  const mainDatas = Object.fromEntries(
    mains.toArray().map((t) => [$(t).attr("name"), $(t).val() || $(t).text()])
  );

  const ports = card.find(".ports .port");
  const portIds = ports.toArray().map((t) => $(t).attr("id"));

  return {
    ...mainDatas,
    ports: portIds,
    id,
    type,
    x: offset.left,
    y: offset.top,
  };
}
function getPortData(port) {
  return {
    id: port.attr("id"),
    type: "port",
    card: port.closest(".card").attr("id"),
    text: port.text(),
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

async function updateServer() {
  const data = getBoltData();
  // await $.ajax({
  //   type: "POST",
  //   url: "/update",
  //   data: JSON.stringify(data),
  //   dataType: "json",
  //   contentType: "application/json;charset=utf-8",
  // }).promise();
}
