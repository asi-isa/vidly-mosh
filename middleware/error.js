export function error(err, req, res, next) {
  return res.status(500).send("some error");
}
