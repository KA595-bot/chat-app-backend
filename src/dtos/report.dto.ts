import {IsNotEmpty, IsString } from "class-validator";

export class ReportDTO {
    @IsNotEmpty()
    @IsString()
    reporterId: string;

    @IsNotEmpty()
    @IsString()
    reportedUser: string;

    @IsNotEmpty()
    @IsString()
    reason: string;

}