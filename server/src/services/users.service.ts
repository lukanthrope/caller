import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IClient, User } from '../interfaces';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  public async getList(_id: string): Promise<IClient[]> {
    const exists = await this.userModel.find(
      {
        _id: { $regex: `${_id || ''}`, $options: 'i' },
      },
      (err) => {
        if (err) console.log(err);
      },
    );

    return exists.map((usr) => ({ _id: usr._id, about: usr.about }));
  }

  public async getOne(_id: string): Promise<IClient> {
    return this.userModel.findOne({ _id });
  }
}
