class HeadHandler {
  element(element) {
    element.prepend(
      '<script src="/assets/omnisend-mobile-safe-v2.js"></script>',
      { html: true }
    );
  }
}

export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get("content-type") || "";

    if (!contentType.toLowerCase().includes("text/html")) {
      return response;
    }

    return new HTMLRewriter()
      .on("head", new HeadHandler())
      .transform(response);
  },
};
