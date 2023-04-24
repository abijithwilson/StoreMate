import { AdminTypeDto } from './../dto/auth.dto';
import { Observable } from 'rxjs';
import { AdminForgotPasswordDTO, AdminResetPasswordDTO, LoginDto, LoginResponseDto, LoginUserBodyDto, MessageDto, UserForgotPasswordDTO } from '../dto/auth.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: LoginUserBodyDto): Promise<LoginResponseDto>;
    adminLogin(password: any, body: LoginDto): Promise<LoginResponseDto>;
    refreshToken(req: any): {
        bearer_token: string;
    };
    adminForgotPassword(body: AdminForgotPasswordDTO): Promise<MessageDto>;
    adminResetPassword(adminTypeBody: AdminTypeDto, password: AdminResetPasswordDTO, resetBody: any): Observable<MessageDto | Record<null, null>>;
    userForgotPassword(body: UserForgotPasswordDTO): Promise<MessageDto>;
    userResetPassword(password: any, body: any): Observable<MessageDto | Record<null, null>>;
    userRefreshToken(req: any): {
        bearer_token: string;
    };
}
