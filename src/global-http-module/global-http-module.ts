import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import * as https from 'https';

@Global()
@Module({
  imports: [
    HttpModule.register({
      httpsAgent: new https.Agent({
        rejectUnauthorized: true,
      }),

      timeoutErrorMessage: 'The request is taking too long!',

      timeout: 30000,
      maxRedirects: 5,
    }),
  ],
  exports: [HttpModule],
})
export class GlobalHttpModule {}
