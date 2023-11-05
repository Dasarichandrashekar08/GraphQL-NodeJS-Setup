console.log(`
░██████╗░██████╗░░█████╗░██████╗░██╗░░██╗░██████╗░██╗░░░░░░░░░░░██████╗░░█████╗░░█████╗░
██╔════╝░██╔══██╗██╔══██╗██╔══██╗██║░░██║██╔═══██╗██║░░░░░░░░░░░██╔══██╗██╔══██╗██╔══██╗
██║░░██╗░██████╔╝███████║██████╔╝███████║██║██╗██║██║░░░░░█████╗██████╔╝██║░░██║██║░░╚═╝
██║░░╚██╗██╔══██╗██╔══██║██╔═══╝░██╔══██║╚██████╔╝██║░░░░░╚════╝██╔═══╝░██║░░██║██║░░██╗
╚██████╔╝██║░░██║██║░░██║██║░░░░░██║░░██║░╚═██╔═╝░███████╗░░░░░░██║░░░░░╚█████╔╝╚█████╔╝
░╚═════╝░╚═╝░░╚═╝╚═╝░░╚═╝╚═╝░░░░░╚═╝░░╚═╝░░░╚═╝░░░╚══════╝░░░░░░╚═╝░░░░░░╚════╝░░╚════╝░
`)

import * as express from "express";
import { startApolloServer } from "./graphql/server";
import { port, graphqlPath } from "./config/config";
import * as log from './utils/log';
import { configureCORS } from "./utils/cors";

const logger = log.getLogger("index");

const app = express();

 //config CORS
  configureCORS(app);

const startExpressServer = async () => {
  await startApolloServer(app);
  app.listen({ port }, () => {
    logger.info(`🚀 Server ready at http://localhost:${port}${graphqlPath}`);
  });
};
startExpressServer();