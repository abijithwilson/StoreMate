export declare class LoginResponseDto {
    bearer_token: string;
    refresh_token: string;
}
export declare class LoginDto {
    email: string;
}
export declare class LoginUserBodyDto {
    email: string;
    password: string;
}
export declare class LoginAdminDto {
    adminId: string;
    email: string;
    password: string;
    salt: string;
    roles: string;
    roleName: string;
}
export declare class AdminForgotPasswordDTO {
    email: string;
}
export declare class UserForgotPasswordDTO {
    email: string;
}
export declare class PasswordDto {
    password: string;
    confirmPassword: string;
}
export declare class AdminResetPasswordDTO {
    password: string;
    confirmPassword: string;
}
export declare class AdminDetailDto {
    firstName: string;
    adminId: string;
    email: string;
    pass: string;
    salt: string;
    roles: string;
    roleName: string;
}
export declare class UserDetailDto {
    firstName: string;
    userId: string;
}
export declare class LoginUserDto {
    id: string;
    email: string;
    password: string;
    salt: string;
}
export declare class MessageDto {
    message: string;
}
export declare class IdDto {
    id: string;
}
export declare class AdminTypeDto {
    adminType: number;
}
export declare class RefreshResponseDto {
    bearer_token: string;
}
