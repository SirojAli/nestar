import {ObjectId} from "bson";
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

export const availableAgentSorts = ["createdAt", "updatedAt", "memberLikes", "memberViews", "memberRank"]
export const availableMemberSort = ["createdAt", "updatedAt", "memberLikes", "memberViews"]

/** IMAGE CONFIGURATION (config.js) */

 
 export const validMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
 export const getSerialForImage = (filename: string) => {
   const ext = path.parse(filename).ext;
   return uuidv4() + ext;
 };

export const shapeIntoMongoObject =(target: any) => {
  return typeof target === 'string' ? new ObjectId(target) : target;
}

