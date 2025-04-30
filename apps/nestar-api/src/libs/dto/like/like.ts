import { Field, ObjectType } from '@nestjs/graphql';
import { LikeGroup } from '../../enums/like.enum';
import { ObjectId } from 'mongoose';

// Frontendda javob qaytaradigan 2ta Obj-type ni hosil qilganmiz
@ObjectType() // 1- obj-type
export class MeLiked {
	@Field(() => String)
	memberId: ObjectId;

	@Field(() => String)
	likeRefId: ObjectId;

	@Field(() => Boolean)
	myFavorite: boolean;
}

@ObjectType() // 2- obj-type
export class Like {
	@Field(() => String)
	_id: ObjectId;

	@Field(() => LikeGroup)
	likeGroup: LikeGroup;

	@Field(() => String)
	likeRefId: ObjectId;

	@Field(() => String)
	memberId: ObjectId;

	@Field(() => Date)
	createdAt: Date;

	@Field(() => Date)
	updatedAt: Date;
}
