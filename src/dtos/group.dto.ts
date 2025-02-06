import {IsNotEmpty, IsString, IsOptional} from "class-validator";

export class GroupDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    admin: string;

    @IsOptional()
    @IsString()
    members: [];

}