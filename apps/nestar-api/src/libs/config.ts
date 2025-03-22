import {ObjectId} from "bson";

export const availableAgentSort = ["createdAt", "updatedAt", "memberLikes", "memberViews", "memberRank"]

export const shapeIntoMongoObject =(target: any) => {
  return typeof target === 'string' ? new ObjectId(target) : target;
}