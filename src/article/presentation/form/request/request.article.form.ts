import { ApiProperty } from '@nestjs/swagger';

export class RequestArticleForm {
    @ApiProperty({ description: '기사 제목' })
    title: string;

    @ApiProperty({ description: '기사 설명' })
    description: string;

    @ApiProperty({
        type: 'string',
        format: 'binary',
        description: '첨부 파일 (이미지 업로드)'
    })
    file: any;
}
