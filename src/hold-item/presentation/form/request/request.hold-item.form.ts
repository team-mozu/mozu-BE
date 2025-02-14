import { IsNumber, IsString } from "class-validator";

export class RequestHoldItemForm{
    @IsString()
    id: string;
    @IsString()
    classTeamId: string;
    @IsString()
    itemName: string;
    @IsNumber()
    itemCnt: number;
    @IsNumber()
    buyMoney: number;
    @IsNumber()
    valProfit: number;
    @IsNumber()
    profitNum: number;
}