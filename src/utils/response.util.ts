import { ApiProperty } from '@nestjs/swagger';
import { ResponseMessage } from './const.util';

export class Response<T> {
  @ApiProperty({ example: 200 })
  private status: boolean;

  @ApiProperty({ example: ResponseMessage.GET_OK })
  private message: string | string[];

  @ApiProperty()
  private result?: T;

  @ApiProperty()
  private metadata?: ResponseMetadata;

  constructor(result: T, message?: string | string[]) {
    this.message = ResponseMessage.OK;
    this.result = result;
    this.status = true;

    if (Array.isArray(this.result) && !this.result.length) {
      this.status = false;
      this.message = ResponseMessage.EMPTY_DATA;
    } else if (Array.isArray(this.result) && this.result.length) {
      this.message = ResponseMessage.GET_OK;
    } else if (
      this.result.constructor === Object &&
      !Object.keys(this.result).length
    ) {
      this.message = ResponseMessage.GET_FAILED;
    }

    if (message) this.message = message;
  }

  public setMetadata(totalData: number, limit: number, currentPage: number) {
    this.metadata = {
      page: currentPage,
      limit: limit,
      total_pages: Math.ceil(totalData / limit),
      total_rows: totalData,
    };
  }

  public toJSON() {
    return {
      status: this.status,
      message: this.message,
      result: this.result,
      metadata: this.metadata,
    };
  }
}

export type ResponseMetadata = {
  page: number;
  limit: number;
  total_pages: number;
  total_rows: number;
};
