import CardRunner from "./CardRunner.js";

import "../../utility/Array.js";
import Cancellable from "../../utility/Cancellable.js";

export default (id, bolt) => {
  const card = CardRunner(id, bolt);

  const cancellables = new Set();
  card.in = async () => {
    try {
      bolt.data[id].states.push("active");
      bolt.send();

      const cancellable = Cancellable();
      cancellables.add(cancellable);
      await cancellable.wait(500);

      bolt.data[id].states.remove("active");
      bolt.data[card.ports.to].states.push("active");
      bolt.send();

      await cancellable.wait(300);

      bolt.data[card.ports.to].states.remove("active");
      card.out(card.ports.to);
      bolt.send();

      cancellables.delete(cancellable);
    } catch (e) {
      console.error(e);
    }
  };

  card.unload = () => {
    cancellables.forEach((t) => t.cancel());
    cancellables.clear();
  };

  return card;
};
