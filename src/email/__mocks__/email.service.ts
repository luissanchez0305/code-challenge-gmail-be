import { emailStub } from './email.stub';

export const EmailService = jest.fn().mockReturnValue({
  getAll: jest.fn().mockResolvedValue([emailStub()]),
  getEmail: jest.fn().mockResolvedValue(emailStub()),
  insertEmail: jest.fn().mockResolvedValue(emailStub().id),
  updateEmail: jest.fn().mockResolvedValue(emailStub()),
});
