import { MailerService } from '@nestjs-modules/mailer';
import { MessageDto } from 'src/api/dto/auth.dto';
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendLinkToEmail(email: string, firstName: string, url: string): Promise<MessageDto>;
    sendLinkToAdminEmail(email: string, firstName: string, url: string): Promise<MessageDto>;
}
