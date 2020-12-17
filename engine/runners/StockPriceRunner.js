import CardRunner from "./CardRunner.js";
import { subscribe, unsubscribe } from "../../test/marketFeed.js";

export default (id, bolt) => {
  const card = CardRunner(id, bolt);

  card.forceOut = () => bolt.data[id].main.price;

  let subscribed = subscribeStock();
  function subscribeStock() {
    const code = bolt.data[id].main.stock;
    const subscription = subscribe(code, (price) => {
      bolt.data[id].main.price = price;
      bolt.send();

      card.out(card.ports.price, bolt.data[id].main.price);
    });

    return { code, subscription };
  }

  card.update = () => {
    if (bolt.data[id].main.stock != subscribed.code) {
      unsubscribe(subscribed.subscription);

      subscribed = subscribeStock();
    }
  };

  card.unload = () => unsubscribe(subscribed.subscription);

  return card;
};
