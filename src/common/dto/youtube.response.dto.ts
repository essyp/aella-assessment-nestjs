import { HttpStatus } from '@nestjs/common';

export class YoutubeResponseDto {
  status: HttpStatus = HttpStatus.OK;
  description: string;
  data: any;
  errors: any;

  constructor(status?: HttpStatus) {
    this.status = status;
  }
}
