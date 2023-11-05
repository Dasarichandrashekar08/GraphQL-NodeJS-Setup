import * as path from "path";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";

//-----------------Merger Schema--------------
const typeArray = loadFilesSync(path.join(__dirname, "."), {
  recursive: true,
  extensions: ["graphql"],
});

const typeDefs = mergeTypeDefs(typeArray);

//----export schema---
export default typeDefs;