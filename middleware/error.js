export function error(err, req, res, next) {
  console.error(`${req.method} ${req.originalUrl}`, err);
  return res.status(500).send("some error");
}
