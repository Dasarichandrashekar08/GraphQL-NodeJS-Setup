import * as log from "../../utils/log";
import { mergeResolvers } from "@graphql-tools/merge";
import studentResolver from "./studentResolver";
const logger = log.getLogger("indexResolver");

const resolversArray = [studentResolver];

logger.info(`Merging Resolvers`);
const resolvers = mergeResolvers(resolversArray);
export default resolvers;