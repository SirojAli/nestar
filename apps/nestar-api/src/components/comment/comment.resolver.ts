import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { MemberType } from '../../libs/enums/member.enum';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';
import { WithoutGuard } from '../auth/guards/without.guard';
import { shapeIntoMongoObjectId } from '../../libs/config';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CommentService } from './comment.service';
import { Comment, Comments } from '../../libs/dto/comment/comment';
import { CommentInput, CommentsInquiry } from '../../libs/dto/comment/comment.input';
import { CommentUpdate } from '../../libs/dto/comment/comment.update';

@Resolver()
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}
  
  @UseGuards(AuthGuard)
  @Mutation((returns) => Comment)
  public async createComment(
    @Args('input') input: CommentInput,  
    @AuthMember('_id') memberId: ObjectId,
  ): Promise<Comment> {  
    console.log('Mutation: createComment');
    return await this.commentService.createComment(memberId, input);
  }

  @UseGuards(AuthGuard)
  @Mutation((returns) => Comment)
  public async updateComment(
    @Args('input') input: CommentUpdate,  
    @AuthMember('_id') memberId: ObjectId,
  ): Promise<Comment> {  
    console.log('Mutation: updateComment');
    input._id = shapeIntoMongoObjectId(input._id);
    return await this.commentService.updateComment(memberId, input);
  }

  @UseGuards(WithoutGuard)
  @Query((returns) => Comments)
  public async getComments(
    @Args('input') input: CommentsInquiry,  
    @AuthMember('_id') memberId: ObjectId,
  ): Promise<Comments> {  
    console.log('Mutation: getComments');
    input.search.commentRefId = shapeIntoMongoObjectId(input.search.commentRefId);
    return await this.commentService.getComments(memberId, input);
  }
      
}
