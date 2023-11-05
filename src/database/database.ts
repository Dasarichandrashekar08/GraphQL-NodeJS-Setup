import { createdb, dropdb } from "pgtools";
import { dbConfig, logging } from '../config/config';
import { Sequelize } from 'sequelize';
import * as log from '../utils/log';
import student, { StudentsModel } from "./models/student";


const logger = log.getLogger("database");

export interface IDataBaseModels {
    models: {},
    Student: StudentsModel;
    sequilize: Sequelize,
    Sequilize: any
};

const database: IDataBaseModels = {} as any;
database.models = {};

export async function getDataBaseModels() {
    return database;
};

export async function createDataBase(dataBaseName) {
    try {
        await createdb(
            {
                user: dbConfig.userName,
                password: dbConfig.password,
                host: dbConfig.host,
                port: dbConfig.port
            },
            dataBaseName
        );
    } catch (error) { }

};

export async function initializeDataBase(level = dbConfig.initialize.level, mode = dbConfig.initialize.mode) {
    await createDataBase(dbConfig.database);

    const sequelize = new Sequelize(
        dbConfig.database,
        dbConfig.userName,
        dbConfig.password,
        {
            dialect: dbConfig.dialect as any,
            host: dbConfig.host,
            port: dbConfig.port,
            define: {
                underscored: true,
                schema: dbConfig.schema,
                timestamps: true
            },
            logging: logging.sequelize_logging,

        }
    );

    try {
        await sequelize.createSchema(dbConfig.schema, {});
    } catch (error) { };

    database.Student = student(sequelize);

    if (["SYNC", "DATA", "ALL"].includes(level)) {
        await sequelize.sync({ force: false, alter: true });

        Object.keys(database).forEach((modelName) => {
            if ("associate" in database[modelName]) {
                database[modelName].associate(database, dbConfig.schema);
            }
        });
    }

    if (["DYNAMIC", "ALL"].includes(mode)) {
        await Promise.all(
            Object.keys(database).map(async (modelName) => {
                if ("initializeData" in database[modelName]) {
                    await database[modelName].initializeDataBase(database, dbConfig.schema);
                }
            })
        );
    }

    database.sequilize = sequelize;
    database.Sequilize = Sequelize;
    logger.info("Initializing DataBase Completed");
};

export async function loadDBModels() {
    logger.info(`Initializing DB Models: level: ${dbConfig.initialize.level}`);
    await initializeDataBase();
}

export async function dropDataBase(dataBaseName) {
    try {
        await dropdb(
            {
                user: dbConfig.userName,
                password: dbConfig.password,
                host: dbConfig.host,
                port: dbConfig.port
            },
            dataBaseName
        );
    } catch (error) { }

};

export default database;