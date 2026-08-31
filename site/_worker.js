class ViewportHandler {
  element(element) {
    element.setAttribute(
      "content",
      "width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content"
    );
  }
}

class HeadHandler {
  element(element) {
    element.prepend(
      '<script src="/assets/omnisend-mobile-fix.js"></script>',
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
      .on('meta[name="viewport"]', new ViewportHandler())
      .on("head", new HeadHandler())
      .transform(response);
  },
};
