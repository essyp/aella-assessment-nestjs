
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CommentsDto} from "@/youtube/dto/comments.dto";
import {ConfigService} from "@nestjs/config";
import {RestApiService} from "@/redis-pubsub/rest-api.service";
import {YoutubeEndpoints} from "@/youtube/youtube-endpoints";

@Injectable()
export class YoutubeService{

    private apiKey: string;
    private youtubeBaseUrl: string;

    constructor(private config: ConfigService, private readonly restClient: RestApiService) {
        this.apiKey = config.get('YOUTUBE_API_KEY')
        this.youtubeBaseUrl = config.get('YOUTUBE_BASE_URL')
    }

    // fetch video api call
    public async fetchYoutubeVideo(youtube_id: string)
    {
        try{
            const payload = {
                id: youtube_id,
                key: this.apiKey,
                fields: 'items(id,snippet,statistics)',
                part: 'snippet,statistics'
            };

            const url = `${this.youtubeBaseUrl}${YoutubeEndpoints.FETCH_VIDEO}`+`?id=${payload.id}`+
                        `&key=${payload.key}`+
                        `&part=${payload.part}`;
            const result = await this.restClient.fetchRequest(url);
            return result
        }catch (exception) {
            throw new Error(exception.message)
        }
    }

    // fetch comment api call
    public async fetchYoutubeVideoComments(youtube_id: string, dto: CommentsDto)
    {
        try{
            const payload = {
                videoId: youtube_id,
                key: this.apiKey,
                textFormat: 'plainText',
                part: 'id,snippet',
                maxResults: dto?.maxResults != null? dto?.maxResults :10,
                order: 'time',
                pageToken: dto?.pageToken != null? dto?.pageToken :'',
                moderationStatus: 'published',
                searchTerms: dto?.searchTerms != null? dto?.searchTerms :''
            };

            const url = `${this.youtubeBaseUrl}${YoutubeEndpoints.FETCH_COMMENT}?videoId=${payload.videoId}`+
                        `&key=${payload.key}`+
                        `&part=${payload.part}`+
                        `&textFormat=${payload.textFormat}`+
                        `&maxResults=${payload.maxResults}`+
                        `&order=${payload.order}`+
                        `&pageToken=${payload.pageToken}`+
                        `&moderationStatus=${payload.moderationStatus}`+
                        `&searchTerms=${payload.searchTerms}`;
                        
            const result = await this.restClient.fetchRequest(url);
            return result
        }catch (exception) {
            throw new Error(exception.message)
        }
    }

}
