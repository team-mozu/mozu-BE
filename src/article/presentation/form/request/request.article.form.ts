import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RequestArticleForm {
    @IsNotEmpty({ message: '기사 제목(title)은 필수 입력 항목입니다.' })
    @IsString({ message: '기사 제목(title)은 문자열이어야 합니다.' })
    @MaxLength(100, { message: '기사 제목(title)은 최대 100자까지 입력 가능합니다.' })
    title: string;

    @IsNotEmpty({ message: '기사 내용(description)은 필수 입력 항목입니다.' })
    @IsString({ message: '기사 내용(description)은 문자열이어야 합니다.' })
    @MaxLength(3000, { message: '기사 내용(description)은 최대 3000자까지 입력 가능합니다.' })
    description: string;
}
