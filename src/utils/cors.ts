import * as cors from "cors";
import { corsOrigin } from "../config/config";
import * as log from "./log";

const logger = log.getLogger("CORS");

export function configureCORS(app) {
  var allowedOrigins = (allowedOrigins = corsOrigin.split(","));
  logger.info(`CORS configuration ${allowedOrigins}`);

  app.use(
    cors({
      credentials: true,
      origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (
          allowedOrigins.indexOf(origin) === -1 &&
          allowedOrigins.indexOf("*") === -1
        ) {
          var msg =
            "The CORS policy for this site does not " +
            "allow access from the specified Origin." +
            allowedOrigins;
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
    })
  );
}