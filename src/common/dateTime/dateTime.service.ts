import { Injectable } from '@nestjs/common';

@Injectable()
export class DateTimeService {
    constructor() {}

    async getNowDate(): Promise<string> {
        const date = new Date();
        const options = {
            timeZone: 'Asia/Seoul'
        };
        const koreanDate = new Intl.DateTimeFormat('en-CA', options).format(date);

        return koreanDate;
    }
}
