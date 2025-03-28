import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class RequestItemForm {
    @IsNotEmpty({ message: '종목 이름(name)은 필수 입력 항목입니다.' })
    @MaxLength(100, { message: '종목 이름(name)은 최대 100자까지 입력 가능합니다.' })
    name: string;

    @IsNotEmpty({ message: '종목 정보(info)는 필수 입력 항목입니다.' })
    @MaxLength(3000, { message: '종목 정보(info)는 최대 3000자까지 입력 가능합니다.' })
    info: string;

    @IsNotEmpty({ message: '종목 자산(money)은 필수 입력 항목입니다.' })
    money: number;

    @IsNotEmpty({ message: '종목 부채(debt)는 필수 입력 항목입니다.' })
    debt: number;

    @IsNotEmpty({ message: '종목 자본금(capital)은 필수 입력 항목입니다.' })
    capital: number;

    @IsNotEmpty({ message: '종목 매출액(profit)은 필수 입력 항목입니다.' })
    profit: number;

    @IsNotEmpty({ message: '종목 매출 원가(profitOG)는 필수 입력 항목입니다.' })
    profitOG: number;

    @IsNotEmpty({ message: '종목 매출 이익(profitBen)은 필수 입력 항목입니다.' })
    profitBen: number;

    @IsNotEmpty({ message: '종목 당기 순이익(netProfit)은 필수 입력 항목입니다.' })
    netProfit: number;

    @IsOptional()
    logo?: string;

    constructor(
        name: string,
        info: string,
        money: number,
        debt: number,
        capital: number,
        profit: number,
        profitOG: number,
        profitBen: number,
        netProfit: number,
        logo?: string
    ) {
        this.name = name;
        this.info = info;
        this.money = money;
        this.debt = debt;
        this.capital = capital;
        this.profit = profit;
        this.profitOG = profitOG;
        this.profitBen = profitBen;
        this.netProfit = netProfit;
        this.logo = logo;
    }
}
