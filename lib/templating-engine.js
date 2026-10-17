import nunjucks from "nunjucks";

export function initTE(app) {
  nunjucks.configure("views", {
    autoescape: true,
    express: app,
  });
}
