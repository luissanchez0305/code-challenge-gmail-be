import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDto } from './models/create.dto';
import { Email, EmailDocument } from './models/email.schema';

@Injectable()
export class EmailService {
  constructor(
    @InjectModel(Email.name) private emailModel: Model<EmailDocument>,
  ) {}

  async getAll(): Promise<Email[]> {
    return await this.emailModel.find().exec();
  }

  async getEmail(id: string): Promise<Email> {
    let email: Email;

    try {
      email = await this.emailModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not find email');
    }

    if (!email) {
      throw new NotFoundException('Could not find email');
    }

    return email;
  }

  async insertEmail(createDto: CreateDto): Promise<string> {
    const { from, subject, message, received } = createDto;

    const email = new this.emailModel({
      starred: false,
      from,
      subject,
      message,
      received,
      read: false,
    });
    const res = await email.save();
    return res['_id'];
  }

  async updateEmail(
    id: string,
    read: boolean,
    starred: boolean,
  ): Promise<Email> {
    const updateEmail = await this.getEmail(id);
    updateEmail.read = read;
    updateEmail.starred = starred;
    const email = await this.emailModel
      .findByIdAndUpdate(id, {
        ['read']: read,
        ['starred']: starred,
      })
      .exec();

    if (!email) {
      throw new NotFoundException('Could not find email');
    }

    return email;
  }
}
