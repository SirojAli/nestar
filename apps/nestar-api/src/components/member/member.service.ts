import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member } from '../../libs/dto/member/member';
import { MemberInput } from '../../libs/dto/member/member.input';

@Injectable()
export class MemberService {
  constructor(@InjectModel('Member') private readonly memberModule: Model<Member>) {}

  public async signup(input: MemberInput): Promise<Member> {
    // TODO: Hash Password

    try {
      const result = await this.memberModule.create(input)
    // TODO: Auth via Token
      return  result;
    } catch(err) {
      console.log("Error, Service.model:", err)
      throw new BadRequestException(err)
    }

  }

  public async login(): Promise<string> {
    return  'login executed!';
  }

  public async updateMember(): Promise<string> {
    return  'updateMember executed!';
  }

  public async getMember(): Promise<string> {
    return  'getMember executed!';
  }
}
