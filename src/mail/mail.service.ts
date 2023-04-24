import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MessageDto } from 'src/api/dto/auth.dto';
import * as K from './../shared/constants';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendLinkToEmail(
    email: string,
    firstName: string,
    url: string
  ): Promise<MessageDto> {
    return await this.mailerService
      .sendMail({
        to: email,
        subject: K.PASSWORD_RESET,
        template: './reset-password',
        context: {
          name: firstName,
          url: url,
          email:email
        }
      })
      .then(() => ({ message: K.EMAIL_SENT.Success }))
      .catch(() => ({ message: K.EMAIL_SENT.UnSuccess }));
  }
  async sendLinkToAdminEmail(
    email: string,
    firstName: string,
    url: string
  ): Promise<MessageDto> {
    try {
      return await this.mailerService
        .sendMail({
          to: email,
          subject: K.STORE_ADMIN_INVITATION,
          template: './storeadmin-invite',
          context: {
            name: firstName,
            url: url
          }
        })
        .then(() => ({ message: K.EMAIL_SENT.Success, statusCode: 201 }));
    }
    catch (error) {
      error.statusCode = 400;
      throw error;
    }
  }
}
