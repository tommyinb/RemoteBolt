import CardRunner from "./CardRunner.js";
import { getPrice } from "../../test/marketFeed.js";

import "../../utility/Array.js";
import Cancellable from "../../utility/Cancellable.js";

export default (id, bolt) => {
  const card = CardRunner(id, bolt);

  const cancellables = new Set();
  card.in = async (portId, value) => {
    const cancellable = Cancellable();
    cancellables.add(cancellable);

    switch (portId) {
      case card.ports.from:
        try {
          bolt.data[id].states.push("active");
          bolt.send();

          await cancellable.wait(100);

          function forcePrice() {
            const prices = card.forceIn(card.ports.price);
            const price = prices.find((t) => t);
            if (price) {
              bolt.data[id].main.price = parseFloat(price) || 0;
            }
          }

          forcePrice();
          bolt.send();

          await cancellable.wait(400);

          forcePrice();

          const price = getPrice(bolt.data[id].main.stock);
          const next = bolt.data[id].main.price >= price ? card.ports.to : card.ports.fail;

          bolt.data[id].states.remove("active");
          bolt.data[next].states.push("active");
          bolt.send();

          await cancellable.wait(300);

          bolt.data[next].states.remove("active");
          card.out(next);
          bolt.send();
        } catch (e) {
          console.error(e);
        }
        break;

      case card.ports.price:
        try {
          if (value !== bolt.data[id].main.price) {
            bolt.data[id].main.price = value;

            bolt.data[id].states.push("active");
            bolt.send();

            await cancellable.wait(100);

            bolt.data[id].states.remove("active");
            bolt.send();
          }
        } catch (e) {
          console.error(e);
        }
        break;
    }

    cancellables.delete(cancellable);
  };

  card.unload = () => {
    cancellables.forEach((t) => t.cancel());
    cancellables.clear();
  };

  return card;
};
