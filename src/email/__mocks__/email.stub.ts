import { Email } from '../models/email.schema';

export const emailStub = (): Email => {
  return {
    id: '123',
    starred: false,
    from: 'from1',
    subject: 'subject1',
    message: 'message1',
    received: 'received1',
    read: false,
  };
};
