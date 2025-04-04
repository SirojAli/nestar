import {ObjectId} from "bson";
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { T } from "./types/common";
import { pipeline } from "stream";

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
export const lookupAuthMemberLiked = (memberId: T, targetRefId: string = '$_id') => { 
 return {
  $lookup: {
    from: 'likes',
    let: {     // bular - bizning local-variable larimiz hisoblanadi
      localRefId: targetRefId,  // localRefId = '$_id' degani.dir
      localMemberId: memberId,
      localMyFavorite: true,
    },  // + lookup da PIPELINE ni hosil qilamiz:
    pipeline: [         // pipeline 1ta [] arrayni qab-qiladi
      {                 // 1-match dan foy-miz: 
        $match: {       // buyerda bir nechta narsani matching qilmoqchimiz
          $expr: {      // ...shuni chun biz EXPRESSION dan foy-miz
            $and: [     // bu [] array ichiga nimalarni COMPARE qilishni belgilaymiz
              {$eq: ["$likeRefId", "$$localRefId"]},  // eq mantigi [] array ni talab etadi
 // $likeRefId ni -> bizning $$localRefId ga solishtiradi  + biznikida 2ta $$ belgisi bo'ladi

              {$eq: ["$memberId", "$$localMemberId"]}
 // $memberId ni -> bizning $$localMemberId ga solishtiradi  + bunda ham 2ta $$ belgisi bo'ladi
            ],
          },
        },
      }, // matching-resultdan hosil bolgan mantiqni PROJECTION qilamiz
      {  // buyerda PROJECT business mantigidan foy-miz
        $project: {  // => myFavorite logic ni hosil qilmoqchimiz
          _id: 0,   // id ni obermaslikni aytamiz.  ID by-default 1, qolgan datasetlar 0 boladi
          memberId: 1,  // shuni chun bizga memberId va likeRefId lar kk
          likeRefId: 1, 
          myFavorite: "$$localMyFavorite"
// bunda nega: true bolmadi? => uni orniga bizning local-var.dagi 'localMyFavorite' ni return qiladi
        },
      },
    ],
// PIPELINE hosil bolgandan kn, qanday nom bn yozilishni mantigini tashkillaymiz:    
    as: "meLiked", // shu nom bn save b-i kk, sababi uni Properties.ts da avvaldan yozib quyganmiz
  },
 };
};

export const lookupMember = { 
  $lookup: {
    from: 'members',
    localField: 'memberId',
    foreignField: '_id',
    as: 'memberData',
  },
};

/** Following Process  */
export const lookupFollowingData = { 
  $lookup: {
    from: 'members',
    localField: 'followingId',
    foreignField: '_id',
    as: 'followingData',
  },
};

/** Followers Process  */
export const lookupFollowerData = { 
  $lookup: {
    from: 'members',
    localField: 'followerId',
    foreignField: '_id',
    as: 'followerData',
  },
};

/** Follow Complex Query Logic  */
interface LookupAuthMemberFollowed {  
// ikala mantiqqa ham birdek ishlashi uchun, bu interface ni yaratdik,
// buni pastdagi lookupAuthMemberFollowed dagi input: ga qiymat qaytarish u-n yozamiz!
  followerId: T;
  followingId: string;  // 2-qismi bizga: string ko'rinishida namoyon b-i. 

}
export const lookupAuthMemberFollowed = (input: LookupAuthMemberFollowed) => { 
  const { followerId, followingId } = input; // bu ikalasini distraction qilamiz
  return {
   $lookup: {
     from: 'follows',  // 'follows' collectionida COMPLEX LOOKUP QUERYni amalga oshiramiz
     let: {     // bular - bizning local-variable larimiz hisoblanadi
       localFollowerId: followerId,   // 1-variable = followerId ga
       localFollowingId: followingId,    // 2-variable = followingId ga => bu STRING b-i (fx: $followingId) 
       localMyFavorite: true,
     },  // + lookup da PIPELINE ni hosil qilamiz:
     pipeline: [         // pipeline 1ta [] arrayni qab-qiladi
       {                 // 1-match dan foy-miz: 
         $match: {       // buyerda bir nechta narsani MATCHING qilmoqchimiz
           $expr: {      // ...shuni chun biz EXPRESSION dan foy-miz
             $and: [     // bu [] array ichiga nimalarni COMPARE qilishni belgilaymiz
               {$eq: ["$followerId", "$$localFollowerId"]},  // eq mantigi [] array ni talab etadi
  // $followerId ni -> bizning $$localFollowerId ga solishtiradi  + biznikida 2ta $$ belgisi bo'ladi
 
               {$eq: ["$followingId", "$$localFollowingId"]}
  // $followingId ni -> bizning $$localFollowingId ga solishtiradi  + bunda ham 2ta $$ belgisi bo'ladi
             ],
           },
         },
       }, // matching-resultdan hosil bolgan mantiqni PROJECTION qilamiz
       {  // buyerda PROJECT business mantigidan foy-miz
         $project: {  // => MeLiked logic ni hosil qilmoqchimiz
           _id: 0,   // id ni obermaslikni aytamiz.  ID by-default 1, qolgan datasetlar 0 boladi
           followerId: 1,  // shuni chun bizga followerId va followingId lar kk
           followingId: 1, 
           myFollowing: "$$localMyFavorite"
 // bunda nega: true bolmadi? => uni orniga bizning local-var.dagi 'localMyFavorite' ni return qiladi
         },
       },
     ],
 // PIPELINE hosil bolgandan kn, qanday nom bn yozilishni mantigini tashkillaymiz:    
     as: "meFollowed", // shu nom bn save b-i kk, sababi uni Follow.ts da avvaldan yozib quyganmiz
   },
  };
};

/** Favorite Property Complex Query Logic  */
export const lookupFavorite = { 
  $lookup: {
    from: 'members',
    localField: 'favoriteProperty.memberId',
    foreignField: '_id',
    as: 'favoriteProperty.memberData',
  },
};

/** Visited Property Query Logic  */
export const lookupVisit = { 
  $lookup: {
    from: 'members',
    localField: 'visitedProperty.memberId',
    foreignField: '_id',
    as: 'visitedProperty.memberData',
  },
}
