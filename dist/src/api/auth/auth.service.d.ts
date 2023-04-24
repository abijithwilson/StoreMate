import { AdminTypeDto } from './../dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { AdminForgotPasswordDTO, MessageDto, LoginDto, LoginResponseDto, LoginUserBodyDto, UserForgotPasswordDTO } from '../dto/auth.dto';
import { Observable } from 'rxjs';
import { DatabaseService } from 'src/database/database.service';
import { MailService } from 'src/mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { ConfigType } from '@nestjs/config';
import configuration from 'src/config/configuration';
export declare class AuthService {
    private readonly jwtService;
    private configService;
    private config;
    private readonly databaseService;
    private mailService;
    constructor(jwtService: JwtService, configService: ConfigService, config: ConfigType<typeof configuration>, databaseService: DatabaseService<any>, mailService: MailService);
    adminLogin(pass: any, body: LoginDto): Promise<LoginResponseDto>;
    refreshToken(user: any): {
        bearer_token: string;
    };
    validateUser(body: LoginUserBodyDto): Promise<LoginResponseDto>;
    userRefreshToken(user: any): {
        bearer_token: string;
    };
    adminForgotPassword(body: AdminForgotPasswordDTO): Promise<MessageDto>;
    adminResetPassword(adminTypeBody: AdminTypeDto, password: any, resetBody: any): Observable<MessageDto | Record<null, null>>;
    userForgotPassword(body: UserForgotPasswordDTO): Promise<MessageDto>;
    userResetPassword(password: any, resetBody: any): Observable<MessageDto | Record<null, null>>;
}
