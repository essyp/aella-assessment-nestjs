
import {Expose} from "class-transformer";
import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

@Expose()
export class CommentsDto{

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    maxResults?: number;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    searchTerms?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    pageToken?: string;
}