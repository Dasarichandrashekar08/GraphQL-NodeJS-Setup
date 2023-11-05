import { Model } from "sequelize";
export interface IStudent extends Model{
    name:string;
    age:number;
    sex:string;
    address:any
}