import logger from "../logs/news.logs.js";

export default function reqLog(req, res, next) {
  logger.info(req.method, req.url);
  next();
}
