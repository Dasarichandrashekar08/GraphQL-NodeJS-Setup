import * as log from "../../utils/log";
import { getAttributes } from "../../utils/graphqlFieldSanatize"
import { IContext } from "../server"

const logger=log.getLogger('studentResolver')

export default {
    Student: {
        __resolveReference: (reference,context,info) => studentFindById(null, reference,context,info)
    },
    Query: {
     studentFindById: (parent,args,context,info) => studentFindById(parent,args,context,info),
     studentFindByName: (parent,args,context,info) => studentFindByName(parent,args,context,info),
    },
    Mutation: {
        studentCreate: (parent,args,context,info) => studentCreate(parent,args,context,info),
        studentUpdate: (parent,args,context,info) => studentUpdate(parent,args,context,info),
        studentDelete: (parent,args,context,info) => studentDelete(parent,args,context,info),
    }
}

//---------------Queries--------------------

export const studentFindById=async(parent,{id},{models}:IContext,info) => {
    logger.info(`studentFindById: ${id}`);
    const student=await models.Student.findOne({where:{id}})
    return student;
}

export const studentFindByName=async(parent,{name},{models}:IContext,info) => {
    logger.info(`studentFindByName: ${name}`);
    const student=await models.Student.findOne({where:{name}})
    return student;
}

//--------------Mutations--------------------------

export const studentCreate=async(parent,{record},{models}:IContext,info) => {
    logger.info(`studentCreate: ${record}`);
    const student=await models.Student.create(record)
    return student;
}

export const studentUpdate=async(parent,{record,id},{models}:IContext,info) => {
    logger.info(`studentUpdate: ${record}`);
    const student=await models.Student.findOne({where:{id}});
    const updated=student?.update(record)
    return updated;
}

export const studentDelete=async(parent,{id},{models}:IContext,info) => {
    logger.info(`studentDelete: ${id}`);
    return models.Student.destroy({where:{id}});
 
}