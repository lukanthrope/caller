import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { Logger } from '@nestjs/common'
import { CreateUserDTO, LoginDTO } from '../dto';
import { User } from '../interfaces';
import { EInfo } from '../enums';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(@InjectModel('User') private userModel: Model<User>) {}

  public async SignIn(userDTO: LoginDTO) {
    const exists = await this.userModel.findOne({ email: userDTO.email });

    
    if (!exists || exists.password !== userDTO.password) return {
      error: 'Wrong credentials'
    }

    const token = jwt.sign({
      user: {
        _id: exists._id,
        about: exists.about
      },
    }, EInfo.SECRET);

    return {
      token
    };
  }

  public async SignUp(userDTO: CreateUserDTO) {
    const exists = await this.userModel.find({ $or: [
      { email: userDTO.email },
      { _id: userDTO.id }
    ] });

    Logger.warn(exists);
    if (exists.length) return {
      error: 'user exists'
    }

    const newUser = await this.userModel.create(userDTO);

    const token = jwt.sign({
      user: {
        _id: newUser._id,
        about: newUser.about
      },
    }, EInfo.SECRET);

    return {
      token
    };
  }
}