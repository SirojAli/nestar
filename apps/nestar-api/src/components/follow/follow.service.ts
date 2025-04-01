import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Member, Members } from '../../libs/dto/member/member';
import { AgentsInquiry, LoginInput, MemberInput, MembersInquiry } from '../../libs/dto/member/member.input';
import { MemberStatus, MemberType } from '../../libs/enums/member.enum';
import { Direction, Message } from '../../libs/enums/common.enum';
import { AuthService } from '../auth/auth.service';
import { MemberUpdate } from '../../libs/dto/member/member.update';
import { StatisticModifier, T } from '../../libs/types/common';
import { ViewService } from '../view/view.service';
import { LikeService } from '../like/like.service';
import { Follower, Following } from '../../libs/dto/follow/follow';
import { MemberService } from '../member/member.service';

@Injectable()
export class FollowService {
  constructor(@InjectModel('Follow') private readonly followModel: Model<Follower | Following>, 
    private memberService: MemberService,
    private authService: AuthService,
  ) {}
}
