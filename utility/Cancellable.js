export default () => {
  const cancellable = { canceled: false };

  cancellable.cancel = () => {
    cancellable.canceled = true;
  };

  cancellable.tryThrow = () => {
    if (cancellable.canceled) {
      throw "canceled";
    }
  };

  cancellable.wait = async (time) => {
    await new Promise((t) => setTimeout(t, time));
    cancellable.tryThrow();
  };

  return cancellable;
};
