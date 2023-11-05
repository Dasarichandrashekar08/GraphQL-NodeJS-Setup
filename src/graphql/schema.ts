import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { buildSubgraphSchema } from '@apollo/federation';
import typeDefs from './typedef/index';
import { addResolversToSchema } from '@graphql-tools/schema';
import resolvers from './resolvers/index';
import { constraintDirective, constraintDirectiveTypeDefs } from 'graphql-constraint-directive';

export function getSchema(){
const federatedSchema=buildSubgraphSchema([{typeDefs: mergeTypeDefs([constraintDirectiveTypeDefs,typeDefs])}])

let schema=addResolversToSchema({
    schema:federatedSchema,
    resolvers:mergeResolvers([resolvers]),
    inheritResolversFromInterfaces: true,
});
schema=constraintDirective()(schema);
return schema;
}