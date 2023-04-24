import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
declare const JwtPasswordResetStatergy_base: new (...args: any[]) => Strategy;
export declare class JwtPasswordResetStatergy extends JwtPasswordResetStatergy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(payload: any): Promise<{
        email: any;
        id: any;
    }>;
}
export {};
