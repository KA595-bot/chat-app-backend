import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class RegisterUserDTO {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6, { message: "Password must be at least 6 characters long" })
    password: string;
}

export class LoginUserDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: "Password is required" })
    password: string;
}
