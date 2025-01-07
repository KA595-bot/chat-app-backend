import { IsEmail, IsNotEmpty, MinLength, Matches } from "class-validator";

export class RegisterUserDTO {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(8, { message: 'Password should be at least 8 characters long' })
    @Matches(/[A-Z]/, { message: 'Password should contain at least one uppercase letter' })
    @Matches(/[a-z]/, { message: 'Password should contain at least one lowercase letter' })
    @Matches(/[0-9]/, { message: 'Password should contain at least one number' })
    password: string;

    @IsNotEmpty()
    telephone: string
}

export class LoginUserDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: "Password is required" })
    password: string;
}
