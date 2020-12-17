import CardRunner from "./CardRunner.js";
import Cancellable from "../../utility/Cancellable.js";

export default (id, bolt) => {
  const card = CardRunner(id, bolt);

  card.forceOut = () => bolt.data[id].main.value;

  const cancellable = Cancellable();
  (async function () {
    try {
      while (true) {
        await cancellable.wait(1000);

        card.out(card.ports.value, bolt.data[id].main.value);
      }
    } catch (e) {
      console.error(e);
    }
  })();

  card.unload = () => cancellable.cancel();

  return card;
};
