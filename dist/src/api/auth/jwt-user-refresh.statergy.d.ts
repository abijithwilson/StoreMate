import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
declare const JwtUserRefreshStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtUserRefreshStrategy extends JwtUserRefreshStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(payload: any): Promise<{
        email: any;
        id: any;
        role: any;
    }>;
}
export {};
