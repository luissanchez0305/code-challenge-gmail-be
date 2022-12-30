import { Test, TestingModule } from '@nestjs/testing';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { CreateDto } from './models/create.dto';
import { Email } from './models/email.schema';
import { UpdateDto } from './models/update.dto';
import { emailStub } from './__mocks__/email.stub';

jest.mock('./email.service');

describe('EmailController', () => {
  let emailController: EmailController;
  let emailService: EmailService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EmailController],
      providers: [EmailService],
    }).compile();

    emailController = app.get<EmailController>(EmailController);
    emailService = app.get<EmailService>(EmailService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(emailController).toBeDefined();
  });

  describe('get emails', () => {
    describe('when get emails is called', () => {
      let emails: Email[];

      beforeEach(async () => {
        emails = await emailController.getEmails();
      });

      it('should get email items', async () => {
        expect(emails.length).toBeGreaterThan(0);
      });

      test('then it should call email service', () => {
        expect(emailService.getAll).toHaveBeenCalled();
      });

      test('then it should return emails', () => {
        expect(emails).toEqual([emailStub()]);
      });
    });
  });

  describe('get email', () => {
    describe('when get email is called', () => {
      let email: Email;
      beforeEach(async () => {
        email = await emailController.getEmail(emailStub().id);
      });

      test('then it should call email service', () => {
        expect(emailService.getEmail).toBeCalledWith(emailStub().id);
      });

      test('then is should return a email', () => {
        expect(email.id).toEqual(emailStub().id);
      });
    });
  });

  describe('create email', () => {
    describe('when create email is called', () => {
      let email: string;
      let createEmailDto: CreateDto;

      beforeEach(async () => {
        createEmailDto = {
          from: emailStub().from,
          subject: emailStub().subject,
          message: emailStub().message,
          received: emailStub().received,
        };

        email = await emailController.create(createEmailDto);
      });

      test('then it should call email service', () => {
        expect(emailService.insertEmail).toHaveBeenCalledWith({
          from: createEmailDto.from,
          message: createEmailDto.message,
          received: createEmailDto.received,
          subject: createEmailDto.subject,
        });
      });

      test('then it should return an email id', () => {
        expect(email).toEqual(emailStub().id);
      });
    });
  });
  describe('update email', () => {
    describe('when update email is called', () => {
      let email: Email;
      let updateEmailDto: UpdateDto;

      beforeEach(async () => {
        updateEmailDto = {
          read: true,
          starred: true,
        };

        email = await emailController.update(emailStub().id, updateEmailDto);
      });

      test(' then it should call email service', () => {
        expect(emailService.updateEmail).toHaveBeenCalledWith(
          emailStub().id,
          updateEmailDto.read,
        );
      });

      test('then it should return an email', () => {
        expect(email).toEqual(emailStub());
      });
    });
  });
});
