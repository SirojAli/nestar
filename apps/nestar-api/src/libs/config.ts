import {ObjectId} from "bson";

export const availableAgentSort = ["createdAt", "updatedAt", "memberLikes", "memberViews", "memberRank"]
export const availableMemberSort = ["createdAt", "updatedAt", "memberLikes", "memberViews"]

export const shapeIntoMongoObject =(target: any) => {
  return typeof target === 'string' ? new ObjectId(target) : target;
}