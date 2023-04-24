export declare class SignUpDto {
    firstName: string;
    lastName: string;
    email: string;
    dob: Date;
    password: string;
    confirmPassword: string;
}
export declare class DeleteUserStatus {
    status: string;
}
export declare class UserUpdateDto {
    firstName: string;
    lastName: string;
    phone: string;
    image: string;
    dob: string;
}
export declare class UserProfileViewDto {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    dob: Date;
    phone: string;
    rewardPointsEarned: number;
    image: string;
}
export declare class UserPasswordUpdateDto {
    oldPassword: string;
    newPassword: string;
}
export declare class UserAddressUpdateDto {
    address: string;
    countryId: number;
    stateId: number;
    districtId: number;
    locality: string;
    pincode: string;
}
export declare class UserAddressCreateDto {
    address: string;
    countryId: number;
    stateId: number;
    districtId: number;
    locality: string;
    pincode: string;
}
export declare class UserAddressIdDto {
    id: number;
}
export declare class AddressDetailDto {
    id: number;
    address: string;
    countryId: number;
    countryName: string;
    stateId: number;
    stateName: string;
    districtId: number;
    districtName: string;
    locality: string;
    pincode: number;
    userId: number;
}
export declare class AddressMessageDto {
    message: string;
    data: AddressDetailDto;
}
export declare class UserRewardUpdateDto {
    majorId: string;
}
export declare class UserIdDto {
    id: number;
}
export declare class BeaconIdDto {
    deviceId: string;
}
