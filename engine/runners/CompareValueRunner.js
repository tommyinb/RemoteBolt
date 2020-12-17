import CardRunner from "./CardRunner.js";

import "../../utility/Array.js";
import Cancellable from "../../utility/Cancellable.js";

export default (id, bolt) => {
  const card = CardRunner(id, bolt);

  const cancellables = new Set();
  card.in = async (portId, value) => {
    const cancellable = Cancellable();
    cancellables.add(cancellable);

    switch (portId) {
      case card.ports.fromA:
        try {
          if (value !== bolt.data[id].main.a) {
            bolt.data[id].main.a = value;

            bolt.data[id].states.push("active");
            bolt.send();

            await cancellable.wait(500);

            bolt.data[id].states.remove("active");
            bolt.send();
          }
        } catch (e) {
          console.error(e);
        }
        break;

      case card.ports.fromB:
        try {
          if (value !== bolt.data[id].main.b) {
            bolt.data[id].main.b = value;

            bolt.data[id].states.push("active");
            bolt.send();

            await cancellable.wait(500);

            bolt.data[id].states.remove("active");
            bolt.send();
          }
        } catch (e) {
          console.error(e);
        }
        break;

      case card.ports.from:
        try {
          bolt.data[id].states.push("active");
          bolt.send();

          const cancellable = Cancellable();
          cancellables.add(cancellable);
          await cancellable.wait(100);

          const fromA = parseFloat(card.forceIn(card.ports.fromA));
          if (!isNaN(fromA)) {
            bolt.data[id].main.a = fromA;
          }

          const fromB = parseFloat(card.forceIn(card.ports.fromB));
          if (!isNaN(fromB)) {
            bolt.data[id].main.b = fromB;
          }

          bolt.send();

          await cancellable.wait(400);

          bolt.data[id].states.remove("active");

          const compare = bolt.data[id].main.a - bolt.data[id].main.b;
          const port = compare > 0 ? card.ports.toA : compare < 0 ? card.ports.toB : card.ports.to;
          bolt.data[port].states.push("active");

          bolt.send();

          await cancellable.wait(300);

          bolt.data[port].states.remove("active");
          card.out(port);
          bolt.send();

          cancellables.delete(cancellable);
        } catch (e) {
          console.error(e);
        }
        break;
    }

    cancellables.delete(cancellable);
  };

  card.forceOut = () => bolt.data[id].main.value;

  card.unload = () => {
    cancellables.forEach((t) => t.cancel());
    cancellables.clear();
  };

  return card;
};
