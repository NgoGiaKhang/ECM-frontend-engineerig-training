export async function enableMocking() {
  const { worker } = await import("./browser");

  const baseUrl = import.meta.env.BASE_URL || "/";
  console.log("setup worker");

  return worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      url: `${baseUrl}mockServiceWorker.js`,
    },
  });
}
