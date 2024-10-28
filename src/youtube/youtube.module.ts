
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {YoutubeController} from "@/youtube/youtube.controller";
import {YoutubeService} from "@/youtube/youtube.service";
import {RestApiService} from "@/redis-pubsub/rest-api.service";

@Module({
    imports: [],
    controllers: [YoutubeController],
    providers: [YoutubeService, RestApiService],
    exports: [YoutubeService, RestApiService]
})

export class YoutubeModule {}