export const port = 5000;
export const graphqlPath = "/graphql";

export const dbConfig = {
  dialect: "postgresql",
  userName: "postgres",
  password: "root",
  host: "localhost",
  database: "oip-dev",
  schema: "student_managemant",
  port: 5432,
  initialize: {
    level: "ALL", //"SYNC","NONE","DATA"
    mode: "ALL", // 'DYNAMIC', 'ALL'
  },
};

export const logging = {
  sequelize_logging: false,
  apollo_logging: true,
  app_logging_level: "info", // info, debug
};

export const corsOrigin='*'

export const errorHandling= {
    stacktrace: process.env.ERROR_HANDLING_STACKTRACE=='true' || false,
};