import {Schema} from 'mongoose';
import { MemberType, MemberStatus, MemberAuthType } from '../libs/enums/member.enum';

const MemberSchema = new Schema({
  memberType: {
    type: String,
    enum: MemberType,
    default: MemberType.USER,
  },

  memberStatus: {
    type: String,
    enum: MemberStatus,
    default: MemberStatus.ACTIVE,
  },

  memberAuthType: {
    type: String,
    enum: MemberAuthType,
    default: MemberAuthType.PHONE,
  },

  memberPhone: {
    type: String,
    index: {unique: true, sparse: true},
    required: true
  },

  memberNick: {
    type: String,
    index: {unique: true, sparse: true},
    required: true
  },

  memberPassword: {
    type: String,
    select: false,
    required: true
  },

  memberFullName: {
    type: String,
  },

  memberImage: {
    type: String,
    default: '',
  },

  memberAddress: {
    type: String,
  },

  memberDesc: {
    type: String,
  },

  memberProperties: {
    type: String,
    default: 0,
  },

  memberArticles: {
    type: String,
    default: 0,
  },

  memberFollowers: {
    type: String,
    default: 0,
  },

  memberFollowings: {
    type: String,
    default: 0,
  },

  memberPoints: {
    type: String,
    default: 0,
  },

  memberLikes: {
    type: String,
    default: 0,
  },

  memberViews: {
    type: String,
    default: 0,
  },

  memberComments: {
    type: String,
    default: 0,
  },

  memberRank: {
    type: String,
    default: 0,
  },

  memberWarnings: {
    type: String,
    default: 0,
  },

  memberBlocks: {
    type: String,
    default: 0,
  },

  deletedAt: {
    type: Date
  }
}, 
  {timestamps: true, collection: 'members'}
)

export default MemberSchema;



