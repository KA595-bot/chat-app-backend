import {IsNotEmpty, IsString, IsEnum, IsDateString, IsOptional} from "class-validator";

export class MessageDTO {
    @IsNotEmpty()
    @IsString()
    sender: string;

    @IsNotEmpty()
    @IsString()
    receiver: string;

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsOptional()
    @IsEnum(["text", "file"])
    type: string;

}