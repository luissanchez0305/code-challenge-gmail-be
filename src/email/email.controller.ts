import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { EmailService } from './email.service';
import { CreateDto } from './models/create.dto';
import { UpdateDto } from './models/update.dto';

@Controller('emails')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get()
  async getEmails() {
    return await this.emailService.getAll();
  }

  @Get(':id')
  async getEmail(@Param('id') emailId: string) {
    return await this.emailService.getEmail(emailId);
  }

  @Post()
  async create(@Body() email: CreateDto): Promise<string> {
    return await this.emailService.insertEmail(email);
  }

  @Put(':id')
  async update(@Param('id') emailId: string, @Body() email: UpdateDto) {
    const { read, starred } = email;
    return await this.emailService.updateEmail(emailId, read, starred);
  }
}
