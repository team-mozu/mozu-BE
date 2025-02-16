import { Type } from 'class-transformer';
import {
    ArrayMaxSize,
    ArrayMinSize,
    IsArray,
    IsInt,
    IsNotEmpty,
    IsString,
    Length,
    Max,
    Min,
    ValidateNested
} from 'class-validator';

export class RequestClassForm {
    @IsNotEmpty({ message: '수업 이름(className)은 필수 입력 항목입니다.' })
    @IsString({ message: '수업 이름(className)은 문자열이어야 합니다.' })
    @Length(1, 30, { message: '수업 이름(className)은 1 ~ 30자 사이여야 합니다.' })
    className: string;

    @IsNotEmpty({ message: '수업 기초 자산(baseMoney)은 필수 입력 항목입니다.' })
    @IsInt({ message: '수업 기초 자산(baseMoney)은 정수여야 합니다.' })
    @Min(0, { message: '수업 기초 자산(baseMoney)은 0원 이상이어야 합니다.' })
    @Max(999_999_999_999_999, { message: '수업 기초 자산(baseMoney)은 1000조 미만이어야 합니다.' })
    baseMoney: number;

    @IsNotEmpty({ message: '수업 차수(classDeg)는 필수 입력 항목입니다.' })
    @IsInt({ message: '수업 차수(classDeg)는 정수여야 합니다.' })
    @Min(3, { message: '수업 차수(classDeg)는 3차 이상이어야 합니다.' })
    @Max(8, { message: '수업 차수(classDeg)는 8차 이하이어야 합니다.' })
    classDeg: number;

    // 수업 종목 최소 개수, 최대 개수 설정
    @IsNotEmpty({ message: '수업 종목 리스트(classItems)는 필수 입력 항목입니다.' })
    @ValidateNested({ each: true })
    @Type(() => ClassItem)
    classItems: ClassItem[];

    @IsNotEmpty({ message: '차수별 수업 기사 리스트(classArticles)는 필수 입력 항목입니다.' })
    @ArrayMinSize(3, {
        message: '차수별 수업 기사 리스트(classArticles)의 요소는 최소 3개 이상이어야 합니다.'
    })
    @ArrayMaxSize(8, {
        message: '차수별 수업 기사 리스트(classArticles)의 요소는 최대 8개 이하이어야 합니다.'
    })
    @ValidateNested({ each: true })
    @Type(() => ClassArticle)
    classArticles: ClassArticle[];

    constructor(
        className: string,
        baseMoney: number,
        classDeg: number,
        classItems: ClassItem[],
        classArticles: ClassArticle[]
    ) {
        this.className = className;
        this.baseMoney = baseMoney;
        this.classDeg = classDeg;
        this.classItems = classItems;
        this.classArticles = classArticles;
    }
}

export class ClassItem {
    @IsNotEmpty({ message: ' <- 해당 index 각 수업 종목 id는 필수 입력 항목입니다.' })
    @IsInt({ message: '<- 해당 index 각 수업 종목 id는 정수여야 합니다.' })
    id: number;

    @IsNotEmpty({ message: ' <- 해당 index 각 수업 종목 금액(money)은 필수 입력 항목입니다.' })
    @IsArray({ message: ' <- 해당 index 각 수업 종목 금액(money)은 배열이어야 합니다.' })
    @ArrayMinSize(3, { message: ' <- 각 수업 종목 금액(money)은 최소 3개 이상이어야 합니다.' })
    @ArrayMaxSize(8, { message: ' <- 각 수업 종목 금액(money)은 최대 8개 이하이어야 합니다.' })
    @Type(() => Number)
    @Min(0, { each: true, message: ' <- 각 수업 종목 금액(money)은 0원 이상이어야 합니다.' })
    @Max(999_999_999, {
        each: true,
        message: ' <- 각 수업 종목 금액(money)은 10억 미만이어야 합니다.'
    })
    money: number[];

    constructor(id: number, money: number[]) {
        this.id = id;
        this.money = money;
    }
}

export class ClassArticle {
    @IsNotEmpty({ message: ' <- 해당 index 차수별 수업 차수(invDeg)는 필수 입력 항목입니다.' })
    @IsInt({ message: '<- 해당 index 차수별 수업 차수(invDeg)는 정수여야 합니다.' })
    invDeg: number;

    @IsNotEmpty({ message: ' <- 해당 index 차수별 수업 기사들(articles)은 필수 입력 항목입니다.' })
    @IsArray({ message: ' <- 해당 index 차수별 수업 기사들(articles)은 배열이어야 합니다.' })
    articles: number[];

    constructor(invDeg: number, articles: number[]) {
        this.invDeg = invDeg;
        this.articles = articles;
    }
}
