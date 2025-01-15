import {IsNotEmpty, IsString, IsEnum, IsDateString, IsOptional} from "class-validator";

export class MessageDTO {
    @IsNotEmpty()
    @IsString()
    sender: string;

    @IsNotEmpty()
    @IsString()
    receiver: string;

    @IsOptional()
    @IsString()
    content: string;

    @IsNotEmpty()
    @IsString()
    chatMessage: string;

    @IsOptional()
    @IsEnum(["text", "file"])
    type: string;

}