import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { graphqlUploadExpress } from 'graphql-upload';
import * as log from '../utils/log'
import {  errorHandling, graphqlPath } from '../config/config';
import { json } from 'body-parser';
import { getSchema } from './schema';
import { IDataBaseModels, getDataBaseModels, loadDBModels } from '../database/database';

const logger = log.getLogger("server");

export interface IContext {
    // auth0: Auth0Context,
    models: IDataBaseModels
}

export async function startApolloServer(app: any) {

    await loadDBModels();

    const server = new ApolloServer<IContext>({
        cache: "bounded", //cache: { type: 'redis', options: { host: 'localhost', port: 6379}}
        introspection: true,  //process.env.NODE_ENV !== 'production',  "false" for production
        csrfPrevention: false, // process.env.NODE_ENV == 'production (Cross-Site Request Forgery) "true" for production
        includeStacktraceInErrorResponses: errorHandling.stacktrace, // "false" for production
        schema: getSchema(),
        formatError: (err) => {
            logger.error(JSON.stringify(err, null, 2));
            if (!errorHandling.stacktrace) delete err?.extensions?.exception
            return err;
        }
    });

    await server.start();
    app.use(
        graphqlPath,
        json(),
        graphqlUploadExpress(),
        expressMiddleware(server, {
            context: async ({ req }) => {
                return {
                    // auth0: new auth0(),
                    models: await getDataBaseModels(),
                } as IContext
            }

        })

    );

}