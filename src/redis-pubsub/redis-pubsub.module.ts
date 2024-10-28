import { Module } from '@nestjs/common';

import {TypeOrmModule} from "@nestjs/typeorm";
import {RestApiService} from "@/redis-pubsub/rest-api.service";

@Module({
  imports: [],
  providers:[RestApiService],
  exports:[RestApiService]
})
export class RedisPubsubModule {}
