import {ObjectId} from "bson";
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

/** Agent related **/
export const availableAgentSorts = ['createdAt', 'updatedAt', 'memberLikes', 'memberViews', 'memberRank']
export const availableMemberSorts = ['createdAt', 'updatedAt', 'memberLikes', 'memberViews']

/** Property related **/
export const availableOptions = ['propertyBarter', 'propertyRent']
export const availablePropertySorts = [
  'createdAt', 'updatedAt', 'propertyLikes', 'propertyViews', 'propertyRank', 'propertyPrice']

/** Property related **/
export const availableBoardArticleSorts = ['createdAt', 'updatedAt', 'articleLikes', 'articleViews']

/** Property related **/
export const availableCommentSorts = ['createdAt', 'updatedAt']


/** IMAGE CONFIGURATION  */
 export const validMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
 export const getSerialForImage = (filename: string) => {
   const ext = path.parse(filename).ext;
   return uuidv4() + ext;
 };

/** Make MongoDB ID  */
export const shapeIntoMongoObjectId =(target: any) => {
  return typeof target === 'string' ? new ObjectId(target) : target;
}

/** Like Process  */
export const lookupMember = { 
  $lookup: {
    from: 'members',
    localField: 'memberId',
    foreignField: '_id',
    as: 'memberData',
  },
};

