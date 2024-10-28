import {Body, Controller, Delete, Get, HttpStatus, Logger, Param, Post, Query, Request, Res, UseGuards} from "@nestjs/common";
import {CommentsDto} from "@/youtube/dto/comments.dto";
import YoutubeResponder from "@/youtube.responder";
import {YoutubeService} from "@/youtube/youtube.service";
import {Column, CreateDateColumn} from "typeorm";
import { ApiTags } from "@nestjs/swagger";
import {Paginate, PaginateQuery} from "nestjs-paginate";
import {FastifyReply, FastifyRequest} from "fastify";

@Controller({ path: "api/v1/youtube" })
@ApiTags("Youtube")
export class YoutubeController{
    logger = new Logger("Youtube");
    constructor(
        private readonly youtubeService: YoutubeService
    ) {
    }


    @Get("video/:youtube_id")
    async fetch(
        @Request() req: Request,
        @Res({ passthrough: true }) res: FastifyReply,
        @Param('youtube_id') youtube_id: string,
    ){
        try{
            let response = await this.youtubeService.fetchYoutubeVideo(youtube_id);
            res.status(HttpStatus.OK);
            return YoutubeResponder.sendFound("Operation successful!", response)
        }catch (exception){
            res.status(HttpStatus.UNAUTHORIZED);
            return YoutubeResponder.sendUnauthorized(
                exception.message,
                null
            )
        }
    }

    @Get("comments/:youtube_id")
    async comments(
        @Request() req: FastifyRequest,       
        @Res({ passthrough: true }) res: FastifyReply,
        @Param('youtube_id') youtube_id: string,
        @Query('filter') filter?: CommentsDto     
    ){
        try{
            const commentsDto = req.query as CommentsDto;
            let response = await this.youtubeService.fetchYoutubeVideoComments(youtube_id,commentsDto);
            res.status(HttpStatus.OK);
            return YoutubeResponder.sendFound("Operation successful!", response)
        }catch (exception){
            res.status(HttpStatus.UNAUTHORIZED);
            return YoutubeResponder.sendUnauthorized(
                exception.message,
                null
            )
        }
    }

}