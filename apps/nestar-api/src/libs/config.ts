import {ObjectId} from "bson";

export const shapeIntoMongoObject =(target: any) => {
  return typeof target === 'string' ? new ObjectId(target) : target;
}