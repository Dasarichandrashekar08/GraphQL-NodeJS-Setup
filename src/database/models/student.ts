import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
import { dbConfig } from "../../config/config";
import { IStudent } from "../../models/student";
import { IDataBaseModels } from "../database";

export type StudentsModel = typeof Model & {
  associate: (models: IDataBaseModels, schema: string) => void;
  initialize: (models: IDataBaseModels, schema: string) => Promise<void>;
} & {
  new (values?: Record<string, unknown>, options?: BuildOptions): IStudent;
};

export default (sequelize: Sequelize) => {
  const Student = <StudentsModel>sequelize.define(
    "student",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      age: {
        type: DataTypes.INTEGER,
      },
      sex: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.JSON,
      },
    },
    {
      schema: dbConfig.schema,
    }
  );

  return Student;
};