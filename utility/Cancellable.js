export default (inner) => {
  const cancellable = {
    inner: inner,
    canceled: false,
  };

  cancellable.isCanceled = () => {
    return cancellable.inner?.canceled || cancellable.canceled;
  };

  cancellable.cancel = () => {
    cancellable.canceled = true;
  };

  cancellable.tryThrow = () => {
    if (cancellable.isCanceled()) {
      throw "canceled";
    }
  };

  cancellable.wait = async (time) => {
    await new Promise((t) => setTimeout(t, time));
    cancellable.tryThrow();
  };

  return cancellable;
};
