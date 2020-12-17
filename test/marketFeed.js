const items = {};

function getItem(code) {
  let item = items[code];
  if (!item) {
    items[code] = item = {
      code,
      price: 30.1,
      subscriptions: new Set(),
    };
  }

  return item;
}

export const subscribe = (code, func) => {
  const item = getItem(code);

  const subscription = { code, func };
  item.subscriptions.add(subscription);

  return subscription;
};

export const unsubscribe = (subscription) => {
  const item = getItem(subscription.code);

  item.subscriptions.delete(subscription);
};

setInterval(tick, 1000);
function tick() {
  const actives = Object.values(items).filter((t) => t.subscriptions.size > 0);
  for (const item of actives) {
    switch (item.code) {
      case "0001":
      case "00001":
      case "1113":
      case "01113":
        item.price += 0.1;
        if (item.price > 1000) {
          item.price = 50;
        }
        break;

      case "0005":
      case "00005":
        item.price -= 0.1;
        if (item.price <= 0) {
          item.price = 50;
        }
        break;

      default:
        item.price += Math.floor(Math.random() * 10) / 10;
        break;
    }

    item.price = Math.round(item.price * 100) / 100;

    item.subscriptions.forEach((t) => t.func(item.price));
  }
}

export const getPrice = (code) => {
  const item = getItem(code);
  return item.price;
};
