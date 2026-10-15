import { logger } from "../logger/index.js";

export function error(err, req, res, next) {
  logger.error(err.message, err);

  return res.status(500).send("some error");
}
