import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
declare const JwtTokenCheckStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtTokenCheckStrategy extends JwtTokenCheckStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    validate(payload: any): Promise<{
        email: any;
        id: any;
        role: any;
    }>;
}
export {};
