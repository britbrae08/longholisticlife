class WelcomeHeadHandler {
  element(element) {
    element.prepend(
      '<script src="/assets/welcome-top-fix-v2.js"></script>',
      { html: true }
    );
  }
}

export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get("content-type") || "";
    const url = new URL(request.url);

    if (!contentType.toLowerCase().includes("text/html")) {
      return response;
    }

    if (url.pathname !== "/welcome" && url.pathname !== "/welcome/") {
      return response;
    }

    return new HTMLRewriter()
      .on("head", new WelcomeHeadHandler())
      .transform(response);
  },
};
