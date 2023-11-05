import * as log4js from "log4js";
import { logging } from "../config/config";

export function getLogger(context) {
  let logger = log4js.getLogger(context);
  logger.level = logging.app_logging_level;
  return logger;
}